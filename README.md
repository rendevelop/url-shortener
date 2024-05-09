# URL Shortener

Simple URL Shortener with a Django backend and TypeScript and React frontend.

## Description

The URL Shortener will take in any valid URL and generate a five-character code. 
This code, when appended to the domain (i.e. `/abcde`), will navigate to the long-form URL as a new tab in the user's browser.

![image](https://github.com/rendevelop/url-shortener/assets/45770934/511eb174-e22b-4057-a43c-c90446258f48)

## Tech Stack

Django, SQLite3, React, TypeScript

SQLite3 can be [substituted](https://docs.djangoproject.com/en/5.0/ref/databases/) for another database engine such as PostgreSQL.

## Running the App Locally

1. Clone the repo and navigate to the directory `git clone https://github.com/rendevelop/url-shortener.git`
2. Install [Python3](https://wiki.python.org/moin/BeginnersGuide/Download)
3. Install [PipEnv](https://pipenv.pypa.io/en/latest/installation.html#installing-pipenv)
4. Run `pipenv install` to install the Django dependencies
5. Run `pipenv shell` to activate the virtual environment
6. Run the database migrations `python3 manage.py migrate`
7. Run the server `python3 manage.py runserver`
8. Navigate to the frontend folder `cd frontend`
9. Rename the `.env.sample` file to `.env`. This file contains the `PORT` env variable that Node will use to start the frontend client
10. Run `npm install` to install the npm packages locally
11. Run `npm start` to start the frontend server
