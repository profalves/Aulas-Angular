import { Nanny, html } from "https://cdn.skypack.dev/nanny-state";


const frutas = [
  { id: 0, price: 75.5, name: "Pomelo" },
  { id: 1, price: 75.5, name: "Aguacate" },
  { id: 2, price: 75.5, name: "Manzanas" },
  { id: 3, price: 75.5, name: "Granadas" },
  { id: 4, price: 75.5, name: "Fresas" },
  { id: 5, price: 75.5, name: "Limones" },
  { id: 6, price: 75.5, name: "Durian" },
  { id: 7, price: 75.5, name: "Moras" },
  { id: 8, price: 75.5, name: "Naranjas" },
  { id: 9, price: 75.5, name: "Guayaba" },

];

const Fruta = (fruta, state) =>
  html`<div>
    <input
      type="checkbox"
      id="${"prod-" + fruta.id.toString()}"
      name="${"prod-" + fruta.id.toString()}"
      onchange="${(e) =>
        state.changeCart(e.target.checked, e.target.id, state.total)}"
    />
    <label for="${"prod-" + fruta.id.toString()}">
      ${fruta.name} - R$${fruta.price.toFixed(2)}
    </label>
  </div>`;

const View = (state) => html`
  <h1>Carrinho de compras</h1>
  <h3>Custo total: R$${state.total.toFixed(2)}</h3>
  <div id="container" style="display: flex; flex-direction: column;">
    ${state.frutas.map((fruta) => html` ${Fruta(fruta, state)} `)}
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
  const prod = frutas.find((fruta) => fruta.id.toString() === id);
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

 
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes.item(i).checked = false;
  }

  Update({ total: 0.0, discount: 0.0 });
};

const State = {
  total: 0.0,
  frutas,
  changeCart,
  checkout,
  View,
};

const Update = Nanny(State);