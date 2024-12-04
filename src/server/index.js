// src/server.js

const express = require('express');
const fetch = require('node-fetch');  // For making API calls
const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Your NewsAPI key and endpoint
const API_KEY = '8b042ef007bc42c7a9b3c176907728e9';  // Replace with your actual API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
require('dotenv').config();


// POST endpoint for receiving the URL
app.post('/api', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required.' });
    }

    try {
        // Call the external NewsAPI
        const apiResponse = await fetch(`${NEWS_API_URL}?q=${encodeURIComponent(url)}&apiKey=${API_KEY}`);
        const apiData = await apiResponse.json();

        // Check if there are articles in the API response
        if (!apiData.articles || apiData.articles.length === 0) {
            return res.status(400).json({ error: 'No articles found for the provided URL.' });
        }

        // Example of returning polarity and subjectivity from the first article
        const article = apiData.articles[0];

        // Assuming we're using dummy data for polarity and subjectivity
        const polarity = article.title.includes('good') ? 'positive' : 'negative';
        const subjectivity = article.description ? 'subjective' : 'factual';

        res.json({
            polarity,
            subjectivity,
            text: article.description || article.title,  // Provide text from the article
        });
    } catch (error) {
        console.error('Error fetching data from NewsAPI:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
