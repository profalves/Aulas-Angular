"use strict";

const form = document.querySelector("form");
const input = document.getElementById("email");

form.onsubmit = (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const validEmail = checkEmail(email);
  if (!validEmail) {
    alert("E-mail inválido");
    input.style = "border-color: red";
    return;
  }

  alert(`E-mail ${email} cadastrado com sucesso`);
  input.value = "";
};

input.onfocus = (e) => {
  e.preventDefault();
  input.style = "border-color: rgb(48, 48, 48)";
};

function checkEmail(email) {
  return email.split("@")[1] !== undefined;
}
