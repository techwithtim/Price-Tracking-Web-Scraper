from requests import post

URL = "http://localhost:5000/update-tracked-products"

if __name__ == "__main__":
    print("Sending request to", URL)
    response = post(URL)
    print("Status code:", response.status_code)
