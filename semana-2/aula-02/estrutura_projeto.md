# Estruturar uma aplicação Angular

Ao iniciarmos o desenvolvimento de uma aplicação web, uma das perguntas que vem em nossas cabeças é *"Como montar uma estrutura ou arquitetura de projeto que seja escalonavel e sustentável?"*.

Para uma aplicação pequena, a estrutura padrão gerada pelo Angula CLI é adequada. Ainda assim, quando seu projeto crescer, você notará a dificuldade em manter e dimensionar sua aplicação corretamente.

Sabemos que uma aplicação Angular é composto por diversos elementos como módulos, componentes, templates e serviços. Já sabendo qual o contexto do nosso projeto então vamos montar uma estrutura por camadas. 

![camadas](https://res.cloudinary.com/practicaldev/image/fetch/s--wzT730zQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/66wwb8pp7erk93ti2zlr.png)

## Como seria a estrutura de pastas do projeto pensando na escalabilidade?

![pastas](https://res.cloudinary.com/practicaldev/image/fetch/s--LnmNxDa6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1vjus8go2y8yfj4a61vl.png)

- **Core**: Arquivos essenciais para a aplicação;

- **Shared**: onde ficarão os Dumb Components, que são componentes que não fazem nada por conta própria;

- **Pages**: São as páginas do nosso projeto onde estarão disponível os Smart Components.

Vamos para nossa página inicial. Ele conterá um *header*, *footer* e a *relação de cursos*. Esses componentes serâo compartilhados pelo `SharedModule`. Todos provenientes dos respectivos módulos.

```ts
  @NgModule ({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      SharedModule,
      HomeRoutingModule,
    ],
  })
  export class HomeModule {}
```

`SharedModule` é onde compartilhamos nossa mini-biblioteca que consta os nossos componentes Header, List e Footer.

```ts
  @NgModule ({
    declarations: [
      FooterModule,
      HeaderModule,
      ListModule,
    ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
    ],
    exports: [ 
      FooterModule,
      HeaderModule,
      ListModule,
    ],
  })
  export class SharedModule {}
```

Como seria essa estrutura da `home.component.html`

```html
  <!-- Componente do Header -->
  <app-header> </app-header>

  <main class="container">

    <!-- Componente do List -->
    <app-list> </app-list>

  </main>

  <!-- Componente do Footer -->
  <app-footer> </app-footer>
```

## Outra proposta

```
|-- app
    |-- core
        |-- [+] components
        |-- [+] guards
        |-- [+] interceptors
        |-- [+] models
        |-- [+] layouts
        |-- [+] config
        |-- [+] translations
        |-- [+] overrides
        |-- variables.scss
        |-- theme.scss
        |-- core.module.ts
    |-- features
        |-- login
            |-- components
                |-- [+] login-form
                |-- login-components.module.ts
            |-- interfaces
                |-- login-data.interface.ts
            |-- login.component.ts
            |-- login.component.html
            |-- login.component.scss
            |-- login.component.spec.ts
            |-- login.module.ts
        |-- home
            |-- [+] components
            |-- [+] enums
            |-- [+] interfaces
            |-- home.component.ts
            |-- home.component.html
            |-- home.component.scss
            |-- home.compoment.spec.ts
            |-- home.module.ts
    |-- shared
        |-- [+] components
        |-- [+] validators
        |-- [+] pipes
        |-- [+] directives   
        |-- [+] services
        |-- [+] enums
        |-- shared.module.ts
|-- app.component.ts
|-- app.component.html
|-- app.component.scss
|-- app.component.spec.ts
|-- app-routing.module.ts
|-- app.module.ts
```

---

## Docs

- <https://www.brunobrito.net.br/estruturando-components-angular/>
- <https://belmirofss.medium.com/minha-nova-estrutura-de-pastas-para-angular-escal%C3%A1vel-limpa-e-f%C3%A1cil-93b6ffb203d9>
- <https://medium.com/nave-recife/entendendo-a-estrutura-de-um-projeto-angular-aa22833a7491>
