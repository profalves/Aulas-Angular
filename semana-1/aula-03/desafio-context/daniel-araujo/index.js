var pizza = 'Frango com catupiri';
var pizzaIngredients = ['queijo', 'frango', 'azeitona', 'molho de tomate', 'catupiri'];

function cozinhar() {
  console.log(`Ingredientes da pizza ${this.pizza}: ${this.pizzaIngredients}`);
}


let cozinharPizzaCalabresa = {
  pizza: 'Calabresa',
  pizzaIngredients: ['queijo', 'calabresa', 'azeitona', 'molho de tomate'],
  cozinhar: function () {
    console.log(`Ingredientes da pizza de ${this.pizza}: ${this.pizzaIngredients}`);
  }
}

let cozinharPizzaPortuguesa = {
  pizza: 'Portuguesa',
  pizzaIngredients: ['queijo', 'seleta', 'azeitona', 'molho de tomate'],
  cozinhar: function () {
    console.log(`Ingredientes da pizza de ${this.pizza}: ${this.pizzaIngredients}`);
  }
}

cozinhar();
cozinharPizzaCalabresa.cozinhar();
cozinharPizzaPortuguesa.cozinhar();




