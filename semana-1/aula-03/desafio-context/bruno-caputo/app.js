// Hamburger Shop
// Code executed in browser console

// Default Ingredients
var ingredients = ["Pão", "Hambúrguer", "Queijo"];

const xTudo = {
  ingredients: [
    "Pão",
    "Hambúrguer",
    "Queijo",
    "Presunto",
    "Salada",
    "Bacon",
    "Calabresa",
    "Milho",
    "Batata Palha",
  ],
};

const xSalada = {
  ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Salada"],
};

const HamburgerShop = {
  doAnOrder: function () {
    alert(`Os ingredientes do seu lanche são: ${this.ingredients.join(", ")}`);
  },
  orderOwner: function (...name) {
    alert(
      `O lanche de ${
        name[0]
      } tem os seguintes ingredientes: ${this.ingredients.join(", ")}`
    );
  },
};

// bind
const doAnOrder = HamburgerShop.doAnOrder.bind(xTudo);
const doAnOrder2 = HamburgerShop.doAnOrder.bind(xSalada);
doAnOrder();
doAnOrder2();

// call
HamburgerShop.doAnOrder.call(window);

// apply
HamburgerShop.orderOwner.apply(window, ["Maria"]);
HamburgerShop.orderOwner.apply(xTudo, ["Bruno"]);
HamburgerShop.orderOwner.apply(xSalada, ["João"]);
