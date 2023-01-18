# Rotas

## Introdução ao Routing no Angular

Uma rota está diretamente relacionada a URL, ou seja, também funciona como um localizador de um recurso. A diferença é que acrescenta a possibilidade de utilizar parâmetros de rota. Por exemplo: considere um site de notícias *noticias.com*, que permite acessar a notícia **"Governo paga salarios de servidores"**, cujo identificador é `7899`, está na categoria *"política"* e foi *publicada em 20/12/2017*, por meio do URL:

`https://noticias.to/noticias/politica/2017/12/20/governo-paga-salarios-de-servidores/7899`

Há informações na URL que pertencem à notícia e mudam de uma notíca para outra:

- categoria: politica
- ano: 2017
- mês: 12
- dia: 20
- titulo: governo-paga-salarios-de-servidores
- identificador: 7899

Analisando URLs de outras notícias alguém poderia chegar à conclusão de que há um padrão:

`/noticias/categoria/ano/mes/dia/titulo/identificador`

Independentemente de possuir parâmetros de rota, uma rota é um padrão. Cada uma dessas informações (categoria, ano, mes, dia, titulo, identificador), que muda de uma notícia para outra, pode ser representada como um parâmetro de rota.

A implementação desse conceito pode variar entre frameworks, mas provavelmente as mesmas funcionalidades estão disponíveis:

- definir uma rota (e, opcionalmente, usar parâmetros de rota)
- identificar valores dos parâmetros de rota

Além disso, como URLs são localizadores de recursos, rotas também servem para esse propósito, ou seja, uma rota está associada algum recurso e é uma forma de acessá-lo.

## Rotas no Angular

Controlar a visibilidade de componentes é uma tarefa simples. Isso pode ser consideguido, por exemplo, utilizando as diretivas ngIf e hidden. Entretanto, a complexidade aumenta na proporção da quantidade de componentes ou da complexidade das interações com o usuário. Por isso o Angular implementa o conceito de rotas de uma maneira bastante útil.

Para usar rotas é possível definí-las das seguintes formas:

- no root module
- no feature module
- no módulo de rotas

```ts
import {RouterModule, Routes} from '@angular/router';

... (imports dos componentes)

const appRoutes: Routes = [
  {path: 'disciplinas', component: ListaDeDisciplinasComponent},
  {path: 'disciplinas/:id', component: EditorDeDisciplinaComponent},
  {path: '', component: HomeComponent,},
  {path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

A primeira coisa a destacar é a variável `appRoutes`, do tipo `Routes`. O pacote @angular/router fornece o módulo RouterModule e a classe Routes. Na prática a variável appRoutes recebe um array no qual cada item é um objeto com dois atributos:

- `path`: representa a rota para o componente; e
- `component`: representa o componente associado à rota.

Por fim, as rotas são inseridas no módulo por meio de um elemento do array imports resultante de uma chamada para o método `RouterModule.forRoot()`, passando como parâmetro o array de rotas, o a variável appRoutes.

Quando o software é executado o Angular busca uma combinação entre a URL fornecida no browser e as rotas definidas no módulo. Isso é feito de cima para baixo, procurando no array appRoutes. Ao encontrar uma rota correspondente, o Angular cria uma instância do componente e a apresenta. 

![Processo de interpretação da URL em busca em uma rota e do seu componente](https://jacksongomesbr.gitbooks.io/desenvolvimento-web-front-end-com-angular/content/assets/ilustracao-procurando-rota.png)

O modo de comparação entre a URL no browser e o caminho da rota é muito interessante. A forma de comparação considera se o caminho da rota combina com o final da URL do browser. A figura ilustra a busca por uma rota correspondente à URL `http://localhost:4200` e interrompe o processo quando encontra a primeira correspondência. Nesse mesmo sentido se a URL no browser for `http://localhost:4200/disciplinas` o Angular encontra a rota `disciplinas`. E assim por diante.

Voltando à figura a URL indica o que é conhecido como raiz do site. É opcional que a URL termine com `/`.

