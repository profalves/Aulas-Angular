$ = (query) => {
  const element = document.querySelector(query);
  if (element && element.lenght > 1) return element[0];
  return element;
}

$("#botao").onclick = function (event) {
  event.preventDefault();

  const email = $("#input-text").value

  if (email.includes("@") && email.includes(".com") || email.includes("br")) {

    $("#resposta").classList.add("correto")
    $("#resposta").classList.remove("incorreto")
    $("#resposta").innerText = `Você foi cadastrado em nossa plataforma e receberá todas as noticias desejadas.`

  } else {

    $("#resposta").classList.add("incorreto")
    $("#resposta").classList.remove("correto")
    $("#resposta").innerText = `E-mail inválido. Por favor, digite um E-mail válido.`
  }
}

$("#input-text").onkeyup = function (event) {
  event.stopPropagation()
  if (event.target.value.length === 0) {
    $("#resposta").classList.add("tooltip");
  }
}