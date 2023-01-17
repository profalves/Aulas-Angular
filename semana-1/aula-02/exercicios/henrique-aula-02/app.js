$ = (query) => {
  const element = document.querySelector(query);

  if (element && element.lenght > 1) return element[0];
  return element || null;
};

products = [
  {
    id: 1,
    name: "Cerveja",
    price: 5,
    quantity: 0,
  },
  {
    id: 2,
    name: "Refrigerante",
    price: 12,
    quantity: 0,
  },
  {
    id: 3,
    name: "Vinho",
    price: 32,
    quantity: 0,
  },
  {
    id: 4,
    name: "Champagne",
    price: 123,
    quantity: 0,
  },
];

function renderDOM() {
  $("#totalPrice").innerHTML = "0";
}

function add(item) {
  products.map((product) => {
    if (product.name == item) {
      product.quantity++;
      $(`#${product.name}`).innerHTML = `${product.quantity}`;
    }
  });

  calculate();
}

function remove(item) {
  products.map((product) => {
    if (product.name == item) {
      if (product.quantity <= 0) return;
      product.quantity--;
      $(`#${product.name}`).innerHTML = `${product.quantity}`;
    }
  });

  calculate();
}

function calculate() {
  let price = 0;
  let prices = [];
  products.map((product) => {
    if (product.quantity > 0) {
      price = product.price * product.quantity;
      prices.push(price);
    }
  });

  const totalSum = prices.reduce((a, b) => a + b, 0);

  $("#totalPrice").innerHTML = totalSum;
}

renderDOM();
