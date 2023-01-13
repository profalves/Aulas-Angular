import {
	Nanny,
	html
} from 'https://cdn.skypack.dev/nanny-state';

// Add products here
const products = [{
		"id": 1,
		"productImg": "👕",
		"productName": "Shirt",
		"price": 50.00
	},
	{
		"id": 2,
		"productImg": "🧻",
		"productName": "Paper",
		"price": 7.77
	},
	{
		"id": 3,
		"productImg": "🎸",
		"productName": "Guitar",
		"price": 234.25
	},
	{
		"id": 4,
		"productImg": "🕹️",
		"productName": "Controller",
		"price": 61.19
	}
]

//Add item event
const add = event => Update(addToCart(event.target.closest('.product').id));

// Add to cart function
const addToCart = id => state =>
	({
		cart: {
			...state.cart,
			items: addItem(state.cart.items, id),
			total: state.cart.total + getProduct(state.products, id).price,
			discountTotal: state.cart.total + getProduct(state.products, id).price > 1000 ? (state.cart.total + getProduct(state.products, id).price) * 0.90 : (state.cart.total + getProduct(state.products, id).price) * 0.95
		}
	});

// Get the producty functions
const getProduct = (products, id) => products.find(product => product.id === Number(id));

// add item function
const addItem = (items, id) => items[id] ? {
	...items,
	[id]: items[id] + 1
} : {
	...items,
	[id]: 1
}

// empty card event
const clean = event => Update(state => ({
	cart: emptyCart
}));


// Product html.
const Product = product =>
	html `<div class="product" id="${product.id}">
			 <div>${product.productImg}</div>
       <h3>${product.productName}</h3>
       <span>BLR$ ${product.price.toFixed(2)}</span> <br><br>
       <button onclick=${add}>Add To Cart</button>`

// Cart html.
const Cart = state =>
	html `<div id='cart'>
         <h3>Cart</h3>
         ${Object.keys(state.cart.items).length ? 
           html`<div>${Object.entries(state.cart.items).map(([id,quant]) =>
                 html`<div>
								 ${getProduct(state.products,id).productName} - ${quant}</div>`)}
								 </div>` :
           html`<p>Add items to your cart!!</p>`}
         <p>Total: BLR$ ${state.cart.total.toFixed(2) > 500 ? state.cart.discountTotal.toFixed(2) : state.cart.total.toFixed(2)}</p>
         <button onclick=${clean} ?disabled=${!Object.keys(state.cart.items).length}>
           Clean Cart
         </button>
       </div>`

// State view
const View = state =>
	html `<h2>Shopping Card</h2>
       <div id='products' style="display:flex">
          ${state.products.map(product => html`<div style="margin: 6px">${Product(product)}</div>`)}                              
				</div>
				<div>
       		${Cart(state)}
				</div>`


// Empty card const
const emptyCart = {
	items: {},
	total: 0,
	discountTotal: 0
}

// State at the beginning
const State = {
	products,
	cart: emptyCart,
	View
}

// create a new Nanny State
const Update = Nanny(State);