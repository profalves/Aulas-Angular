# Angular conceitos básicos

Aprendizado de estruturas básicas do angular

- [Angular conceitos básicos](#angular-conceitos-básicos)
  - [1. Importação de módulos e uso de componentes](#1-importação-de-módulos-e-uso-de-componentes)
  - [2. Diretivas](#2-diretivas)
    - [Diretivaa Condicionais](#diretivaa-condicionais)
      - [ngIf](#ngif)
      - [ngSwitch](#ngswitch)
    - [Diretiva de Laços](#diretiva-de-laços)
      - [ngFor](#ngfor)
  - [3. Interpolação](#3-interpolação)
  - [4. Decorador de classe](#4-decorador-de-classe)
  - [4. Dependency injection (DI)](#4-dependency-injection-di)
  - [Docs](#docs)

## 1. Importação de módulos e uso de componentes

No angular todo componente pode ser utilizado como um elemento html, além disso, os módulos possuem
o papel de agregar conjuntos de componentes e podemos importar esses módulos para utlizar esses
componentes onde desejarmos.

Para que os componentes deu um módulo possam ser utlizados, eles precisam ser,
exportados como no exemplo abaixo:

```typescript
// dentro do dashboard modulo
@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent // módulo dashboard sendo exportado
  ],
  imports: [
    CommonModule
  ]
})
```

E para utilizarmos no módulo desejado, podemos importar da seguinte forma:

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule // importando o dashboard module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

No nosso HTML podemos utilizar o componente como um elemento html baseado em seu seletor:

```html
<!-- Importando o componente app-dashboard dentro do html do componente app -->
<app-dashboard></app-dashboard>
```

## 2. Diretivas

As diretivas são como marcadores no elemento DOM que comunicam ao Angular para incluir um comportamento específico.

Existem três tipo de diretivas no Angular, que são: *Diretivas de atributos*, *Diretivas estruturais* e *Componentes*.

- **Diretivas de atributos**: Alteram a aparência ou o comportamento de um elemento, componente ou outra diretiva, como por exemplo, `NgClass` e `NgStyle`.

- **Diretivas estruturais**: Modificam o layout adicionando ou removendo elementos do DOM, como por exemplo, `NgIf` e `NgFor`.

- **Componentes**: Na prática, um Componente é uma Diretiva com um Template. Assim, um Componente é um tipo de Diretiva, que nem sempre está relacionada a algo visual.

### Diretivaa Condicionais

#### ngIf

A diretiva ngIf é fundamental no desenvolvimento com angular, pois permite criar estruturas
condicionais no template html.

Podemos utiliza-lo da forma abaixo:

```html
<span *ngIf="award >= 5">
  Esse texto será exibido apenas se o Brasil possuir 
  5 títulos ou mais no futebol mundial
</span>
```

Podemos carregar outra estrutura caso essa condição não seja atendida, utilizando o nosso bom
e velho "else", para isso precisamos utilizar o ng-template, atribuindo uma variável no mesmo e a
utilizando na nossa chamada do else:

```html
<span *ngIf="award >= 5; else brasilHasLessThanFive">
  Esse texto será exibido apenas se o Brasil possuir 
  5 títulos no futebol mundial
</span>
<ng-template #brasilHasLessThanFive>
  <span>
    Esse texto será exibido caso o Brasil possua menos que 5 títulos no futebol mundial
  </span>
</ng-template>
```

#### ngSwitch

O ngSwitch funciona como o switch case do Javascript, e permite avaliar um valor passado e
renderizar o conteúdo conforme o seu resultado.

```html
<div [ngSwitch]="color">
  <h3>Qual a cor da camisa da seleção brasileira?</h3>
  <span *ngSwitchCase="'yellow'">Amarela</span>
  <span *ngSwitchCase="'red'">Vermelha</span>
</div>
```

### Diretiva de Laços

#### ngFor

Loops/laços são essenciais em qualquer linguagem e não diferiria com o angular,
podemos realizar loops através dos componentes, para trabalhar principalmente com listas
de informações:

```html
<div>
  <h3>Em quais anos o Brasil ganhou a copa do mundo?</h3>
  <div *ngFor="let year of years">
    <span>{{year}}</span>
  </div>
</div>
```

Além disso, podemos também capturar o index da coleção iterada:

```html
<div>
  <h3>Em quais anos o Brasil ganhou a copa do mundo? (com index)</h3>
  <div *ngFor="let year of years; let i = index">
    <span>index: {{i}} -- </span>
    <span>ano: {{year}}</span>
  </div>
</div>
```

## 3. Interpolação

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

## 4. Decorador de classe

Um decorator que aparece logo antes de uma definição de classe, que declara que a classe é do tipo fornecido e oferece metadados adequados ao tipo. Os seguintes decoradores podem declarar tipos de classe Angular:

`@Component()`

`@Directive()`

`@Pipe()`

`@Injectable()`

`@NgModule()`

## 4. Dependency injection (DI)

O **DI** é conectado à estrutura Angular e usado em todos os lugares para fornecer aos componentes os serviços (ou outras coisas) que eles precisam.

Componentes consomem serviços. Isto é, você pode injetar um serviço em um componente, dando acesso ao componente para essa classe de serviço.

Para realizar isso, usamos o `providedIn`, que é uma propriedade do decorator `@Injectable`.

```ts
@Injetable({
 providedIn: SomeModule
})
```

---

## Docs

- <https://blog.geekhunter.com.br/um-overview-sobre-o-framework-angular/>