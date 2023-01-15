var ingredientes = {
    sabor: "",
    pizzas: function (){
    }
}

let fragoCarijo = {
    sabor: " frango desfiado, mussarela, milho, bacon, creme de leite, azeitonas pretas"
}

let atumCremosa = {
    sabor: " atum, mussarela, catupiry, azeitonas pretas, cebola"
}

let philadelphia = {
    sabor: " calabresa, peito de peru, cream cheese, oregano, azeitonas pretas"
}

let marguerita = {
    sabor: " mussarela, tomate, azeitona, oregano"
}

prepararPizzaFrangoCarijo = ingredientes.pizzas.bind(fragoCarijo);
prepararPizzaAtumCremosa = ingredientes.pizzas.bind(atumCremosa);
prepararPizzaPhiladelphia = ingredientes.pizzas.bind(philadelphia);
prepararPizzaMarguerita= ingredientes.pizzas.bind(marguerita);

prepararPizzaFrangoCarijo();
prepararPizzaAtumCremosa();
prepararPizzaPhiladelphia();
prepararPizzaMarguerita();