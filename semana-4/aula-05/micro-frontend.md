# Microfrontends

Antes de realmente explicar o que é micro front-end, vamos entender alguns outros conceitos como:

- Monolitos
- Separação do front-end e back-end
- Conceito de microsserviços

## Monolitos

Quando dizemos que um sistema é um Monolito, estamos dizendo que a aplicação segue uma arquitetura onde toda aplicação esta em uma única estrutura. Uma única aplicação trata todas as funcionalidades necessárias para um domínio, por exemplo, Sistema de Gestão de Logistica, lidando com clientes, fornecedores, depósitos, calculos de rotas, gestão de entregas, entre outras.

### Problemas comuns em uma aplicação monolítica

Alguns problemas comuns de uma aplicação monolítica.

- Alta complexidade para corrigir bugs
- Dificuldades para implementar novas features
- Alto nível de interdependências no acoplamento de módulos
- Dificuldades na coordenação entre times
- Alto esforço para integração de novos desenvolvedores

## Microsserviços

Ainda neste contexto, surgiu o conceito de arquitetura de microsserviços. Quando falamos em microsserviços nos referindo a uma funcionalidade que pode ser dividida em partes menores.

![Microsserviços](https://res.cloudinary.com/practicaldev/image/fetch/s--k4HRU5d2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0i13msy43uxnlu0psswy.jpg)

Depois de entender esses conceitos podemos, finalmente, falar sobre micro front-ends!

## Micro front-ends

Micro Front-end é um estilo arquitetônico que separa uma aplicação de front em várias camadas menores, cada uma sendo responsável por um módulo específico da aplicação, normalmente separadas por domínios ou contextos de uso, permitindo assim, que diferentes times cuidem dessas funcionalidades de forma independente.

![Exemplo micro front ends](https://res.cloudinary.com/practicaldev/image/fetch/s--4EV-aVId--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y3p2phiwxtfaanw9lldx.png)

Na prática, negócios podem separar produtos web em micro front-ends dividindo seus times de acordo com as funcionalidades dos seus sistemas.

![Exemplo micro front ends](https://res.cloudinary.com/practicaldev/image/fetch/s--HUeLecm6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xwwwgr5u09pitwhj1lq1.png)

As vantagens de uma arquitetura micro front-end:

- Mais facilidade na correção de bugs
- Facilidade na integração de novas pessoas no projeto
- Mais facilidade de implementação de novas features
- Facilidade na coordenação entre times
- Times mais independentes

---

## Projeto Exemplo

<https://github.com/profalves/Micro-front-end>

---

## Docs

- <https://dev.to/jpbrab0/o-que-e-micro-front-end-4kci>
- <https://medium.com/bb-tutorials-and-thoughts/how-to-implement-micro-frontend-architecture-with-angular-e6828a0a049c>
- <https://medium.com/guide-lab/angular-configurando-e-executando-aplica%C3%A7%C3%B5es-micro-frontends-com-single-spa-99b488e6c70>
- <https://levelup.gitconnected.com/your-first-angular-microfrontend-58950768a465>
- [Estrutura de microfrontends para diferentes frameworks](https://www.youtube.com/watch?v=KZpSghOWOnE)
- [Estrutura de microfrontends com Angular](https://www.youtube.com/watch?v=54wcutNmsd0)
