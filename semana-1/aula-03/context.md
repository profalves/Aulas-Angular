# this (javascript)

## O que é "this"?

Em JavaScript, **contexto** refere-se a um objeto. Dentro de um objeto, a palavra-chave **this** refere-se a esse objeto (ou seja, **“self”**) e fornece uma interface para as propriedades e métodos que são membros desse objeto. Quando uma função é executada, a palavra-chave *“this”* refere-se ao objeto no qual a função é executada.

### Exemplo #1 (sem o this)

```javascript
var drink = 'wine';

var foo = {
    drink: "beer",
    getDrink: function(){
        return drink;
    }    
};

console.log( foo.getDrink() ); // wine
```

### Exemplo #2 (com o this)

```javascript
var drink = 'wine';

var foo = {
    drink: "beer",
    getDrink: function(){
        return this.drink; // 'this' refers to the object "foo"
    }    
};

console.log( foo.getDrink() ); // beer
```

### Aqui estão alguns cenários

- Quando uma função é executada no contexto global, **“this”** refere-se ao objeto **global** (nodejs) ou **window** (browsers)

```javascript
window === this // true
```

- Quando uma função é um método de um objeto, **“this”** refere-se a esse objeto (a menos que seja executado manualmente no contexto de um objeto diferente)

```javascript
var nome = "Paulo"
var sobrenome = "Viana"

var Pessoa = {
  nome: "José",
  sobrenome: "Augusto",
  exibeNomeCompleto: function() {
    return `${this.nome} ${this.sobrenome}`
  },
}

var exibeNomeCompleto = Pessoa.exibeNomeCompleto

console.log(Pessoa.exibeNomeCompleto()) // José Augusto
console.log(exibeNomeCompleto()) // Paulo Viana
```

- Quando você instancia uma função construtora, dentro do objeto de instância, **“this”** refere-se ao objeto de instância

```javascript
function Carro(marca, modelo, ano){
    this.marca = marca
    this.modelo = modelo
    this.ano = ano
}

const carro1 = new Carro('Charger', 'RT', 1970)

console.log(carro1)
```

A palavra-chave `this` comporta-se um pouco diferente em Javascript se comparado com outras linguagens. Também possui algumas diferenças entre o *modo estrito* e o *modo não estrito*.

O comportamento do `this` depende, então do:

1. Escopo e Contexto
2. Modo Estrito

## 1. Escopo vs Contexto

- **Escopo** (scope)

  - **Acesso** às variáveis, funções e objetos numa parte do código, durante o tempo de execução.
  - Determina a **visibilidade** desses recursos em alguma parte do código.
  - Sempre invocamos uma função, estamos criando um novo `scope`

- **Contexto** (context)

  - Enquanto o `scope` se refere às diversas variáveis, o `context` se refere ao valor do `this` no mesmo `scope`
  - Pode ser mudado com funções especiais como: `.apply()`, `.call()` e `.bind()`
  - No contexto de execução (execution context), o contexto já não é mais esse contexto que estamos discutindo. Ele será o `scope`

Temos 2 `scopes`:

1. **Global**
   1. No momento que começamos a escrever código, estamos nesse contexto.
   2. Existe enquanto existir a aplicação
2. **Local**
   1. Dentro de alguma função, variáveis estão no escopo (contexto) local.
   2. Existe equanto existir a função ou o objeto.
3. **Bloco**
   1. Quando elimitado com a declaração `let` ou `const`.

## 2. Modo Estrito (strict mode)

- Muda a semântica do javascript
- É opcional
- `"use strict"` para habilitar no contexto
- Elimina alguns erros silênciosos
- Evita algumas confusões
- Proíbe algumas sintaxes, entre elas a criação de variáveis sem o uso de declarações `var`, `let` ou `const`, e exigir que nomes de parâmetros de função sejam únicos

## Métodos de contexto

### Call

O método call é responsável por executar uma função e em seu primeiro parâmetro é passado o contexto que será aplicado nesta execução, por exemplo:

```javascript
var nome = "Rodrigo"
var sobrenome = "Alves"

var Pessoa = {
  nome: "José",
  sobrenome: "Augusto",
  exibeNomeCompleto: function() {
    return `${this.nome} ${this.sobrenome}`
  },
}

console.log(Pessoa.exibeNomeCompleto.call(window)) // Rodrigo Alves
console.log(Pessoa.exibeNomeCompleto.call(Pessoa)) // José Augusto
```

