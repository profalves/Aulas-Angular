# Typescript com Web Components

## O que é TypeScript?

**TypeScript** é uma linguagem criada pela Microsoft que adiciona tipagem estática ao JavaScript que por padrão é uma linguagem que possui tipagem dinâmica, ou seja, as variáveis e funções podem assumir tipos distintos durante o tempo de execução.

Vale lembrar o código TypeScript é utilizando somente em ambiente de desenvolvimento e é totalmente convertido para JavaScript no processo de build de produção, ou seja, o navegador ou o Node lerão somente código JS no fim das contas.

## Vantagens do TypeScript

- Descobrir erros durante o desenvolvimento;
- Recursos adicionais, tais como de incrementar a inteligência (IntelliSense) à IDE que estamos utilizando;
- Transpilação do código para que o mesmo seja lido por todas versões de browsers.

## Tipos Básicos

Para tipar variáveis adicionamos o `:tipo` após sua declaração.

```ts
let text:string = 'texto';
```

### Boolean

O tipo mais básico de dados são os valores **verdadeiro/falso**, que JavaScript e TypeScript chamam de valor booleano (`boolean`).

```ts
let isMobile: boolean = false
```

### Number

Assume qualquer número, como inteiro ou ponto flutuante.

```ts
const age: number = 20
```

### String

