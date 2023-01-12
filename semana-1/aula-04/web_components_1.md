# Web Components

## O que são Web Components?

**Web Components** é uma suíte de diferentes tecnologias que permite a criação de **elementos customizados reutilizáveis** — com a funcionalidade separada do resto do seu código — e que podem ser utilizados em suas aplicações web.

## Tecnologias

Web Components são formados por tecnologias que podem ser usadas em conjunto para criar elementos **customizados**, com funcionalidade **encapsulada**, que podem ser reutilizados onde você quiser sem preocupação com conflito de código.

- *Elementos customizados*: Um conjunto de APIs JavaScript que permite definir elementos customizados e seus respectivos comportamentos, podendo ser utilizados de diferentes formas na interface da aplicação.
- *Shadow DOM*: Um conjunto de APIs JavaScript para incorporar uma árvore DOM ***"fantasma"*** encapsulada a um elemento — *que é renderizada separadamente do DOM do documento principal* — e controlar a funcionalidade associada. Nesse caso, você pode manter os recursos de um elemento privados, fazendo com que seu comportamento e estilo possam ser escritos sem medo de causar conflito com outras partes do documento.
- *Templates HTML*: Os elementos `<template>` e `<slot>` permitem que você escreva templates de marcação que não são exibidas na página. Elas podem então ser reutilizadas várias vezes como modelo de estrutura de um elemento customizado.
- *HTML Import*: Com o HTML Import podemos importar documentos HTML inteiros para dentro de nossas páginas. De uma maneira semelhante à importação de um arquivo JavaScript ou CSS, o HTML Import cria uma nova requisição ao servidor para realizar o download do arquivo.
- *ES Modules* — Pra quem é familiar com module loaders, é exatamente isso! É uma spec criada para o JavaScript ter a possibilidade de carregar módulos nativamente!
- *Decorators*: Os decoradores aplicam os templates com base em seletores CSS e JavaScript para criar mudanças visuais e comportamentais. O elemento "content" inserido dentro do template será substituído com o conteúdo do elemento de decoração.

> Sendo que essa última, diferente das demais, ainda não possui uma especificação e tem sido bastante omitida pela comunidade. Não a abordaremos neste momento, por não termos tanto material disponível sobre, mas poderemos ver mais futuramente com o Angular

## Vantagens X Desvantagens

Web Components não trazem apenas a facilidade de gerar components reutilizáveis através de qualquer tecnologias, como também:

- **Component Compilers** tendem a ter um ambiente mais simples de configuração para desenvolvimento
- **Liberdade de criação do projeto**, já que você usa uma lib para criação de componentes, *você pode usar qualquer outra lib que quiser* para coisas como: *navegação entre rotas*, *animações*, etc…
- Caso você tenha uma **arquitetura de Micro Frontend**, Web Components ajudam a facilitar a criação dessa arquitetura
- A grande maioria dos browsers suporta todas as especificações, porém, caso tenha algum browser que você precise suportar que não aceite Web Components, não tem problema! **Existem polyfills para todas as specs!**
- SSR com Web Components é a coisa mais fácil do mundo

Muito legal né? Parece mil maravilhas, porém, existem algumas ressalvas

- Nem toda lib de Web Component tem uma documentação legal sobre testes unitários
- Testes E2E ainda não são possíveis (Dizem que WebDriver suporta com a ajuda de um plugin, mas não testei ainda). Leia sobre: <https://github.com/WICG/webcomponents/issues/771>

## Tipos de renderização do DOM

Para começar a entender os web components, é necessário entender a diferença entre DOM, Virtual DOM e Shadow DOM.

### O que é o DOM?

**DOM** significa **Document Object Model** (*Modelo de Objeto de Documento*). Ele é uma API que nos permite acessar e manipular documentos HTML e XML válidos.

