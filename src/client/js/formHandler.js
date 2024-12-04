// src/client/js/formHandler.js

// Importing the URL validation function from urlValidator.js
import { isValidURL } from './urlValidator';

const serverURL = 'https://localhost:8000/api';  // Replace with your actual API endpoint

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Validate the URL using the isValidURL function
    if (isValidURL(formText)) {
        // If the URL is valid, send it to the server
        sendDataToServer(formText);
    } else {
        alert("Please enter a valid URL.");
    }
}

const sendDataToServer = async (url) => {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Server response: ", result);

            // Displaying results in the #results div
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `
                <p>Polarity: ${result.polarity}</p>
                <p>Subjectivity: ${result.subjectivity}</p>
                <p>Text: ${result.text}</p>
            `;
        } else {
            throw new Error("Error submitting URL");
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("There was an error sending your URL.");
    }
}

export { handleSubmit };
