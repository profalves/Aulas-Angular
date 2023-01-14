import { Nanny,html } from 'https://cdn.skypack.dev/nanny-state';

const products = [
    {
        id: 1,
        title: "Cadeira de escritório",
        price: 300.46
    },
    {
        id: 2,
        title: "Suporte para monitor",
        price: 119.99
    },
    {
        id: 3,
        title: "Snickers barra",
        price: 2.50
    },
    {
        id: 4,
        title: "Fone de Ouvido",
        price: 39.99
    }
]

const fillProductList = function(item) {
    return html`
        <li style="background-color:#eee;width:20%; padding:10px; margin:30px" onclick="${() => toggleCart(item, true)}">
            <h3>${item.title}</h3>
            <p>R$ ${item.price}</p>
        </li>
        `
}

const fillCartList = function(item) {
    return html`
        <li style="background-color:#eee;width:20%; padding:10px; margin:30px" onclick="${() => toggleCart(item, false)}">
            <h3>${item.title}</h3>
            <p>R$ ${item.price}</p>
        </li>
        `
}

const toggleCart = function(item, operation) {
    if(operation) {
        State.items.push(item);
    }
    else {
        State.items = State.items.filter(i => i.id != item.id);
        }
    update();
}

const calcTotalAmount = function() {
    let amount = 0;
    State.items.forEach(item => {amount = amount + item.price})
    return amount;
}

const View = () => html`
    <productlist>
        <h1>Lista de Produtos</h1>
        <ul style="list-style:none;display:flex;" id="itemsList">${State.products.map(product => fillProductList(product))}</ul>
    </productlist>
    <cart>
        <h2>Carrinho</h2>
        <ul style="list-style:none;display: flex;">${State.items.map(product => fillCartList(product))}</ul>
        <h4>Total:<span style="color:#ee3333">R$ ${calcTotalAmount()}</span></h4>
    </cart>
`;

const State = {
    amount: 0,
    items: [],
    products,
    View
};

//to display app on index.html
document.getElementById('cartApp').innerHTML = State.View;

const update = Nanny(State);