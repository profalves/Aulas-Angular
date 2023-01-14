# Fundamentos do Angular

Angular é um framework Javascript de código aberto mantido pelo Google utilizado para construir aplicações SPAs *(Single Page Applications)* de alta perfomance.

Arquitetada no modelo MVC *(Model/ View/ Controller)*, possui seu core desenvolvido em Javascript e possui por default integração com Typescript.

É também um framework orientado a componentes assim como [***Vue***](https://vuejs.org/) e [***React***](https://pt-br.reactjs.org/), no qual estes componentes são responsáveis desde estruturas de layouts (componentes puros), como também componentes lógicos, onde há uma maior complexidade em sua integração: páginas, diretivas, rotas, etc.

## Porque utilizar Angular?

Apesar de estar sendo muito menos utilizado na comunidade do que em anos atrás, muito devido a ascensão do React, o Angular é uma excelente opção para quem tem o desejo de construir uma aplicação single-page robusta, sem a necessidade de configuração de bibliotecas terceiras para seu funcionamento.

Por se tratar de um framework e não uma biblioteca, que é o caso do React, o Angular tem suas vantagens por fornecer nativamente recursos tais como: rotas, formulários reativos, animações, two way data binding, controle de estado global através de serviços singleton (padrão de única instância de uma classe em um ciclo de vida), entre outros. Isto garante ao desenvolvedor um setup fácil e rápido, além de garantir segurança em relação a estas bibliotecas, devido a sua injeção nativa.

Sem contar sua documentação que é excelente e bem definida, sendo atualizada sempre durante suas releases.

## 1. Configuração

Para iniciar o desenvolvimento de SPA's com o angular, é necessário pelo menos três ferramentas:

- [NodeJS](https://nodejs.org/en/)
- **NPM** | [YARN](https://classic.yarnpkg.com/lang/en/docs/install/)
- [Angular CLI](https://angular.io/cli)

### Angular CLI

Ferramenta de linha de comando que permite a criação de novos SPA's, componentes, módulos, etc. Voltado ao angular, é extremamente importante pois facilita o desenvolvimento de aplicações angular.

A CLI Angular é uma ferramenta de interface da linha de comandos que você usa para inicializar, desenvolver e manter aplicativos Angular.

Nesse sentido, ela é a forma mais fácil, rápida e recomendada de se iniciar a sua aplicação em Angular, pois permite a criação de novos SPA's, componentes, módulos, etc. Voltado ao angular, é extremamente importante pois facilita o desenvolvimento de aplicações angular.

Para você ter noção, alguns exemplos de comandos abaixo deixam claro como o uso de Angular CLI facilita a vida do programador:

| Comando  |  Para que serve?  |
|----------|:------------------|
| `ng build` | Compila um aplicativo Angular em um diretório de saída. |
| `ng serve` | Cria um servidor local HTTP para testar seu aplicativo, reconstruindo as alterações do arquivo. |
| `ng generate` | Gera ou modifica arquivos com base em um esquema. |
| `ng test` | Executa testes de unidade em um determinado projeto. |
| `ng e2e` | Constrói e fornece um aplicativo Angular e, em seguida, executa testes de ponta a ponta. |

Você pode usar a ferramenta diretamente em um *shell* de comando ou indiretamente por meio de uma interface do usuário interativa, como o [**Angular Console**](https://blog.angular.io/angular-console-21d36c02ff76).

## 2. Criação do primeiro projeto

Para criar um projeto angular e começar a desenvolver aplicações, podemos utilizar o seguinte
comando através do angular CLI:

```bash
ng new <nome-da-aplicação>
```

Podemos aplicar algumas configurações básicas como adicionar rotas e definir se usaremos ou não
algum dos mais famosos pre-processadores CSS.

> *Estilos possíveis: css|scss|sass|less|styl*

```bash
ng new <nome-da-aplicacao> --routing --style="SCSS"
```

Para iniciar o projeto em um servidor local, utilizamos o comando:

```bash
ng serve
```

Após executar este comando o angular criará a pasta de seu projeto no diretório selecionado. Sua estrutura inicial será parecida com isto:

![Estrutura de pastas](https://miro.medium.com/max/640/1*_ljQM3O12_xfHalbaJcDJQ.webp)

Note que ao gerar o esquema de pastas, o Angular cria uma pasta chamada app. Esta por sua vez, é responsável por englobar o componente inicial do projeto:

- `app.component.css` — Responsável pela estilização do componente core.
- `app.component.html` — Responsável pela apresentação do componente core.
- `app.component.ts` — Classe responsável pelas regras lógicas do componente core.
- `app.component.spec.ts` — Responsável por executar testes unitários no componente core.

## 3. Módulos

Um módulo pode ser entendido como um bloco de código que define um domínio dentro da aplicação,
a exemplo: Em uma aplicação voltada a saúde, podemos ter, pacientes, médicos, convênios. E para cada
um deles podemos criar módulos para melhorar a organização do nosso código.

A arquitetura do Angular permite organizar a aplicação por módulos através dos `NgModules`, que fornecem um contexto para os componentes serem compilados.

Uma aplicação sempre tem ao menos um módulo raiz que habilita a inicialização e, normalmente, possui outros módulos de bibliotecas.

Os componentes deliberam as visualizações — que são conglomerados de elementos e funcionalidades de tela — que o Angular modifica de acordo com a lógica e os dados da aplicação.

Esses componentes usam serviços que fornecem funcionalidades específicas e que são indiretamente relacionadas a essas visualizações.

Os **provedores de serviços** podem ser injetados nos componentes como dependências, tornando seu código modular e reutilizável. Serviços e componentes são simples classes com decorators, que definem o tipo e fornecem metadados para informar o Angular como usá-los.

![grafico](https://blog.geekhunter.com.br/wp-content/uploads/2019/10/arquitetura-angular.jpg)

### NgModules

Tem como objetivo declarar e agrupar tudo que criamos no Angular. Existem duas estrutura principais, que são: `declarations` e o `providers`.

**Declarations** é onde declaramos os itens que iremos utilizar nesse módulo, como por exemplo componentes e diretivas, já nos **Providers** informamos os serviços.

```ts
@NgModule({
  declarations: [ AppComponent],
  providers: [ AuthClientService  ],
})
```

Assim como módulos JavaScript, o NgModules também pode importar funcionalidades de outros NgModules e permitir que suas próprias funcionalidades também sejam exportadas.

Um exemplo claro disso é que para usar o serviço de rotas no seu app basta importar o `RouterNgModule`.

```ts
@NgModule({
  declarations: [ AppComponent ],
  imports: [ AppRoutingModule ],
})
```

O `@NgModule` permite relizar algumas configurações
essenciais ao módulo:

- **Declarations**: Permite informar os componentes vinculados aquele módulo
- **Imports**: Permite a importação outros módulos
- **Exports**: Informa quais componentes são exportados para serem usados por outros módulos durante
  importação
- **Providers**: Permite declarar serviços a serem usados dentro do escopo do módulo
- **Bootstrap**: Está presente apenas no app-module e tem o papel de definir qual o componente que inicia
  a aplicação

```typescript
// modulo app
@NgModule({
  declarations: [AppComponent],
  imports: [],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
```

## 4. Componentes

A maior parte do desenvolvimento quando se utiliza o framework Angular é feito nos componentes. Um componente é uma classe em uma aplicação angular, que pode definir uma página da sua aplicação,
ou algum item menor como um componente de input personalizado, uma lista, botão, etc.

```bash
ng generate component <nome-do-componente>
```

Caso já exista uma página de mesmo nome do componente, podemos criar o componente dentro dessa pasta
usando a flag `--flat`.

> *a flag --flat pode ser utilizada também na criação de outras estruturas, caso já exista uma pasta.*

```bash
ng generate component <nome-do-componente> --flat
```

### Metadados do component

Os componentes possuem um decorator de classe chamado @Component, ele permite realizar
algumas configurações no módulo como:

- **selector**: Definir o nome do componente como elemento html
- **templateUrl**: permite conectar o component.ts com a pagina html
- **styleUrls**: Permite conectar o component.ts com a página de estilo
- **template**: Permite carregar html diretamente no component.ts

```typescript
// componente app
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ HeroService ]
})
```

---

## Docs

- <https://angular.io>
- <https://angular.io/cli>
- <https://www.devmedia.com.br/angular-cli-como-criar-e-executar-um-projeto-angular/38246>
- <https://blog.betrybe.com/framework-de-programacao/angular/>
- <https://blog.algaworks.com/o-que-e-angular/>
