// Import the form handler function to manage form submissions
import { handleSubmit } from '../../js/formHandler';

// Import style files (SASS/SCSS files are compiled into CSS)
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
    // Register service worker when the window has loaded
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registered: ', registration);
        }).catch((error) => {
            console.error('Service Worker registration failed: ', error);
        });
    });
}

// Ensure the form exists before adding the event listener
const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
} else {
    console.error("Form element not found. Please ensure the form is correctly defined in index.html.");
}

// Uncomment the following lines for debugging (optional)
// alert("I EXIST");
// console.log("CHANGE!!");
