# Transformação de dados com pipe

## 1. Pipe

O pipe operator trabalha em conjunto com o template html para proporcionar pequenas, mas importantes,
transformações de dados na aplicação, como, por exemplo: exibir a data num formato coerente,
especificar informação monetária, aplicar regras para números decimais e por aí vai.

Segue abaixo alguns operadores que podemos utilizar com o pipe:

- DatePipe: Formata uma data conforme a localização
- UpperCasePipe: Aplica caixa alta a um texto
- LowerCasePipe: Aplica caixa baixa a um texto
- CurrencyPipe: Transforma um número em um valor monetário string, conforme a localização
- DecimalPipe: Transforma um inteiro numa string com ponto flutuante, conforme a localização
- PercentPipe: Transforma um número em valor percentual, conforme a localização

### DatePipe

```html
<h3>Dates</h3>

<!--
  'M/d/yy, h:mm a',
  'MMM d, y, h:mm:ss a',
  'MMMM d, y, h:mm:ss a z',
  'EEEE, MMMM d, y, h:mm:ss a zzzz',
  'M/d/yy',
  'MMM d, y',
  'MMMM d, y',
  'EEEE, MMMM d, y',
  'h:mm a',
  'h:mm:ss a',
  'h:mm:ss a z',
  'h:mm:ss a zzzz'
 -->

<p>{{ date | date: 'M/d/yy, h:mm a' }}</p>
```

**Mais formatos**: <https://angular.io/api/common/DatePipe>

### CurrencyPipe

```html
<!--output 'US$ 1,90'-->
<p>A: {{1.90 | currency}}</p>

<!--output ' R$ 1,90'-->
<p>A: {{1.90 | currency:'BRL'}}</p>

<!--output ' BRL 1,90'-->
<p>A: {{1.90 | currency:'BRL':'code'}}</p>

<!--output 'R$ 0.002,19'-->
<p>B: {{2.19 | currency:'BRL':'symbol':'4.2-2'}}</p>

<!--output 'R$ 0.002,19'-->
<p>B: {{2.19 | currency:'BRL':'symbol-narrow':'4.2-2'}}</p>

<!--output 'R$ 0.001,35'-->
<p>B: {{1.3495 | currency:'BRL':'symbol':'4.2-2':'pt-BR'}}</p>
```

### DecimalPipe

O decimal pipe consegue transformar números inteiros em pontos flutuantes, ou apresentar
um flutuante de uma forma diferente:

```html
<h3>Decimal</h3>

<!--will output '4'-->
<p>{{3.6 | number: '1.0-0'}}</p>

<!--will output '-4'-->
<p>{{-3.6 | number:'1.0-0'}}</p>

<!-- will output 03,0 -->
<p>{{3 | number: '2.1-1'}}</p>

<!-- will output 3.46 -->
<p>{{3.4552322 | number: '1.1-2'}}</p>
```

- o primeiro número: refere-se a quantidade de números antes da virgula/ponto
- o segundo número: refere-se a quantidade mínima de números após a virgula/ponto
- o terceiro número: refere-se a quantidaed máxima de números após a virgula/ponto

> _**Uma observação importante**: os números são arredondados de acordo com seu valor decimal_

## Uppercase

```html
<h3>Uppercase</h3>

<p>{{ 'texto transformado em caixa alta' | uppercase }}</p>
```

## Lowercase

```html
<h3>Lowercase</h3>

<p>{{ 'TEXTO TRANSFORMADO EM CAIXA BAIXA' | lowercase }}</p>
```

## PercentPipe

```html
<h3>Percent</h3>

<!--output '80%'-->
<p>A: {{0.80 | percent}}</p>

<!--output '0,134.950%'-->
<p>B: {{1.3495 | percent:'4.3-5'}}</p>

<!--output '0 134,950 %'-->
<p>B: {{1.3495 | percent:'4.3-5':'pt'}}</p>
```

## 2. Encadear pipes

Ainda é possível encadear o resultado dos pipes:

```html
<h3>Encadear pipes</h3>

<p>{{ date | date: 'M/d/yy, h:mm a' | lowercase }}</p>
```

## 3. Pipes customizados

O angular permite a criação de novos pipes customizados para atender outros propósitos no
desenvolvimento da sua aplicação.

Um novo pipe pode ser criado através do angular CLI:

`ng generate pipe <pipe-name>`

O pipe será declarado no módulo onde foi criado e um arquivo de classe será criado para atender
a criação da estrutura.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square'
})
export class SquarePipe implements PipeTransform {

  transform(value: number): number {
    return value * 2;
  }
}

```

Essa classe possui o decorator **@Pipe** responsável por gerir, por exemplo, o nome utilizado
para acessar o pipe. E dentro do pipe teremos o metodo "transform" que realizará a ação
que será criada pelo programador, no exemplo acima o nosso pipe recebe um valor e realiza um
cálculo de quadrado.

O nosso pipe pode ser igualmente usado como os anteriores da seguinte maneira:

```html
<h3>Pipes customizados</h3>

<p>{{ 3 | square }}</p>
```

---

## Docs

- <https://angular.io/api/common/CurrencyPipe>
