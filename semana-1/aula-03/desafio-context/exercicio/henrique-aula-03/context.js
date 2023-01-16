const objeto = {
  name: "lápis",
  coloracao(cor) {
    return `${this.name} tem a cor ${cor}`;
  },
};

objeto.coloracao("Azul"); // Lápis tem a cor Azul

const corObjeto = objeto.coloracao.bind(objeto);
const trocaVermelho = objeto.coloracao.bind(objeto, "Vermelho");

corObjeto("Laranja"); // Lápis tem a cor Laranja
trocaVermelho(); // Lápis tem a cor Vermelho

const trocaCor = objeto.coloracao;
trocaCor.call(objeto, "Rosa"); // Lápis tem a cor Rosa
