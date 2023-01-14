// Variables
let input = document.getElementById('email');
let message = document.querySelector('#message');
let modal = document.getElementById('modal');
let container = document.getElementById('container');

// Function hide the modal when application initiate
function init() {
	modal.style.display = 'none';
}

// Run ini
init();

// Function to verify the email on inputbox change
function inputOnChange(i) {
	if (input.value.includes('@') && input.value.includes('.com') && !input.value.startsWith('@')) {
		message.setAttribute('hidden', false);
		message.style.display = 'block'
		modal.style.display = 'flex';
		message.innerHTML = 'Your e-mail is valid'
	} else {
		message.setAttribute('hidden', false);
		message.style.display = 'block'
		modal.style.display = 'flex';
		message.innerHTML = 'Your e-mail is invalid'
	}
}

// On click to close modal
container.onclick = function (e) {
	message.setAttribute('hidden', true);
	modal.style.display = 'none';
}

// Call the function on change of the input box
input.addEventListener('change', inputOnChange)