Outra característica importante desse processo é a ordem das rotas. Como disse, o Angular procura pela rota que combina com o final da URL, assim, se a rota padrão estiver no início da lista das rotas, então o Angular sempre a encontrará. Da mesma forma, se não encontrar uma rota correspondente o Angular vai até a rota **.

## Shell component

Quando o Angular identifica a rota e o componente associado a ela é necessário apresentá-lo (lembre-se que o componente é, provavelmente, visual). Assim, ao utilizar rotas o Angular requer que o módulo (nesse caso o AppModule) utilize um componente como shell, o que significa que o Template do componente precisa indicar onde outros componentes serão apresentados. Para isso o Angular utiliza duas informações:

- qual o componente o módulo declara como bootstrap (o AppComponent é o shell component)
- onde está o elemento router-outlet no Template do AppComponent

![Utilização do shell component e combinação do seu Template com o Template do componente associado à rota](https://jacksongomesbr.gitbooks.io/desenvolvimento-web-front-end-com-angular/content/assets/ilustracao-rotas-router-outlet-combinacao.png)

Como mostra a figura, o Angular combina o Template do AppComponent com o Template do HomeComponent para gerar uma saída HTML [unificada] para o browser. Importante perceber que tudo o que está antes e depois do elemento router-outlet é mantido na saída. Por isso o Angular usa, em conjunto, a descoberta da rota e do componente associado e o conteúdo do shell component.

## Parâmetros de rota

A rota `disciplinas/:id`, possui um parâmetro de rota chamado id. Obter o valor desse identificador da disciplina na URL é uma tarefa importante desse processo de lidar com rotas no Angular. Para fazer isso, o componente possui o atributo `route`, uma instância de `ActivatedRoute`, como mostra o trecho de código a seguir.

```ts
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
...
export class EditorDeDisciplinaComponent implements OnInit {
  ...
  constructor(private route: ActivatedRoute,
              private router: Router,
              private disciplinasService: DisciplinasService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == 'cadastrar') {
      this.disciplina = new Disciplina(null, null, null);
      this.status = null;
    } else {
      this.disciplinasService.encontrar(parseInt(id))
        .subscribe(...);
    }
  }
  ...
}
```

Como o componente implementa a interface `OnInit`, o código do método `ngOnInit()` é responsável por:

- *identificar o valor do parâmetro de rota*: isso é feito por meio de uma chamada para o método `route.snapshot.paramMap.get()`. O parâmetro para o método `get()` é o nome do parâmetro de rota desejado
- *tratar o valor do parâmetro de rota*: o valor retornado por `get()` é do tipo `string`.

## Navegação

A navegação é o recurso que permite mudar de uma rota para outra. Isso pode ser feito por meio de uma ação do usuário (por exemplo, quando ele clica em um link) ou via código.

A navegação por meio de link utiliza o elemento a e o atributo routerLink, como mostra o Template do `HomeComponent`:

```html
<h2>Gerenciador de dados escolares</h2>
<p>
    <a routerLink="/disciplinas" class="btn btn-primary">
        Gerenciar disciplinas
    </a>
</p>
```

O atributo `routerLink` tem o valor `/disciplinas`, o que significa que quando o usuário clicar no link ocorrerá uma navegação para a rota `disciplinas`. É importante destacar que, embora a definição da rota não inclua uma barra no início do caminho, o mesmo não acontece aqui, com o link. É como determinar que o link sempre considera a raiz do site (usando um caminho absoluto).

Na lista de disciplinas há um botão que permite editar uma disciplina. No clique do botão há uma chamada para a função `editar()`, cujo trecho de código é apresentado a seguir.

```ts
...
export class ListaDeDisciplinasComponent implements OnInit {
  ...
  constructor(private disciplinasService: DisciplinasService, 
    private router: Router) {
  }
  editar(disciplina) {
    this.router.navigate(['disciplinas', disciplina.id]);
  }
}
```

## Docs

- <https://angular.io/guide/routing-overview>