Como em outrass linguagens, usamos o tipo `string` para nos referir a textos. Assim como o JavaScript, o TypeScript também usa aspas duplas (") ou aspas simples (') para envolver os dados da string.

```ts
const text: string = "Hello World!"
```

### Array

O TypeScript, como o JavaScript, permite trabalhar com matrizes de valores. Os tipos de matriz podem ser gravados de duas maneiras. Na primeira, você usa o tipo dos elementos seguido por `[]` para denotar uma matriz desse tipo de elemento:

```ts
const list: number[] = [1, 2, 3]
```

A segunda maneira usa um tipo genérico de matriz, `Array<elemType>`:

```ts
const list: Array<number> = [1, 2, 3];
```

### Tuple (Tupla)

Os tipos de tupla permitem expressar uma matriz com um número fixo de elementos cujos tipos são conhecidos, mas não precisam ser os mesmos. Por exemplo, você pode representar um valor como um par de uma `string` e um `number`:

```ts
// Declare o tipo da tupla
let x: [string, number]
// Inicializa
x = ["hello", 10]; // OK
// Inicializa incorretamente
x = [10, "hello"]; // Erro
```

### Enum

Uma adição útil ao conjunto padrão de tipos de dados do JavaScript é a enumeração. Como em idiomas como C#, uma enumeração é uma maneira de atribuir nomes mais amigáveis a conjuntos de valores numéricos.

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```

Por padrão, as enumerações começam a numerar seus membros a partir de `0`. Você pode alterar isso definindo manualmente o valor de um de seus membros. Por exemplo, podemos iniciar o exemplo anterior em `1` vez de `0`:

```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

Ou, mesmo definir manualmente todos os valores na enumeração:

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
```

### Any

Podemos precisar descrever o tipo de variáveis ​​que não sabemos quando estamos escrevendo um aplicativo. Esses valores podem vir de conteúdo dinâmico, por exemplo, do usuário ou de uma biblioteca de terceiros. Nesses casos, queremos desativar a verificação de tipo e deixar que os valores passem pelas verificações em tempo de compilação. Para fazer isso, rotulamos estes com o tipo `any`.

```ts
let notSure: any = 2 // OK
notSure = "Hello World!" // OK
notSure = true // OK
notSure = [] // OK
```

### Void

O `void` é usado para determinar que um método não retorna nenhum valor:

```ts
function warnMessage(message: string): void {
    alert(message)
}
```

### Null e Undefined

No TypeScript, tanto `null` quanto `undefined` têm seus próprios tipos nomeados como `null` e `undefined` respectivamente. Muito parecido com `void`, eles não são extremamente úteis por conta própria:

```ts
let u: undefined = undefined
let n: null = null
```

Nos casos em que você deseja passar uma `string` ou `null` ou `undefined`, você pode usar o tipo de união `string | null | undefined`.

```ts
let name: string | null | undefined = undefined
name = "Jonh Due" // OK
```

## Interface e Classes

### Interfaces

Uma interface é, em essência, um tipo literal de objeto nomeada, ou seja, define a estrutura de um objeto.
Exemplo:

```ts
interface IPerson {
  name: string
  age: number | string
}
```

Com esta interface podemos falar que um objeto do tipo `IPerson` pode ser de duas maneiras:

```ts
const person: IPerson = {
  name: 'John',
  age: 20,
}

const person2: IPerson = {
  name: 'Joe',
  age: '21',
}
```

Podemos extender interfaces/classes para reaproveitar campos já exitentes, exemplo:

```ts
interface IStudent extends IPerson {
  school: string
}

const student: IStudent = {
  name: 'John',
  age: 20,
  school: 'Fatec',
}
```

Podemos também definir itens não obrigatórios com `?`, exemplo:

```ts
interface IPerson {
  name: string
  age: number
  city?: string
}

const person: IPerson = {
  name: 'John',
  age: 20,
}

const person2: IPerson = {
  name: 'Joe',
  age: 21,
  city: 'São Paulo',
}
```

### Classes

Classes em JavaScript foram introduzidas no **ECMAScript 2015** e são simplificações da linguagem para as heranças baseadas nos protótipos. A sintaxe para classes não introduz um novo modelo de herança de orientação a objetos em JavaScript. Classes em JavaScript provêm uma maneira mais simples e clara de criar objetos e lidar com herança.

O sistema de classes no TypeScript usa um modelo de herança única que deve ser familiar a qualquer programador que tenha trabalhado com qualquer linguagem baseada em classes.

Exemplo:

```ts
class Person {
  public name: string
  public age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  public showMe() {
    console.log(`Hello, I am ${this.getName()}, and I am ${this.age} years old`)
  }

  private getName(): string {
    return this.name
  }
}

const person = new Person('John', 20)
person.showMe() // result => Hello, I am John and I am 20 years old
```

Classes em TypeScript pode também definir as propriedades como sendo `public`, `private`, `protected` e/ou `static`:

- **public:** Permite acessar a propriedade livremente.
- **private:** Quando uma propriedade é marcada como `private`, ela não pode ser acessada de fora da classe que o contém.
- **protected:** O modificador `protected` age como o `private`, com a exceção de que os membros declarados como `protected` também podem ser acessados ​​nas classes derivadas.  
- **static:** São visíveis na própria classe e não nas instâncias.

## Web Components com Typescript

Como o DOM (*que o navegador realmente renderiza*) é feio e horrível de usar, e muitos exemplos de programação JavaScript tentam evitar usá-lo completamente! Uma saida é que você use **“playgrounds de codificação”**, onde eles configuraram uma interface da Web para exibir a saída do seu código, tipo um CodePen ou JSFiddle da vida. A alternativa é `console.log()`, com declarações que nem mesmo são exibidas dentro de sua página HTML, mas fora dela em um painel de debug.

Se, no entanto, começarmos a jornada de aprendizado de web components com Typescript já configurados, poderíamos ir diretamente a codificação do Typescript para ver sua saída real no navegador. Se estivermos desenvolvendo qualquer tipo de aplicativo com uma IU da Web, podemos estruturar o comportamento e a aparência de nosso componente com o Typescript.

![WCTS](https://miro.medium.com/max/720/1*7zDhPQr8vP_DhAaGuENcOg.webp)

---

## Docs

- <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes>
- <https://www.typescriptlang.org/docs/handbook/classes.html>
- <https://www.typescriptlang.org/docs/handbook/interfaces.html>
- <https://lit.dev/docs/>
- <https://lit.dev/tutorials/intro-to-lit/>
- <https://levelup.gitconnected.com/learning-typescript-with-web-components-lit-4f38fae47e27>
- <https://gist.github.com/aelbore/d80c98bde558987c045e4798b570afdf>
- <https://medium.com/@mariusbongarts/build-your-own-blog-portfolio-with-web-components-typescript-adfbcd917d96>
- <https://www.thisdot.co/blog/web-components-integration-using-litelement-and-typescript>
- <https://gilfink.medium.com/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1>

---

## Desafio

Agora faça o desafio da aula anterior que você escolheu usando Web Components com Typescript. Fique a vontade para pesquisar outras bibliotecas ou maneiras de desenvolver. O importante é se esforçar ao máximo para aplicar todos os conceito aprendidos atá agora.
