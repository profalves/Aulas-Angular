const input = document.querySelector("input");
const sumit = document.querySelector("button[type=submit]");
let email = "";

input.addEventListener("change", (e) => {
  email = e.target.value;
});

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function showMessage(text) {
  const msg = document.querySelector(".message");
  msg.innerHTML = text;
}

sumit.addEventListener("click", (e) => {
  const success = "Email cadastrado com sucesso!";
  const error = "Há algo errado com este email!";

  e.preventDefault();
  if (email != "" && validateEmail(email)) {
    showMessage(success);
    return;
  }

  showMessage(error);
});