### Apply

O método apply é basicamente a mesma coisa que o método call, com a única diferença que ele aceita apenas dois parâmetros (no método call você pode passar qualquer número de parâmetros) sendo o primeiro o contexto em que será executada a função e o segundo um array com os parâmetros.

```javascript
var Calculadora = {
  soma: function(...numeros) {
    return numeros.reduce((acc, cur) => acc + cur, 0)
  },
}

var numeros = Array(8)
  .fill(1)
  .map((_, index) => index + 1)

Calculadora.soma(1, 1, 2) // 4
Calculadora.soma.apply(window, numeros) // 36
```

### Bind

O método bind é um pouco diferente, mas nem tanto. A diferença é que ele não executa a função, porém retorna sua declaração contendo o contexto passado a ele como parâmetro. Usando um dos exemplos anteriores, temos:

```javascript
var nome = "Jorge"
var sobrenome = "Luiz"

var Pessoa = {
  saudacoes: function(cidade, sigla) {
    return `Olá ${this.nome} ${this.sobrenome}, bem-vindo a ${cidade}/${sigla}`
  },
}

var saudarAlguem = Pessoa.saudacoes.bind(window)
saudarAlguem("Salvador", "BA") // // Olá Jorge Luiz, bem-vindo a Salvador/BA
```

## Arrow functions

Nas arrow functions (funções seta), o *this* é definido lexicalmente, isto é, seu valor é definido pelo contexto de execução onde está inserido. Em um código, `this` assume o objeto global. Assim este tipo de funcão ajuda com que qualquer escopo importe para ele o contexto global.

```javascript
var artista = 'The Beatles'

let bar = {
    artista: 'Dire Straits'
}

let show = {
    artista: 'Blind Guardian'
}

let tocar = () => { 
    console.log(`Estamos tocando ${this.artista}!`)
}

let tocarParaTodos = tocar // Usamos a função com o contexto global
let tocarEmBar = tocar.bind(bar) // Alteramos o contexto para o bar
let tocarEmShow = tocar.bind(show) // Alteramos o contexto para o show

tocarParaTodos() // Estamos tocando The Beatles!
tocarEmBar() // Estamos tocando The Beatles!
tocarEmShow() // Estamos tocando The Beatles!
```

## Como um manipulador de eventos DOM

Quando uma função é usada como um manipulador de eventos, seu this está definido para o elemento do evento a partir do qual foi disparado (alguns navegadores não seguem essa convenção para os listeners adicionados dinamicamente com métodos que não sejam addEventListener).

```javascript
// Quando chamado como listener, transforma o elemento 'blue'
function bluify(e){
  // sempre true
  console.log(this === e.currentTarget);
  // true quando currentTarget e target são o mesmo objeto
  console.log(this === e.target);
  this.style.backgroundColor = '#A5D9F3';
}

// Obtém uma lista de todo elemento no documento
var elements = document.getElementsByTagName('*');

// Adiciona bluify com um click listener (escutador de click)
// para que quando o elemento seja clicado se torne azul
for(var i=0 ; i<elements.length ; i++){
  elements[i].addEventListener('click', bluify, false);
}
```

> **Nota**: O mesmo pode ocorrer para um manipulador de evento in-line

```html
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
```

---

## Docs

- <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this>
- <https://blog.kevinchisholm.com/javascript/context-object-literals/>
- <https://towardsdatascience.com/javascript-context-this-keyword-9a78a19d5786>
- <https://blog.lucasviana.dev/javascript-escopo-contexto/>
- <https://imasters.com.br/javascript/javascript-entendendo-o-de-uma-vez-por-todas>
- <https://blog.cod3r.com.br/entendendo-o-this-javascript/>
- <https://youtu.be/GSqR2i-Pq6o>

### Desafio

Realizar provas de conceitos onde se descubra casos de uso para alternancia de contextos. Exemplo: Digamos que em uma pizzaria temos vários ingradientes e cada sabor usa alguns deles. Como representariamos uma alternancia de contextos para misturar os ingredientes entre os sabores vendidos na pizzaria. Outro caso de uso para ligar contextos seria a criação de uma calculadora. Use `this` e seus métodos `.apply()`, `.call()` e `.bind()`.
