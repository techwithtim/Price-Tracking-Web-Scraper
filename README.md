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

## New Feature: Price Drop Notifications

We have introduced a new feature to notify users when the price of a tracked product drops by 30% or more. Users can easily set their notification preferences by providing their email address and selecting the product they are interested in.

### Setup

1. **SMTP Relay Service**: 
    - We've implemented an email notification system using an SMTP relay service. 
    - You will need to create an account with an SMTP relay service of your choice (e.g., SendGrid, Mailgun, etc.).
    - Update the `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD` environment variables in your backend configuration with the credentials provided by your SMTP relay service.

2. **Backend Configuration**:
    - In the `app.py` file in the backend folder, ensure that the `/set-notification-preference` and `/check-price-drop` routes are correctly set up.

3. **Frontend Integration**:
    - Include the `NotificationPreferenceForm` component in your frontend application where users can enter their email address and set their notification preference for specific products.

### Usage

- Users can navigate to the Notification Preference section on the UI.
- Enter their email address, select a product, and specify the original price.
- Once the preference is set, the system will monitor the price of the specified product.
- When a price drop of 30% or more is detected, an email notification will be sent to the user informing them of the price drop.

This feature enhances the user experience by providing timely notifications on price drops for products they are interested in.


### Windows

I have created a simple `.bat` script called `run.bat` that you can schedule to execute using the Windows Task Scheduler that will automatically run the backend api and send the appropriate request to it.
