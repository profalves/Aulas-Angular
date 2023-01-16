# Data Bindings

É a forma de exibir e trabalhar com dados no HTML da sua aplicação Angular

## Interpolação

A interpolação é usada para exibir uma propriedade do componente no HTML.

Sua sintaxe são chaves duplas e podemos exibir qualquer tipo de dados, por exemplo, números, datas, arrays e etc…

```ts
export class AppComponent {
  propriedade = "Hello!!!"
}
```

Após isso, podemos também exibir conteúdo vindo do arquivo `.ts` diretamente no HTML, através da interpolação `{{ }}`:

```html
<h1>{{propriedade}}</h1>
```

## Event Binding

O binding de eventos permite ouvir e responder às ações do usuário, como pressionamentos de teclas, movimentos do mouse, cliques e toques.

```html
<button (click)="onSave()">Save</button>
```

## Propety Binding

Ajuda a definir valores para propriedades de elementos ou diretivas HTML. Use essa associação de propriedade para fazer coisas como recursos de botão de alternância, definir caminhos programaticamente e compartilhar valores entre componentes.

```html
<img alt="logo" [src]="logoImageUrl">
```

## Two-way binding

### ngModel

Cria uma instância de `FormControl` de um modelo de domínio e a vincula a um elemento de **controle de formulário**.

```html
<input [(ngModel)]="name" required>

<p>Value: {{ name }}</p>
```

É uma ligação bidirecional que fornece aos componentes de seu aplicativo uma maneira de compartilhar dados. Use a ligação bidirecional para ouvir eventos e atualizar valores simultaneamente entre os componentes pai e filho.

```html
<input type="text" [(ngModel)]="userName"  ><br/>
<div>{{userName}}</div>
```

---

## Docs

- <https://angular.io/guide/interpolation>
- <https://angular.io/guide/property-binding>
- <https://angular.io/guide/event-binding>
- <https://angular.io/api/forms/NgModel#description>
- <https://angular.io/guide/two-way-binding>
- <https://www.tutorialsteacher.com/angular/two-way-data-binding#:~:text=Two%2Dway%20data%20binding%20refers,property%20in%20a%20component%20class.>
- <https://consolelog.com.br/validacao-formulario-ngmodel-angular/>
