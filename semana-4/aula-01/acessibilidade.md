# Acessibilidade

## Introdução

A acessibilidade é uma parte essencial do desenvolvimento da Web, que garante que os usuários possam perceber, entender, navegar e interagir com os apps. Na verdade, um em cada quatro adultos dos EUA tem uma deficiência que afeta suas principais atividades de vida. No mundo todo, cerca de 15% da população mundial (mais de um bilhão de pessoas) tem algum tipo de deficiência. Por isso, cerca de 2 a 4% têm dificuldades significativas.

As condições mais comuns que afetam o uso da Web por uma pessoa incluem cegueira ou deficiências visuais, surdez ou deficiências auditivas, restrição de habilidades motoras, deficiências cognitivas e daltonismo. E essa é apenas uma lista parcial.

## O que é acessibilidade?

Em termos gerais, quando dizemos que um site é acessível, queremos dizer que o conteúdo do site está disponível e sua funcionalidade pode ser operada literalmente por qualquer pessoa . Como desenvolvedores, é fácil presumir que todos os usuários podem ver e usar um teclado, mouse ou tela sensível ao toque e podem interagir com o conteúdo da sua página da mesma forma que você. Isso pode levar a uma experiência que funciona bem para algumas pessoas, mas cria problemas que variam de simples aborrecimentos a impedimentos para outros.

Acessibilidade, então, refere-se à experiência de usuários que podem estar fora do alcance estreito do usuário *"típico"*, que pode acessar ou interagir com as coisas de maneira diferente do que você espera. Especificamente, diz respeito aos usuários que estão experimentando algum tipo de deficiência ou deficiência - e tenha em mente que essa experiência pode ser não física ou temporária.

À medida que aprender mais, você descobrirá que abordar questões de acessibilidade nesse sentido mais amplo e geral quase sempre melhora a experiência do usuário para todos. Vejamos um exemplo:

![problemas de accessibilidade](https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/hcBkdjssb6gqRgOyjpzm.jpg?auto=format&w=650)

Este formulário tem vários problemas de acessibilidade.

- O texto é de baixo contraste, o que dificulta a leitura para usuários com baixa visão.
- Ter rótulos à esquerda e campos à direita torna difícil para muitas pessoas associá-los e quase impossível para quem precisa ampliar para usar a página; imagine olhar para isso em um telefone e ter que dar uma olhada para descobrir o que combina com o quê.
- O campo "Lembrar detalhes?" o rótulo não está associado à caixa de seleção, então você deve tocar ou clicar apenas no pequeno quadrado em vez de apenas clicar no rótulo; além disso, alguém usando um leitor de tela teria problemas para descobrir a associação.

Agora vamos agitar nossa varinha de acessibilidade e ver o formulário com esses problemas corrigidos. Vamos tornar o texto mais escuro, modificar o design para que os rótulos fiquem próximos das coisas que estão rotulando e corrigir o rótulo a ser associado à caixa de seleção para que você possa alterná-lo clicando no rótulo também.

![acessibilidade corrigida](https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/degxEapMFe6T27SWUZOf.jpg?auto=format&w=650)

## Como implementar acessibilidade com alguns exemplos

**1:** Adicione atributos `aria` em seus componentes: Adicione atributos *"aria"* (como `aria-label` e `aria-describedby`) para fornecer informações adicionais para leitores de tela.

Exemplo:

```html
<button aria-label="Adicionar item">
  +
</button>
```

**2:** Utilize "skip to content" links: Adicione um link na parte superior da página que permita que os usuários pulam para o conteúdo principal com rapidez.
Exemplo:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
...
<main id="main-content">
  <!-- Main content here -->
</main>
```

**3:** Utilize as classes do Angular Material Design Accessibility: Use as classes do Angular Material Design Accessibility, como "mat-form-field", "mat-label" e "mat-icon", para garantir que seus componentes sejam acessíveis.

Exemplo:

```html
<mat-form-field class="example-full-width">
  <mat-label>Name</mat-label>
  <input matInput [(ngModel)]="name">
</mat-form-field>

<mat-icon aria-hidden="false" aria-label="Example delete icon">delete</mat-icon>
```

**4:** Adicione legendas e descrições a gráficos e tabelas: Adicione legendas e descrições claras a gráficos e tabelas para que sejam fáceis de entender para usuários com deficiência visual.

Exemplo:

```html
<figure>
  <img src="image.png" alt="A descriptive alt text">
  <figcaption>A caption describing the image</figcaption>
</figure>
```

**5:** Teste sua acessibilidade: Teste sua acessibilidade com ferramentas automatizadas, como o Lighthouse, e também manualmente, com leitor de tela e teclado.

Estes são alguns exemplos de como você pode adicionar acessibilidade a seu projeto Angular. É importante lembrar de sempre considerar as necessidades de acessibilidade ao desenvolver seu projeto para garantir que ele seja acessível a todos

---

## Docs

- <https://angular.io/guide/accessibility>
- <https://codelabs.developers.google.com/angular-a11y?hl=pt-br#0>
- <https://web.dev/accessibility/#what_is_accessibility>
- <https://m2.material.io/design/usability/accessibility.html>
- <https://inclusive-components.design/>
- <https://www.w3.org/WAI/people-use-web/>
- <https://medium.com/totvsdevelopers/automatizando-testes-de-acessibilidade-no-angular-a3e92b7ea4d7>
- <https://runebook.dev/pt/docs/angular/guide/accessibility>
- <https://www.youtube.com/watch?v=b9Vb5kvtJlM>
