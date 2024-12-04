
# Project Instructions

This repository is your starter code for the project. It mirrors the same code as the starter project from Lesson 2 of the course. You should install and configure Webpack just as we did in the course, but feel free to refer to the course repo as you build this project. Remember to make frequent commits and create and merge branches as necessary!

The goal of this project is to give you hands-on experience with:
- Setting up Webpack
- Using Sass styles
- Working with Webpack loaders and plugins
- Creating layouts and page designs
- Setting up Service Workers
- Making API requests to external URLs

Additionally, this project introduces **Natural Language Processing (NLP)**. NLP involves machine learning techniques for understanding and processing human language, which powers systems like Alexa and Google Assistant. This project will use the Aylien API to analyze the content of articles and blog posts.

> **Natural Language Processing (NLP)** is a subfield of computer science and artificial intelligence that focuses on the interaction between computers and human languages, specifically how to program computers to process and analyze large amounts of natural language data.

While creating NLP systems requires substantial resources, Aylien provides a public API to access NLP capabilities for this project. You’ll use the Aylien API to determine attributes of articles or blog posts.

---

## Getting Started

To begin, follow the steps from the course up to Lesson 4, but do **not** add Service Workers yet. They are not needed during development, and extra caches may cause confusion. 

**Steps to get started:**
1. Fork this repo and clone it to your local machine.
2. Navigate to your project folder and run:
   ```
   npm install
   ```

---

## Setting Up the API

The Aylien/MeaningCloud API can differ from what you've used before. For ease of use, you might need to install a Node module that simplifies the requests we’ll make from our backend (Node/Express).

### Step 1: Signup for an API Key

- **Aylien API**: Sign up [here](https://developer.aylien.com/signup) to get an API key. At the time of writing, the Aylien API is free for up to 1000 requests per day.
- **MeaningCloud API**: Sign up [here](https://www.meaningcloud.com/developer/sentiment-analysis) to obtain a license key.

### Step 2: Install the SDK (For Aylien API)

If using the Aylien API, you will need to install the SDK. The SDK helps interface with the Aylien API from Node.js. Install it using:
```bash
npm install aylien_textapi
```
For **MeaningCloud**, you may need the `form-data` module:
```bash
npm install form-data
```

### Step 3: Setup the API in `server/index.js`

In your `server/index.js`, require the Aylien API package:
```javascript
var aylien = require("aylien_textapi");
```

### Step 4: Environment Variables

To securely manage your API keys, use environment variables. Follow these steps:

1. **Install dotenv**:  
   Install the `dotenv` package for managing environment variables:
   ```bash
   npm install dotenv
   ```
   
2. **Create `.env` file**:  
   In the root of your project, create a `.env` file and add your API keys:
   ```dotenv
   API_ID=your-api-id
   API_KEY=your-api-key
   ```
   
3. **Update `.gitignore`**:  
   Add `.env` to your `.gitignore` file to prevent it from being pushed to GitHub:
   ```
   .env
   ```
   
4. **Use environment variables in `server/index.js`**:
   At the top of your `server/index.js`, add:
   ```javascript
   const dotenv = require('dotenv');
   dotenv.config();
   ```
   Now, access the keys using:
   ```javascript
   var textapi = new aylien({
     application_id: process.env.API_ID,
     application_key: process.env.API_KEY
   });
   ```

### Step 5: Using the Aylien API

Now that you’ve set up the API, refer to [Aylien API documentation](https://docs.aylien.com/textapi/endpoints/#api-endpoints) to make requests to analyze articles and blog posts.

---

## After Aylien API Integration

After integrating the Aylien API, continue by ensuring the following:
- Parse the API response and dynamically update the page content.
- Test the server and form submission, ensuring error handling for invalid input.
- Add Service Worker setup in Webpack configuration.
- Test the application offline to verify it works without a server.

---

## Testing the Application

### Setting Up Jest

Jest is used for testing JavaScript code. Make sure you have the proper configuration in your `package.json` to run Jest with the `jsdom` environment.

In your `package.json`, add:
```json
"jest": {
  "testEnvironment": "jsdom"
}
```

Install dependencies needed for testing:
```bash
npm install --save-dev jest @babel/preset-env babel-jest
```

You can run the tests with:
```bash
npm run test
```

---

## Deploying

Once your project is complete, consider deploying it online. Some options for free and intuitive hosting include:
- [Netlify](https://www.netlify.com/)
- [Heroku](https://www.heroku.com/)

These platforms make it easy to host your website and deploy your application.

---
