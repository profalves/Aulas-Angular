var form = document.getElementById("form-subscribe");
var email = document.getElementById("email");
var message = document.getElementById("message");
var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

form.onkeydown = function (e) {
  if (email.value.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
    message.innerHTML = "Nice e-mail. Your input email valid";
    message.style.color = "#03CE55";
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
    message.innerHTML = "Your input email is not valid. Try again!";
    message.style.color = "#ED4443";
  }

  if (email == "") {
    form.classList.remove("valid");
    form.classList.remove("invalid");
    message.innerHTML = "";
  }
};

form.onsubmit = function (e) {
  if (email.value == "") {
    message.innerHTML = "You need to fill some valid email";
    message.style.color = "#ED4443";
    e.preventDefault();
  } else {
    alert(
      "Congratulations, you have just subscribed to the best newsletter in the world!"
    );
  }
};
