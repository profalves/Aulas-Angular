# Estilização de componentes

## 1. Aplicando classes de estilo

### ngClass

Sintaxes para aplicação do ngClass:

`<some-element [ngClass]="'first second'">...</some-element>`

`<some-element [ngClass]="['first', 'second']">...</some-element>`

`<some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>`

`<some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>`

`<some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>`

Segue alguns exemplos:

```html
<h3>Aplicando estilização com ngClass</h3>

<p [ngClass]="'bg-color'">Aplicando background-color e color com ngClass</p>

<p [ngClass]="['first-class', 'second-class']">Aplicando mais de um estilo com ngClass</p>

<p [ngClass]="{'first-class second-class': true}">Aplicando mais de um estilo com ngClass baseado em um booleano</p>

<p [ngClass]="{'first-class': true, 'second-class': false}">Aplicando mais de um estilo com ngClass baseado em um booleano</p>
```

### [class] | class

Sintaxes para aplicação do class:

`[class]="classExpression"`

`[class.sale]="statement"`

Segue alguns exemplos:

```html
<h3>Aplicando estilização com class</h3>

<p class="bg-color">Aplicando background-color e color com class</p>

<p [class.bg-color]="true">Aplicando background-color e color com class</p>
```

## 2. Aplicando estilos diretamente no HTML

### ngStyle

Sintaxes para aplicação do ngStyle:

`<some-element [ngStyle]="{'font-style': styleExp}">...</some-element>`

`<some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>`

`<some-element [ngStyle]="objExp">...</some-element>`

Segue alguns exemplos:

```html
<h3>Aplicando estilização com ngStyle</h3>
<p [ngStyle]="{'color': 'red'}">
  Alterando a cor do texto com ngStyle
</p>

<p [ngStyle]="expression">
  Alterando a cor do texto com ngStyle através de objeto
</p>

<p [ngStyle]="{'font-size.px': 20}">
  Alterando a fonte do texto
</p>
```

### [style] | style

Sintaxes para aplicação do style:

`<nav [style]="expression"></nav>`

`<nav [style.background-color]="expression"></nav>`

`<nav [style.backgroundColor]="expression"></nav>`

Segue alguns exemplos:

```html
<h3>Aplicando estilização com style</h3>

<p style="color: green">Aplicando cor com style</p>

<p [style.background-color]="'yellow'">Aplicando background-color com style</p>

<p [style.backgroundColor]="'yellow'">Aplicando background-color com style</p>

```
