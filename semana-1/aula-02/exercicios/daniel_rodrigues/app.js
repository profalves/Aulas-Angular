import { Nanny, html } from "https://cdn.skypack.dev/nanny-state"

const discountCoupons = [
  { name: "50OFF", offPercent: 50 },
  { name: "25OFF", offPercent: 25 },
];

const items = [
  { id: 1, nameName: "Shirt 1", img: "./assets/shirt.jpg", price: 85.9, qtd: 0  },
  { id: 2, nameName: "Shirt 2", img: "./assets/shirt.jpg", price: 100.0, qtd: 0  },
  { id: 3, nameName: "Shirt 3", img: "./assets/shirt.jpg", price: 50.5, qtd: 0  },
  { id: 4, nameName: "Shirt 4", img: "./assets/shirt.jpg", price: 35.8, qtd: 0  },
  { id: 5, nameName: "Shirt 5", img: "./assets/shirt.jpg", price: 95.8, qtd: 0  },
  { id: 6, nameName: "Shirt 6", img: "./assets/shirt.jpg", price: 36.9, qtd: 0  },
];

const Items = (item, state) =>
  html`<div class="col-xs-6 col-md-2">
    <img src="${item.img}" style="max-width: 100%;">
    <div class="caption">
      <h4>
        ${item.nameName}
      </h4>
      <h4>
        R$${item.price.toFixed(2)}
      </h4>
    </div>
    <div class="input-group">
      <span class="input-group-btn">
        <button id="${item.id}" onclick="${(event) =>
          state.removeItem(event, state)}"
          class="btn btn-primary">-</button>
      </span>
      <input value="${item.qtd}" class="form-control" aria-label="...">
      <span class="input-group-btn">
        <button id="${item.id}" onclick="${(event) =>
          state.includeItem(event, state)}"
        class="btn btn-primary">+</button>
      </span>
    </div>
  </div>`;

  const Discount = (state) =>
    html`<div style="width: 500px; margin: 20px auto;">
      <div class="input-group">
        <input id="discount" class="form-control" aria-label="...">
        <span class="input-group-btn">
          <button onclick="${() => {
            var inputVal = document.getElementById("discount").value
            state.applyDiscount(inputVal, state)}
          }"
          class="btn btn-primary">Aplicar Desconto</button>
        </span>
      </div>
    </div>`;

const View = (state) => html`
<div class="container" style="width: 90vw; height: 90vh; padding: 5vh 5vw; margin: 5vh 5vw; background-color: #f4f4f4;">
  <div class="row" style="text-align: center;">
    <h1>Loja Virtual</h1>
  </div>

  <div id="container" class="row justify-content-evenly">
    ${state.items.map((item) => html` ${Items(item, state)} `)}
  </div>

  <div class="row align-items-center">
    ${Discount(state)}
  </div>

  <div class="row justify-content-center" style="text-align: center;">
    <div class="col">
      <h3>Valor total com desconto: R$${state.sum.toFixed(2)}</h3>
    </div>

    <div style="display: flex; flex-direction: row; justify-content: center">
      <div class="col-4">
        <button
        id="checkout"
        style="margin-top: 10px;
        font-size: 16px;
        border: none;
        background-color: lightgreen;
        padding: 10px;
        border-radius: 10px;"
        onclick="${(e) => {
          e.preventDefault();
          checkout(state.sum)
        }}"
        >
          Finalizar compra
        </button>
      </div>

      <div class="col-4">
        <button
        id="reset"
        style="margin-top: 10px;
        font-size: 16px;
        border: none;
        background-color: lightgrey;
        padding: 10px;
        border-radius: 10px;"
        onclick="${(e) => {
          e.preventDefault();
          reset();
        }}"
        >
          Resetar
        </button>
      </div>
    </div>
  </div>

  <div id="modal" class="modal">
    <div class="modal-content" style="width: 500px; margin: 30vh auto;">
      <div class="modal-body">
        <h3>O valor total da sua compra foi de:</h3>
        <h1>R$${state.sum.toFixed(2)}</h1>
      </div>
      <div class="modal-footer">
        <button 
        style="margin-top: 10px;
        font-size: 16px;
        border: none;
        background-color: lightgrey;
        padding: 10px;
        border-radius: 10px;"
        onclick="${() => {
          document.getElementById('modal').style.display='none';
          reset();
        }}"
        >Fechar</button>
      </div>
    </div>
  </div>
</div>
`;

const includeItem = (event, state) => {
  const sum = state.sum;
  const prod = items.find((item) => item.id.toString() === event.target.id);
  Update({
    prod: prod.qtd++,
    sum: (sum + prod.price)
  });
};

const removeItem = (event, state) => {
  const sum = state.sum;
  const prod = items.find((item) => item.id.toString() === event.target.id);
  if(prod.qtd < 1) return;
  Update({
    prod: prod.qtd--,
    sum: (sum - prod.price)
  });
};

const applyDiscount = (event, state) => {
  const discountApplied = state.discountApplied;
  const sum = state.sum;
  const coupom = discountCoupons.find((coupom) => coupom.name === event);
  if(coupom) {
    if(discountApplied) return;
    const discount = coupom.offPercent/100;
    
    Update({
      sum: (sum - sum*discount),
      discountApplied: true
    });
  }
}

const checkout = (sum) => {
  document.getElementById('modal').style.display='block';
}

const reset = () => {
  items.forEach((item) => {
    item.qtd = 0
  });
  Update({
    sum: 0,
    discountApplied: false
  });
};

const State = {
  sum: 0,
  discountApplied: false,
  items,
  includeItem,
  removeItem,
  applyDiscount,
  checkout,
  View,
};

const Update = Nanny(State);