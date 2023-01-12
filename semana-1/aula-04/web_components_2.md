# Web Components (Parte 2)

Temos aqui uma explanação de mais conceitos afim de explorar mais as possibilidades com Web components.

## Templates HTML

Definir HTML dentro de um script pode se tornar impraticável para Web Components mais complexos. Um `template` permite que você defina um pedaço de HTML em sua página que seu Web Component pode usar. Isso tem vários benefícios:

1. Você pode ajustar o código HTML sem ter que reescrever strings dentro do seu JavaScript.
2. Os componentes podem ser personalizados sem a necessidade de criar classes JavaScript separadas para cada tipo.
3. É mais fácil definir HTML em HTML — e pode ser modificado no servidor ou cliente antes da renderização do componente.

Os modelos são definidos em uma tag `<template>` e é prático atribuir um ID para que você possa fazer referência a ele na classe do componente:

```html
<template id="hello-world">

  <style>
    p {
      text-align: center;
      font-weight: normal;
      padding: 0.5em;
      margin: 1px 0;
      background-color: #eee;
      border: 1px solid #666;
    }
  </style>

  <p class="hw-text"></p>

</template>
```

A classe Web Component pode acessar esse modelo, obter seu conteúdo e clonar os elementos para garantir que você crie um fragmento DOM exclusivo em todos os lugares em que for usado:

```javascript
const template = document.getElementById('hello-world').content.cloneNode(true);
```

Historicamente, tem sido difícil usar a Shadow DOM em combinação com a renderização do lado do servidor porque não havia uma maneira embutida de expressar Shadow Roots no HTML gerado pelo servidor. Existem também implicações de desempenho ao anexar Shadow Roots a elementos DOM que já foram renderizados sem eles. Isso pode causar mudança no layout após o carregamento da página ou mostrar temporariamente um flash de conteúdo não estilizado ("FOUC") ao carregar as folhas de estilo do Shadow Root.

A Shadow DOM Declarativa (DSD) remove essa limitação, trazendo a Shadow DOM para o servidor.

### Como criar uma shadow root declarativa

Uma shadow root declarativa é um `<template>` com um atributo `shadowroot`: 

```html	
<main>
  <template shadowroot="open">
    <slot></slot>
  </template>
  <h2>Light content</h2>
<main>
```

Isso nos dá os benefícios do encapsulamento de Shadow DOM e projeção de slot em HTML estático. Nenhum JavaScript é necessário para produzir a árvore inteira, incluindo a Shadow Root.

## Adicionando Atributos

Como qualquer outro elemento, podemos adicionar atributos HTML:

```html
<hello-world name="Rodrigo"></hello-world>
```

Isso pode substituir o texto, então *“Olá Rodrigo!”* é exibido. Para conseguir isso, você pode adicionar uma função `constructor()` à classe `HelloWorld`, que é executada quando cada objeto é criado. Isso deve:

1. Chamar o método `super()` para inicializar a classe pai `HTMLElement`  e
2. fazer outras inicializações. Nesse caso, definiremos uma prop de `name` definida como padrão *“Mundo”*:

```javascript
class HelloWorld extends HTMLElement {

  constructor() {
    super();
    this.name = 'World';
  }

  // more code...
```

Seu componente se preocupa apenas com o atributo `name`. Uma propriedade estática `observedAttributes()` deve retornar uma matriz de propriedades a serem observadas:

```javascript
// component attributes
static get observedAttributes() {
  return ['name'];
}
```

Um método `attributeChangedCallback()` é chamado quando um atributo é definido no HTML ou alterado usando JavaScript. Ele passou o nome da propriedade, o valor antigo e o novo valor:

```javascript
// attribute change
attributeChangedCallback(property, oldValue, newValue) {

  if (oldValue === newValue) return;
  this[ property ] = newValue;

}
```

Neste exemplo, apenas a propriedade `name` seria atualizada, mas você poderia adicionar propriedades adicionais conforme necessário.

Finalmente, você precisa ajustar a mensagem no método connectedCallback() :

```javascript
// connect component
connectedCallback() {

  this.textContent = `Hello ${ this.name }!`;

}
```

> Podemos ver uma demonstração rodando no [CodePen](https://codepen.io/craigbuckler/pen/BaWqLOK)

## Eventos Shadow DOM

Seu Web Component pode anexar eventos a qualquer elemento no Shadow DOM exatamente como você faria na página DOM, como para ouvir eventos de clique em todos os filhos internos:

```javascript
shadow.addEventListener('click', e => {

  // do something

});
```

A menos que você use o `stopPropagation`, o evento irá aparecer no DOM da página, mas o evento será redirecionado. Portanto, parece vir de seu elemento personalizado, e não de elementos dentro dele.

---

## Docs

- <https://web.dev/i18n/pt/declarative-shadow-dom/>
- <https://javascript.works-hub.com/learn/web-components-api-definition-attributes-and-props-886c0>
