import asyncio
from playwright.async_api import async_playwright
import json
import os
from amazon import get_product as get_amazon_product
from requests import post

AMAZON = "https://amazon.ca"
CANADA_COMPUTERS = "https://canadacomputers.com"

URLS = {
    AMAZON: {
        "search_field_id": "twotabsearchtextbox",
        "search_button_id": "nav-search-submit-button",
        "product_selector": "div.s-card-container"
    },
    CANADA_COMPUTERS: {
        "search_field_id": "cc_quick_search",
        "search_button_id": "search_btn",
        "product_selector": ""
    }
}

available_urls = URLS.keys()


def load_auth():
    FILE = os.path.join("Scraper", "auth.json")
    with open(FILE, "r") as f:
        return json.load(f)


cred = load_auth()
auth = f'{cred["username"]}:{cred["password"]}'
browser_url = f'wss://{auth}@{cred["host"]}'


async def search(metadata, page, search_text):
    print(f"Searching for {search_text} on {page.url}")
    search_field_id = metadata.get("search_field_id")
    search_button_id = metadata.get("search_button_id")

    if search_field_id:
        print("Filling input field")
        await page.fill(f"#{search_field_id}", search_text)
        print("Pressing search button")
        await page.click(f"#{search_button_id}")
    else:
        raise Exception("Could not search.")

    await page.wait_for_load_state()
    return page


async def get_products(page, search_text, selector, get_product):
    print("Retreiving products.")
    product_divs = await page.query_selector_all(selector)
    valid_products = []
    words = search_text.split(" ")

    async with asyncio.TaskGroup() as tg:
        for div in product_divs:
            async def task(p_div):
                product = await get_product(p_div)

                if not product["price"] or not product["url"]:
                    return

                for word in words:
                    if not product["name"] or word.lower() not in product["name"].lower():
                        break
                else:
                    valid_products.append(product)
            tg.create_task(task(div))

    return valid_products


def save_results(results):
    data = {"results": results}
    FILE = os.path.join("Scraper", "results.json")
    with open(FILE, "w") as f:
        json.dump(data, f)


def post_results(results, endpoint, search_text, source):
    headers = {
        "Content-Type": "application/json"
    }
    data = {"data": results, "search_text": search_text, "source": source}

    print("Sending request to", endpoint)
    response = post("http://localhost:5000" + endpoint,
                    headers=headers, json=data)
    print("Status code:", response.status_code)


async def main(url, search_text, response_route):
    metadata = URLS.get(url)
    if not metadata:
        print("Invalid URL.")
        return

    async with async_playwright() as pw:
        print('Connecting to browser.')
        browser = await pw.chromium.connect_over_cdp(browser_url)
        page = await browser.new_page()
        print("Connected.")
        await page.goto(url, timeout=120000)
        print("Loaded initial page.")
        search_page = await search(metadata, page, search_text)

        def func(x): return None
        if url == AMAZON:
            func = get_amazon_product
        elif url == CANADA_COMPUTERS:
            pass

        results = await get_products(search_page, search_text, metadata["product_selector"], func)
        print("Saving results.")
        post_results(results, response_route, search_text, url)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main(AMAZON, "ryzen 9 3950x"))
