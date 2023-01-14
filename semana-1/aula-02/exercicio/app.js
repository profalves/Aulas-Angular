$ = (query) => {
    const element = document.querySelector(query);
    if (element && element.lenght > 1) return element[0];
    return element;
}

carrinho = {
    produtos: [],
    total: 0
 }

items = [{
    codigo: 1,
    descricao: "Iphone 14 Pro Max",
    valor: 8.599
}, {
    codigo: 2,
    descricao: "AirPods Pro",
    valor: 1.799
},
{
    codigo: 3,
    descricao: "Heineken",
    valor: 3.69
},
{
    codigo: 4,
    descricao: "Picanha Ouro Swift",
    valor: 71.99
},
{
    codigo: 5,
    descricao: "Carvão Mineral 5kg ",
    valor: 20
}
]

function preencherItens() {
    items.forEach(e => {
        $('#produtos').innerHTML += `
        <div class="produto">
            <div>${e.descricao}</div>
            <div>R$ ${e.valor}</div>
            <button onclick="colocarCarrinho(${e.codigo})" class="botao-comprar">Adicionar ao carrinho</button>
        </div>`
    });

    $('#total').innerHTML = carrinho.total;
}

function colocarCarrinho(codigo) {
    const produto = items.filter(e => e.codigo === codigo)[0];

    changeState(() => {
        const produtos_carrinho = carrinho.produtos.findIndex(e => e.codigo === codigo)
        if (produtos_carrinho > -1) {
            carrinho.produtos[produtos_carrinho].qtd += 1
        } else {
            produto.qtd = 1
            carrinho.produtos.push(produto)
        }
        carrinho.total = carrinho.produtos.reduce((a, b) => {
            return a + (b.valor * b.qtd)
        }, 0)
    })
}

function changeState(callback) {
    callback();
    renderDOM();
}

function renderDOM() {
    if (carrinho.desconto > 0) {
        $('#total').innerHTML = carrinho.total - (carrinho.total * carrinho.desconto)
        renderItens()
    } else {
        $('#total').innerHTML = carrinho.total
        renderItens()
    }
}

function renderItens() {
    let lista_carrinho = ""
    carrinho.produtos.forEach(e => {
        lista_carrinho += `<li class="listaItens">
        <span>${e.qtd} u. - </span>
        ${e.descricao} <input type="button" value="Remover" onclick="removerItem(${e.codigo})">
        </li>`
    })
    $("#lista-carrinho").innerHTML = lista_carrinho;
}

function removerItem(codigo) {
    changeState(() => {
        const produtos_carrinho = carrinho.produtos.findIndex(e => e.codigo === codigo)
        if (produtos_carrinho > -1 && carrinho.produtos[produtos_carrinho].qtd > 1) {
            carrinho.produtos[produtos_carrinho].qtd -= 1
        } else {
            carrinho.produtos.splice(produtos_carrinho, 1)
        }
        carrinho.total = carrinho.produtos.reduce((a, b) => {
            return a + (b.valor * b.qtd)
        }, 0)
    })
}

preencherItens();