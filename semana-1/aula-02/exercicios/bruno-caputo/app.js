// State challenge made with Nanny
import { Nanny, html } from "https://cdn.skypack.dev/nanny-state";

// Not Implemented
const discountCoupons = [
  { name: "50OFF", offPercent: 50 },
  { name: "25OFF", offPercent: 25 },
];

const products = [
  { id: 0, price: 85.9, name: "Bola" },
  { id: 1, price: 100.0, name: "Celular" },
  { id: 2, price: 50.5, name: "Tênis" },
  { id: 3, price: 35.8, name: "Boneca" },
];

const Product = (product, state) =>
  html`<div>
    <input
      type="checkbox"
      id="${"prod-" + product.id.toString()}"
      name="${"prod-" + product.id.toString()}"
      onchange="${(e) =>
        state.changeCart(e.target.checked, e.target.id, state.total)}"
    />
    <label for="${"prod-" + product.id.toString()}">
      ${product.name} - R$${product.price.toFixed(2)}
    </label>
  </div>`;

const View = (state) => html`
  <h1>Carrinho de compras</h1>
  <h3>Custo total: R$${state.total.toFixed(2)}</h3>
  <div id="container" style="display: flex; flex-direction: column;">
    ${state.products.map((product) => html` ${Product(product, state)} `)}
  </div>
  <button
    id="checkout"
    style="margin-top: 10px;
    font-size: 16px;
    border: none;
    background-color: aquamarine;
    padding: 10px;
    border-radius: 10px;"
    onclick="${(e) => {
      e.preventDefault();
      checkout(state.total);
    }}"
  >
    Finalizar compra
  </button>
`;

const changeCart = (checked, id, total) => {
  id = id.split("-")[1];
  const prod = products.find((product) => product.id.toString() === id);
  if (checked) {
    addToCart(prod, total);
  } else {
    removeFromCart(prod, total);
  }
};

const addToCart = (prod, total) => {
  return Update({ total: (total += prod.price) });
};

const removeFromCart = (prod, total) => {
  return Update({ total: (total -= prod.price) });
};

const checkout = (total) => {
  alert(`Sua compra deu R$${total.toFixed(2)}`);

  //Uncheck all checkboxes
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes.item(i).checked = false;
  }

  Update({ total: 0.0, discount: 0.0 });
};

const State = {
  total: 0.0,
  discount: 0.0, // Not Implemented
  products,
  changeCart,
  checkout,
  View,
};

const Update = Nanny(State);
