/*Crie um formulario de newsletter, onde valide o email se é um email válido e que ao enviar, faça um feedback ao usuário informando que ele foi cadastrado com sucesso.*/

let input = document.getElementById('email');
let message = document.querySelector('#message');
let modal = document.getElementById('modal');
let container = document.getElementById('container');

function init() {
	modal.style.display = 'none';
}

init();

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

container.onclick = function (e) {
	e.stopPropagation();
	message.setAttribute('hidden', true);
	modal.style.display = 'none';
}

input.addEventListener('change', inputOnChange)