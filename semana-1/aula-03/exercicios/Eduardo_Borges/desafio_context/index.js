var ingredientes = {

    sabor: "",
    pizza: function (){
        console.log("Ingredientes: Trigo, fermento, molho de tomate," + this.sabor)
    }


}


let portuguesa = {
    sabor: " ovo cozido, azeitona, mussarela, presunto"
}

let calabresa = {
    sabor: " calabresa, cebola"
}

let frangoCatupiry = {
    sabor: " frango, catupiry"
}

fazerPizzaPortuguesa = ingredientes.pizza.bind(portuguesa)
fazerPizzaCalabresa = ingredientes.pizza.bind(calabresa)
fazerPizzaFrangoCatupiry = ingredientes.pizza.bind(frangoCatupiry)

fazerPizzaPortuguesa()
fazerPizzaCalabresa()
fazerPizzaFrangoCatupiry()