![DOM](https://dkrn4sk0rn31v.cloudfront.net/2020/03/24084532/Estrutura-DOM.png)

### Shadow DOM

O **Shadow DOM** é uma tecnologia do navegador projetada para podermos criar componentes que contém uma aparência e comportamento sem influenciar os demais elementos a sua volta, escondendo sua estrutura.

Um exemplo bem simples: se você trabalha com HTML, provavelmente já viu a tag `<video>`,

![Shadow DOM](https://media.geeksforgeeks.org/wp-content/uploads/20200812195912/shadow.png)

### O que é Virtual DOM?

O **Virtual DOM (VDOM)** é uma representação do DOM mantida em memória. Assim, quando precisamos fazer alguma alteração, ela é feita no Virtual DOM, que é bem mais rápido que o DOM. Com isso ele analisa todos os lugares que serão afetados e sincroniza com o DOM em um processo chamado ***Reconciliação***. A vantagem disso é que essa análise permite que haja o menor número possível de acessos ao DOM, melhorando muito a performance das aplicações.

![Virtual DOM](https://i0.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png?ssl=1)

> As primeiras versões do Angular trabalhavam com Shadow DOM, que posteriormente foi migrado para o Virtual DOM

## Inciando com Web Components

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <my-title></my-title>
  <script>
    class MyTitle extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <style>
            h1 {
              font-size: 2em;
              color: hotpink;
              font-family: monospace;
              text-align: center;
              text-transform: uppercase;
              text-decoration: pink solid underline;
              text-decoration-skip: ink;
            }
          </style>
          <h1>Hello by My Component</h1>
        `;
      }
    }

    customElements.define('my-title', MyTitle);
  </script>
</body>
</html>
```

## Callbacks do ciclo de vida

Funções `callback` especiais definidas dentro da classe do elemento customizado, afetando seu comportamento:

- ***connectedCallback***: Invocada quando um elemento customizado é adicionado ao DOM do documento.
- ***disconnectedCallback***: Invocada quando o elemento customizado é desconectado do DOM do documento.
- ***adoptedCallback***: Invocada quando o elemento customizado é movido para um novo documento.
- ***attributeChangedCallback***: Invocada quando um dos atributos de um elemento customizado é adicionado, removido ou alterado.

## Usando o Shadow DOM

Um aspecto importante dos componentes da Web é o encapsulamento — ser capaz de manter a estrutura, o estilo e o comportamento da marcação ocultos e separados de outros códigos na página para que diferentes partes não entrem em conflito e o código possa ser mantido bom e limpo. A API Shadow DOM é uma parte fundamental disso, fornecendo uma maneira de anexar um DOM separado oculto a um elemento.

O encapsulamento via shadow DOM funciona da seguinte maneira:

```javascript
const shadow = this.attachShadow({ mode: 'closed' });
```

O modo pode ser:

- *“open”* — JavaScript na página externa pode acessar o Shadow DOM, ou
- *“closed”* — o Shadow DOM só pode ser acessado dentro do Web Component.
  
O Shadow DOM pode ser manipulado como qualquer outro elemento DOM:

```javascript
connectedCallback() {

  const shadow = this.attachShadow({ mode: 'closed' });

  shadow.innerHTML = `
    <style>
      p {
        text-align: center;
        font-weight: normal;
        padding: 1em;
        margin: 0 0 2em 0;
        background-color: #eee;
        border: 1px solid #666;
      }
    </style>

    <p>Hello ${ this.name }!</p>`;

}
```

O componente agora renderiza o texto “Hello” dentro de um `<p>` elemento e o estiliza. Não pode ser modificado por JavaScript ou CSS fora do componente, embora alguns estilos como a fonte e a cor sejam herdados da página porque não foram explicitamente definidos.

Quando você anexa um shadow DOM a um elemento, manipulá-lo é apenas uma questão de usar as mesmas APIs DOM que você usa para a manipulação regular do DOM:

```javascript
const para = document.createElement("p");
shadow.appendChild(para);
// etc.
```

---

## Docs

- <https://developer.mozilla.org/pt-BR/docs/Web/Web_Components>
- <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements>
- <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM>
- <https://www.webcomponents.org/>
- <https://github.com/mdn/web-components-examples>
- <https://component.gallery/>
- <https://genericcomponents.netlify.app/index.html>
- <https://github.com/scottaohara/accessible_components>
- <https://www.devmedia.com.br/web-components-na-pratica/32476>
- <https://www.zup.com.br/blog/web-components-o-que-sao-como-aplicar>

---

## Desafio

Crie um relógio ou uma contagem regressiva com web components. Ou seja mais arrojado e faça qualquer um dos ultimos exercícios usando Web Components.

[//]: <> (Video todo list: https://www.youtube.com/watch?v=0QpyCn3BmGY)
[//]: <> (Exemplo: https://www.youtube.com/watch?v=fZZAt0Sbz5k)
