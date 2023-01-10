# State no Javascript

## Uma reintrodução ao JavaScript

Por que uma reintrodução? Porque JavaScript é conhecida como a mais incompreendida linguagem de programação do mundo. Embora muitas vezes ridicularizada como um brinquedo, por baixo de sua simplicidade enganosa estão alguns recursos poderosos da linguagem, que agora é usado por um número incrível de aplicações de alto nível, mostrando que o conhecimento mais profundo desta tecnologia é uma habilidade importante para qualquer desenvolvedor web, mobile ou desktop.

É importante sempre voltar aos conceitos básicos para poder aprimorar o conhecimento já adquirido na linguagem.

<https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Language_Overview>

### Voltando ao início de tudo: Tipos Primitivos X Não Primitivos

O por quê do javascript ser uma linguagem de tipagem dinamica? Qual é a diferença entre tipos primitivos e os não-primitivos? O que é conceito particular do javascript e geral em outras linguagens neste assunto?

### Imutabilidade

Imutabilidade em seu conceito mais simples é algo que não pode ser alterado. No conceito de programação a imutabilidade se aplica normalmente a objetos/variáveis que não podem ter seu estado modificado após serem criados, mas isso não garante que os seus valores serão sempre os mesmos.

Evita que erros assim aconteçam:

```javascript
const person = {}
const clonedPerson = person
person.name = 'John'

console.log(person.name) // 'John'
console.log(person.clonedPerson) // 'John'
```

Esta é a principal razão pelo qual um estado jamais deverá ser alterado diretamente.

## O que é state (estado) no Javascript?

Gerência de estados tem sido um assunto da atualidade, principalmente se você está envolvido com Javascript e toda velocidade do nosso ecossistema gigantesco, com certeza, pelo menos já se deparou com algo sobre.

O conceito geral de estado na programação é uma fonte única de verdade. Na época do JQuery, o html era o state da aplicação e o que os famosos frameworks fizeram foi trazer o state para o javascript para gerenciá-lo e facilitar o reloading, melhorando a experiência de desenvolvimento.

### Controlando o estado

Como Vanilla é cada um por si, não tem maneira certa pra fazer não... se quiser usar classes, desde que seus testes cubram bem a usabilidade, por que não? A diferença entre ser mais e menos funcional é só como vai guardar as informações.

Se quiser algo mais funcional é só ficar mais atento em relação a imutabilidade (e evitar usar os this).

```javascript
// factory
const createStore = function (initialState = {}) {
  let state = initialState

  return {
    get: () => state,
    update: (newState) => {
      // usando como exemplo um shallow copy, mas você pode utilizar algum algoritmo
      // ou algo pronto pra deep copy, atentando em relação a imutabilidade
      state = {
        ...state,
        ...newState
      }
    },
    unset: (key) => {
      const { [key]: _, ...rest } = state
      state = rest
    }
  }
}

const myStore = createStore(/* tua store inicial */)

// e ficar atento a sempre chamar `myStore.get` pra pegar sempre
// a store atualizada, e repassando o `myStore` pra onde precisar.
```

### Implementações

Em Javascript nós possuímos algumas implementações famosas que gerenciam estados. A que eu acredito ser a mais conhecida, é a [Redux](https://redux.js.org/), que se define como uma máquina de estados previsíveis para aplicativos JavaScript. O objetivo dela é te ajudar a escrever aplicações que se comportam de forma consistente, funcionam em diferentes ambientes de desenvolvimento, como clientes, servidores e ambientes nativos que são fáceis de serem testadas. Você pode usar o Redux diretamente com **React** ou de forma **agnóstica** em qualquer aplicação JS.

Outra implementação conhecida atualmente é exclusiva para **VueJS**, a [Vuex](https://vuex.vuejs.org/ptbr/). Ela se define como um padrão de gerenciamento de estados que serve como um centralizador das informações para todos os componentes. Suas regras internas garantem que o estado da aplicação só possa ser mudado de forma previsível. Assim como Redux, Vuex possui uma extensão para o DevTools do Firefox e do Chorme. Além de você ‘viajar no tempo’ da aplicação, você pode exportar e importar estados prévios.

A terceira mais famosa implementação de gerência de estados (e a mais recente) é a [ngRX](https://ngrx.io/) (que é a junção do Redux com RxJS) e é exclusiva para **Angular**. ***Aliás é nela que precisaremos focar em nossos estudos***. A biblioteca elenca suas qualidades começando pelo fato de que o estado é uma estrutura de dados única e imutável, que as ações definem as mudanças no estado, e que as funções responsáveis pelas alterações no estado são puras. Como por baixo do capô dela nós temos o Redux, quem já está acostumado com ela e está trabalhando com Angular, não terá problema algum em usar a biblioteca. Da mesma maneira, você poderá usar a extensão do Redux para o DevTools dos navegadores.

### Mão na Massa: Gerenciamento De Estado Simples Em JavaScript Com Nanny State

Vamos realizar uma breve implementação com [Nanny State](https://github.com/daz4126/Nanny-State), que é uma pequena biblioteca para ajudar a criar aplicativos da Web baseados em estado usando JS puro. É semelhante ao React, mas com muito menos sobrecarga e nova sintaxe simples para aprender. Ele também usa um único objeto de estado em todo o aplicativo em vez de cada componente individual ter seu próprio estado. Foi inspirado no [HyperApp](https://github.com/jorgebucaran/hyperapp) e tem muitas semelhanças com o [Elm](https://elm-lang.org/).

*Nanny State* usa um modelo de fluxo de dados unidirecional, composto de 3 partes:

* State  – um objeto que armazena todos os dados do aplicativo
* View  – uma função que retorna uma string de HTML com base no estado atual
* Update  – uma função que é a única maneira de alterar o estado e renderizar novamente a exibição

![Nanny State](https://user-images.githubusercontent.com/16646/171490664-2859a7ea-f4c4-47c3-8b96-edfa6f196bbb.png)

Segue abaixo um exemplo simples de um componente usando essa biblioteca:

```javascript
import { Nanny,html } from 'https://cdn.skypack.dev/nanny-state';

const View = state => html`<h1>Hello ${state.name}</h1>`

const State = {
  name: "Nanny State",
  View
}

const Update = Nanny(State)
```

## Docs

* <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Data_structures>
* <https://developer.mozilla.org/pt-BR/docs/Glossary/Primitive>
* <https://dev.to/carlosrafael22/de-volta-ao-basico-tipos-primitivos-e-objetos-em-javascript-h9g>
* <https://blog.codecasts.com.br/pure-finctions-immutability-clean-code-quality-31825b0d7516>
* <https://medium.com/opensanca/imutabilidade-eis-a-quest%C3%A3o-507fde8c6686>
* <https://www.youtube.com/watch?v=n5uiJr-v0KQ>
* <https://morioh.com/p/d86c97c99528>

## Desafio

Crie uma simulação simples de carrinho de compras de loja virtual. Use o state para armazenar informações e poder calcular o valor total do pedido.
