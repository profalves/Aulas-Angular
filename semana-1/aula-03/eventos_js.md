# Eventos no javascript

## Por que vamos estudar isso?

Na aula passada vimos sobre o state e que em geral, ele se torna tudo que é renderizável na aplicação, em forma de objeto que armazena esses dados que o representa.

Logo, é a única fonte de verdade onde todos os dados do aplicativo são armazenados. A renderização dos elementos nada mais é uma representação HTML do estado. Quando um usuário interage com a página, ele aciona manipuladores de ***Eventos*** definidos na exibição que se conectam ao método que atualiza o estado. Essa deve ser a única maneira de alterar o estado e garantir que todas as atualizações sejam determinísticas com resultados previsíveis. Resulta que sempre que o estado é atualizado, a exibição é automaticamente renderizada novamente para refletir as alterações feitas. Isso traz uma melhora na performance e experiencia de desenvolvimento.

![Estado e Eventos](https://user-images.githubusercontent.com/16646/186718499-3f60a2e9-2c27-4343-b242-ef2da1fd9c3c.png)

## O que é e como funcionam?

Eventos são ações ou ocorrências que acontecem no sistema que estamos desenvolvendo, no qual este te alerta sobre essas ações para que você possa responder de alguma forma, se desejado. Por exemplo, se o usuário clica em um botão numa pagina web, você pode querer responder a esta ação mostrando na tela uma caixa de informações.

No caso da web, eventos são disparados dentro da janela do navegador, e tende a estarem anexados a algum item especifico nele — pode ser um único elemento, um conjunto de elementos, o HTML carregado na guia atual, ou toda a janela do navegador. Existem vários tipos diferentes de eventos que podem vir a acontecer, por exemplo:

* O usuário clicando com o mouse sobre um certo elemento ou passando o cursor do mouse sobre um certo elemento.
* O usuário pressionando uma tecla do teclado.
* O usuário redimensionando ou fechando a janela do navegador.
* Uma pagina da web terminando de carregar.
* Um formulário sendo enviado.
* Um video sendo reproduzido, interrompido, ou terminando sua reprodução.
* Um erro ocorrendo.

> Outra coisa que vale mencionar a esse ponto é que eventos não são exclusivos ao JavaScript — muitas linguagens de programação possuem algum tipo de modelo de evento, e a maneira que elas funcionam irão, frequentemente, diferenciar-se da maneira que funciona em JavaScript. De fato, o modelo de evento no JavaScript para web pages difere dos outros modelos de evento do próprio JavaScript quando usados em outros ambientes.

## Formas de usar eventos

Há várias maneiras diferentes de adicionar código de ouvinte de evento a páginas da Web para que ele seja executado quando o evento associado for disparado. Nesta seção, revisaremos os diferentes mecanismos e discutiremos quais devem ser usados.

### Propriedades do manipulador de eventos

Essas são as propriedades que existem para conter o código do manipulador de eventos que vimos com mais frequência durante o curso.

```javascript
var btn = document.querySelector('button');

btn.onclick = function() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```

### Manipuladores de eventos in-line - não use esses

O método mais antigo de registrar manipuladores de eventos encontrados na Web envolveu atributos HTML de manipulador de eventos (também conhecidos como manipuladores de eventos inline). Você também pode ver um padrão como este:

```html
<button onclick="bgChange()">Press me</button>
```

```javascript
function bgChange() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```

Para começar, não é uma boa ideia misturar o seu HTML e o seu JavaScript, pois é difícil analisar — manter seu JavaScript em um só lugar é melhor; se estiver em um arquivo separado, você poderá aplicá-lo a vários documentos HTML.

> **Obs**: Separar sua lógica de programação do seu conteúdo também torna seu site mais amigável aos mecanismos de pesquisa.

Mesmo em um único arquivo, os manipuladores de eventos in-line não são uma boa ideia. Um botão está OK, mas e se você tivesse 100 botões? Você teria que adicionar 100 atributos ao arquivo; isso rapidamente se tornaria um pesadelo de manutenção. Com JavaScript, você poderia facilmente adicionar uma função de manipulador de eventos a todos os botões da página, não importando quantos fossem, usando algo assim:

```javascript
var buttons = document.querySelectorAll('button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = bgChange;
}
```

### addEventListener()

O mais novo tipo de mecanismo de evento é definido na Especificação de Eventos Nível 2 do Document Object Model (DOM), que fornece aos navegadores uma nova função — addEventListener(). Isso funciona de maneira semelhante às propriedades do manipulador de eventos, mas a sintaxe é obviamente diferente:

```javascript
var btn = document.querySelector('button');

function bgChange() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', bgChange);
```

Além disso, por exemplo, isso permite que você tenha o mesmo botão executando ações diferentes em circunstâncias diferentes — tudo o que você precisa fazer é adicionar ou remover (usando o removeEventListener()) eventos conforme apropriado.

Em segundo lugar, você também pode registrar vários manipuladores para o mesmo ouvinte. Os dois manipuladores a seguir não seriam aplicados:

```javascript
myElement.onclick = functionA;
myElement.onclick = functionB;
```

Como a segunda linha sobrescreveria o valor de onclick definido pelo primeiro. Isso funcionaria, no entanto:

```javascript
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);
```

Ambas as funções serão executadas quando o elemento for clicado.

## Outros conceitos de evento

Nesta seção, abordaremos brevemente alguns conceitos avançados que são relevantes para os eventos. Não é importante entendê-las totalmente neste momento, mas pode servir para explicar alguns padrões de código que você provavelmente encontrará ao longo do tempo.

### Objetos de evento

Às vezes, dentro de uma função de manipulador de eventos, você pode ver um parâmetro especificado com um nome como `event`, `evt`, ou simplesmente `e`. Isso é chamado de *event object*, e é passado automaticamente para os manipuladores de eventos para fornecer recursos e informações extras. Por exemplo:

```javascript
function bgChange(e) {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

btn.addEventListener('click', bgChange);
```

> Nota: Você pode usar qualquer nome que desejar para o objeto de evento — você só precisa escolher um nome que possa ser usado para referenciá-lo dentro da função de manipulador de eventos. `e/evt/event` são mais comumente usados pelos desenvolvedores porque são curtos e fáceis de lembrar. É sempre bom manter um padrão.

`e.target` é incrivelmente útil quando você deseja definir o mesmo manipulador de eventos em vários elementos e fazer algo com todos eles quando ocorre um evento neles. Você pode, por exemplo, ter um conjunto de 16 blocos que desaparecem quando são clicados. É útil poder sempre apenas definir a coisa para desaparecer como e.target

### Evitando o comportamento padrão

Às vezes, você se deparará com uma situação em que deseja interromper um evento fazendo o que ele faz por padrão. O exemplo mais comum é o de um formulário da Web, por exemplo, um formulário de registro customizado. Quando você preenche os detalhes e pressiona o botão Enviar, o comportamento natural é que os dados sejam enviados para uma página específica no servidor para processamento, e o navegador seja redirecionado para uma página de "mensagem de sucesso" de algum tipo (ou a mesma página, se outra não for especificada), gerando aquele refresh que fará que a perda do ***state*** se tiver manipulando algum.

Exemplo, um formulário HTML simples que requer que você digite seu primeiro e último nome:

```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text">
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" type="text">
  </div>
  <div>
     <input id="submit" type="submit">
  </div>
</form>
<p></p>
```

Agora no JavaScript — aqui há uma verificação muito simples dentro de um disparador de evento `onsubmit` que testa se os campos de texto estão vazios. Se estiverem, chamamos a função `preventDefault()` no objeto de evento — que interrompe o envio do formulário:

```javascript
var form = document.querySelector('form');
var fname = document.getElementById('fname');
var lname = document.getElementById('lname');
var submit = document.getElementById('submit');
var para = document.querySelector('p');

form.onsubmit = function(e) {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
}
```

### Corrigindo o problema com stopPropagation()

O assunto a ser abordado aqui é algo que você não encontrará com frequência, mas pode ser uma dor real se você não entender. *Borbulhamento* e *Captura* de eventos são dois mecanismos que descrevem o que acontece quando dois manipuladores do mesmo tipo de evento são ativados em uma página.

```javascript
// Este é uma div que serve de container do vídeo e responsável por mostrar/ocultar ao clicar em um botão
videoBox.onclick = function() { 
  videoBox.setAttribute('class', 'hidden');
};

// este é a tag video em si
video.onclick = function() {
  video.play();
};
```

Este é um comportamento irritante pois os dois eventos serão sempre disparados ao mesmo tempo, mas existe uma maneira de corrigir isso. O objeto de evento padrão tem uma função disponível chamada `stopPropagation()`, que quando invocada no objeto de evento de um manipulador, faz com que o manipulador seja executado, mas o evento anteior não borbulha mais acima na cadeia, portanto, mais nenhum manipulador rodará.

Podemos, portanto, consertar nosso problema atual alterando a segunda função do manipulador no bloco de códigos anterior para isto:

```javascript
video.onclick = function(e) {
  e.stopPropagation();
  video.play();
};
```

## Docs

* <https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Building_blocks/Events>
* <https://developer.mozilla.org/pt-BR/docs/Web/Events>
* <https://github.com/braziljs/eloquente-javascript/blob/master/chapters/14-manipulando-eventos.md>
* <https://desenvolvimentoparaweb.com/javascript/eventos-javascript/>

## Desafio

Crie um formulario de newsletter, onde valide o email se é um email válido e que ao enviar, faça um feedback ao usuário informando que ele foi cadastrado com sucesso.
