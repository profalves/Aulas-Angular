const inputEmail = document.querySelector('.email');
const invalidEmail = document.querySelector('.invalidfeedback');
const textInvalidEmail = `
<div class="alert alert-danger" role="alert">
  Email inválido, favor preenhcer com uma email válido.
</div>`;
const btnSubmit = document.querySelector('.btnSubmit');
const formulario = document.querySelector('form');


const validateEmail = (event) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
        btnSubmit.classList.remove('disabled');
        return true;
    } else {
        btnSubmit.classList.add('disabled');
        invalidEmail.innerHTML = textInvalidEmail;
        removeAlert();
    }
}

const removeAlert = () => {
    setTimeout(() => {
        const alert = document.querySelector('.alert');
        alert.remove();
    }, 3000)
}



formulario.addEventListener('submit', (event) => {
   
    alert('Cadastrado com sucesso!');
})


inputEmail.addEventListener('change', validateEmail);