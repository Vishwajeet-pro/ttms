// // public/script.js

// // Assume you have some code to capture user input, for example:
// const emailInput = document.getElementById('email');
// const nameInput = document.getElementById('name');
// const passwordInput = document.getElementById('password');
// const confpassInput = document.getElementById('confpass');
// const submitButton = document.getElementById('submit-button');

// submitButton.addEventListener('click', () => {
//     const name = nameInput.value;
//     const confpass = confpassInput.value;

//     const email = emailInput.value;
//     const password = passwordInput.value;

//     // Make an AJAX request to send the data to the backend
//     fetch(`/submit-data?name=${name}&password=${password}&email=${email}&confpass=${confpass}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error('Network response was not ok.');
//     })
//     .then(data => {
//         console.log('Response from server:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });
