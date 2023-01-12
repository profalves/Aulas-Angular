$ = (query) => {
    const element = document.querySelector(query);

    if (element && element.length > 1) return element[0];
    return element
}


//model

products = [
    {
        id: 1,
        name: "Iphone 11",
        price: 2000.00
    },
    {
        id: 2,
        name: "Notabook Lenovo",
        price: 4000.00
    },
    {
        id: 3,
        name: "Carregador",
        price: 15.00
    },

]

state = 0;

function changeState(callback) {
    callback();
    renderDOM();
}

addCar = function(event) { 
    changeState(()=> {
        state += products.find(x => x.id == parseInt(event.target.value)).price
    }) 
  
} 

resetCar = function(){
   changeState(() => {
    state = 0;
   })
}


function forProduct() {
    for(let item of products) {
        $(".table-body").innerHTML += `
        <tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.price}</td> 
            <td class="text-center"><button class="btn btn-primary" value=${item.id}} onclick="addCar(event)">Adicionar ao carrinho</button></td>               
        </tr>
        `
    }
}


//view
function renderDOM() {
    $(".totalValue").innerHTML = state;
}

forProduct();