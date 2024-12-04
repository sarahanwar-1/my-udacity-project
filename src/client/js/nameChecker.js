// src/client/js/nameChecker.js

function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);

    // List of valid captain names
    const captains = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ];

    // Check if the inputText matches any name in the captains list
    if (captains.includes(inputText)) {
        alert(`Welcome, Captain ${inputText}!`);
    } else {
        alert("Enter a valid captain name.");
    }
}

export { checkForName };
