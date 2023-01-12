// put ingredients here
var ingredients = [
	'cheddar', 'parmesan', 'mozarela', 'catupiry', 'pepperoni', 'onion', 'brocoli', 'endive'
]

//create your pizza flavour
const Pizza = {
	superCheese: function () {
		return ingredients.filter(ingredient => ingredient === 'cheddar' || ingredient === 'parmesan' || ingredient === 'mozarela' || ingredient === 'catupiry').toString().replace(/,/g, ', ');
	},
	pepperoni: function () {
		return ingredients.filter(ingredient => ingredient == 'pepperoni' || ingredient == 'onion').toString().replace(/,/g, ', ');
	},
	vegetarian: function () {
		return ingredients.filter(ingredient => ingredient == 'brocoli' || ingredient == 'parmesan' || ingredient == 'endive' || ingredient == 'onion').toString().replace(/,/g, ', ');
	},
	eatAll: function (...ingredients) {
		return ingredients.reduce((ing1, ing2) => ing1 + ', ' + ing2);
	}
}

// Call eatAll flavour
console.log(Pizza.eatAll.apply(this, ingredients));

// Call pepperoni flavour
console.log(Pizza.pepperoni());

// Call vegetarian flavour
console.log(Pizza.vegetarian.bind(this)());

// Call superCheese flavour
console.log(Pizza.superCheese.call(this));