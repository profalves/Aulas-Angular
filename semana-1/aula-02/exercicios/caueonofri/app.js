import { Nanny,html } from 'https://cdn.skypack.dev/nanny-state';

const View = state => html`
    <h1>Carrinho de compras</h1>
    <ul id="cartList">
    </ul>
`
const state = {

}

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


const update = Nanny(state);