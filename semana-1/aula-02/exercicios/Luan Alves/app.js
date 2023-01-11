$ = (query) => {
    const element = document.querySelector(query)
    return element
};

state = {
    itens: [
        {
            id: '1',
            name: 'Poção de HP',
            desc: 'Restaura 5 de HP a cada 1 Seg.',
            price: 5,
        },
        {
            id: '2',
            name: 'Poção de mana',
            desc: 'Restaura 2.5 de HP a cada 1 Seg.',
            price: 7,
        },
        {
            id: '3',
            name: 'Poção de HP grande',
            desc: 'Restaura 25 de HP a cada 1 Seg',
            price: 10,
        },
        {
            id: '4',
            name: 'Poção de mana grande',
            desc: 'Restaura 10 de HP a cada 1 Seg',
            price: 15,
        },
        {
            id: '5',
            name: 'Bolsa de explorador pequena',
            desc: 'Espaço para 10 itens. Suporta até 30kg',
            price: 25,
        },
        {
            id: '6',
            name: 'Bolsa de aventureiro grande',
            desc: 'Espaço para 25 itens. Suporta até 50kg',
            price: 100,
        },
        {
            id: '7',
            name: 'Espada iniciante',
            desc: 'Causa 10 de dano ao contato',
            price: 15,
        },
        {
            id: '8',
            name: 'Espada duas mãos iniciante',
            desc: 'Causa 20 de dano ao contato',
            price: 25,
        },
        {
            id: '9',
            name: 'Adaga iniciante',
            desc: 'Causa 5 de dano. 10% de causar sangramento',
            price: 10.0,
        },
        {
            id: '10',
            name: 'Escudo iniciante',
            desc: 'Vai servir',
            price: 15,
        },
        {
            id: '11',
            name: 'Arco pequeno',
            desc: `2 seg. de tempo de recarga. <br> Alcance de 10 mts`,
            price: 20,
        },
        {
            id: '12',
            name: 'Arco grande',
            desc: `3 seg. de tempo de recarga. <br> Alcance de 50 mts`,
            price: 40,
        },
        {
            id: '13',
            name: 'Flecha',
            desc: `Flecha simples de ferro. <br> 30 ~ 10 de dano`,
            price: 5,
        },
    ],
    cart: [
    ],
    totalCart: 0,
    discount: 0,
    total: 0
}

function changeState(callback){
    callback();
    renderDOM();
}

renderDOM()

function addItem(event){
    const id = event.target.dataset.id
    let item = state.cart.find( (p) => p.id == id )

    if (!item){  
        item = state.itens.find( (p) => p.id == id )
        changeState( () => {
            state.cart.push({ ...item, qnt: 1 })
        })
    } 
    
    else {
        item.qnt++
        changeState( () => {} )
    }
}

function removeItem(event){
    const id = event.target.dataset.id
    const item = state.cart.findIndex( (item) => item.id == id )

    changeState( () => {
        state.cart.splice(item, 1)
    } )
}

function updateItem(event){
    const id = event.target.dataset.id
    const func = event.target.id
    let item = state.cart.find( (p) => p.id == id )

    changeState( () => { func === 'plus' ? item.qnt++ : item.qnt > 1 ? item.qnt-- : ''} )
}

function calcTotal(){
    if (state.cart.length){
        state.total = state.cart.reduce( (a, b) => a + (b.price * b.qnt), 0)
        return;
    }

    state.total = 0
}

function renderDOM(){
    let templateItens = '';
    let templateCart = '';

    state.itens.map( (item) => {
        templateItens = `
        ${templateItens}
        <div class="card">
            <p class="card_name"> ${item.name} </p>
            <p class="card_desc"> ${item.desc} </p>
            <p class="card_price"> R$ ${item.price.toFixed(2)} </p>
            <button data-id="${item.id}" class="add-btn btn" onClick="addItem(event)" id="add-btn"> adicionar </button>
        </div>
        `
    })

    $('#productList').innerHTML = templateItens

    state.cart.map( (item) => {
        templateCart = `
        ${templateCart}
        <div class="card">
            <p class="card_name"> ${item.name} </p>
            <p class="card_desc"> ${item.desc} </p>
            <p class="card_price"> R$ ${item.price.toFixed(2)} </p>
            <div class="card_control">
                <button data-id="${item.id}" id="minus" onClick="updateItem(event)"> - </button>
                <p class="card_quant"> ${item.qnt} </p>
                <button data-id="${item.id}" id="plus" onClick="updateItem(event)"> + </button>
            </div>
            <button data-id="${item.id}" class="remove-btn btn" onClick="removeItem(event)"> Remover </button>
        </div>
        `
    })

    calcTotal()

    $('#cartList').innerHTML = templateCart
    $('#total').innerHTML = `R$ ${state.total.toFixed(2)}`
}