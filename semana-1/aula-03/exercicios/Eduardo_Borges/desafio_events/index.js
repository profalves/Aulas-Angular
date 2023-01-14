$ = (query) => {
    const element = document.querySelector(query);
  
    if (element && element.lenght > 1) return element[0];
    return element;
}


$("#botao-submit").onclick = function(event){
    event.preventDefault();

    const email = $("#text-newsletter").value

    if(email.includes("@") && email.includes(".com")) {

        $("#resposta").classList.add("certo")
        $("#resposta").classList.remove("errado")
        $("#resposta").classList.remove("invisivel")
        $("#resposta").innerText = `Parabéns! A partir de agora você vai receber sempre nossas últimas notícias.`

    } else {

        $("#resposta").classList.add("errado")
        $("#resposta").classList.remove("certo")
        $("#resposta").classList.remove("invisivel")
        $("#resposta").innerText = `E-mail inválido. Por favor, digite um e-mail válido.`

    }

}

$("#text-newsletter").onkeyup = function(event){

    event.stopPropagation()

    console.log(event.target.value.length)

    if(event.target.value.length === 0){

        $("#resposta").classList.add("invisivel");

    }

}
