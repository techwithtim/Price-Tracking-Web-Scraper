# Project Information

This project provides a user interface to interact with an automated price tracking web scraper. Currently the tracker scrapes amazon.ca, but could be configured to scrape multiple sources.

## Libraries/Frameworks/Modules

This project uses:

- React
- Flask
- Playwright
- Bright Data (Web Scraping Browser)

## Using the Scraper

Install all dependencies, create the `auth.json` file, start the flask backend, run the react frontend and interact with the tool.

### auth.json

Fill in your [Bright Data Scraping Browser](https://brightdata.com/products/scraping-browser) credentials in a `backend/scraper/auth.json` file (see `auth_example.json`).

### Python Flask Backend

- `cd backend`
- `pip install -r requirements.txt`
- `playwright install`
- `python app.py` or `python3 app.py`

### Running the React Frontend

- `cd frontend`
- `npm i`
- `npm run start`

## Setting Up Automation

To automate the collection of prices from this software simply run the `scheduler/main.py` file at your desired increment while the python flask backend is running.

### Windows

I have created a simple `.bat` script called `run.bat` that you can schedule to execute using the Windows Task Scheduler that will automatically run the backend api and send the appropriate request to it.


# 💻 Launch Your Software Development Career Today!  

🎓 **No degree? No problem!** My program equips you with everything you need to break into tech and land an entry-level software development role.  

🚀 **Why Join?**  
- 💼 **$70k+ starting salary potential**  
- 🕐 **Self-paced:** Complete on your own time  
- 🤑 **Affordable:** Low risk compared to expensive bootcamps or degrees
- 🎯 **45,000+ job openings** in the market  

👉 **[Start your journey today!](https://techwithtim.net/dev)**  
No experience needed—just your determination. Future-proof your career and unlock six-figure potential like many of our students have!  
