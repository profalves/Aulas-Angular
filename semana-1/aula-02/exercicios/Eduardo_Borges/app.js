$ = (query) => {
    const element = document.querySelector(query);
  
    if (element && element.lenght > 1) return element[0];
    return element;
}

carrinho = {

    produtos: [],
    total: 0,
    desconto: 0

}

descontos = [{
    desconto: "25",
    valor: 0.25
},
{
    desconto: "10",
    valor: 0.1
},
{
    desconto: "5",
    valor: 0.05
}]

items = [{
    codigo: 1,
    descricao: "Item " + 1,
    valor: 1
},{
    codigo: 2,
    descricao: "Item " + 2,
    valor: 2
},
{
    codigo: 3,
    descricao: "Item " + 3,
    valor: 3
},
{
    codigo: 4,
    descricao: "Item " + 4,
    valor: 4
},
{
    codigo: 5,
    descricao: "Item " + 5,
    valor: 5
},
{
    codigo: 6,
    descricao: "Item " + 6,
    valor: 6
}
]

function preencherItens(){

    items.forEach(e => {

        $('#produtos').innerHTML += `
        <div class="produto">
            <img src="https://via.placeholder.com/150" alt="">
            <div>${e.descricao}</div>
            <div>R$ ${e.valor}</div>
            <button onclick="colocarCarrinho(${e.codigo})" class="botao-comprar">Comprar</button>
        </div>`      
        });

        
        $('#total').innerHTML = carrinho.total
    
}

function colocarCarrinho(codigo){

    const produto = items.filter(e => e.codigo === codigo)[0]
 
    changeState(() => {

        const produto_carrinho = carrinho.produtos.findIndex(e => e.codigo === codigo)
        console.log(produto_carrinho)

        if(produto_carrinho > -1){            
        
            carrinho.produtos[produto_carrinho].qtd += 1
        
        } else {

            produto.qtd = 1
            carrinho.produtos.push(produto)

        }

        carrinho.total = carrinho.produtos.reduce((a,b) => {
            return a + (b.valor * b.qtd)
        }, 0)

    })

}

function aplicaDesconto(){

    const codigo = $('#codigo-desconto').value

    const desconto = descontos.filter(e => e.desconto === codigo)[0]

    changeState(() => {

        carrinho.desconto = desconto.valor
            
    })

}

function changeState(callback) {
    callback();
    renderDOM();
}

function renderDOM(){

    if(carrinho.desconto > 0){
        
        $('#total').innerHTML = carrinho.total - (carrinho.total * carrinho.desconto) 
        renderItensCarrinho()
    
    }else{

        $('#total').innerHTML = carrinho.total
        renderItensCarrinho()

    }

}

function renderItensCarrinho(){

    let lista_carrinho = ""

    console.log(carrinho)

    carrinho.produtos.forEach(e => {

        lista_carrinho += `<li><span>${e.qtd}x - </span>${e.descricao}<input type="button" value="X" onclick="removerItem(${e.codigo})"></li>`

    })

    $("#lista-carrinho").innerHTML = lista_carrinho

}

function removerItem(codigo){

    changeState(() => {

        const produto_carrinho = carrinho.produtos.findIndex(e => e.codigo === codigo)
        console.log(produto_carrinho)

        if(produto_carrinho > -1 && carrinho.produtos[produto_carrinho].qtd > 1){            
        
            carrinho.produtos[produto_carrinho].qtd -= 1
        
        } else {

            carrinho.produtos.splice(produto_carrinho, 1)

        }

        carrinho.total = carrinho.produtos.reduce((a,b) => {
            return a + (b.valor * b.qtd)
        }, 0)

    })

}

preencherItens();

