# Desafio da Semana 2

Você teve a oportunidade de iniciar com a construção de uma jornada simples de compras semana passada. Daremos continuidade construindo um e-commerce por completo até a nossa ultima semana. Com isso, nesta semana será o desenvolvimento das páginas de PDP (Product Detail Page) e PLP (Product List Page), sendo essas cruciais em uma decisão de compra de um usuario.

Com isso, precisa escolher qual loja virtual deseja construir (moda, eletrônicos, mercados, variedades, etc.). Isso será fundamental para as regras e o que será necessário incrementar nela ao longo dos desafios.

## Estrutura de navegação

Esta semana precisaremos desta estrutura de navegação criada:

```bash

|-- home
    |-- PLP
    |-- PDP
    |-- Cart
        |-- resume
        |-- checkout
        |-- confirmation
|-- Minha Conta
|-- Admin (CMS)
    |-- Cadastro de Produtos
    |-- Listagem de Clientes
|-- Login

```

## Critérios de Aceite

- [Desafio da Semana 2](#desafio-da-semana-2)
  - [Estrutura de navegação](#estrutura-de-navegação)
  - [Critérios de Aceite](#critérios-de-aceite)
    - [Critérios Anteriores (segunda chance)](#critérios-anteriores-segunda-chance)
    - [PDP (Product Details Page)](#pdp-product-details-page)
    - [Login](#login)
    - [Serviço](#serviço)
    - [Testes](#testes)
  - [Pesos](#pesos)
  - [Envio](#envio)

### Critérios Anteriores (segunda chance)

- Todos os critérios anteriores poderão ser atingidos a fim de tornar o seu ecommerce mais completo e satisfatório. Além de ser um portfolio para o seu Github. Então vamos lá e mão na massa: [Semana 2 - Critérios de Aceite](../semana-2/DESAFIO_S2.md)

### PDP (Product Details Page)

- Deverá abrir o produto com a imagem mais ampliada.
- Se puder, ter uma galeria dessas imagens deste produto. (Não obrigatório)
- Informações Obrigatórias:
  - Nome do produto.
  - Imagem
  - Preço
  - Quantidade a ser lançada no carrinho.
  - Botão para adicionar este produto ao carrinho.

<!-- ### Minha Conta

- Deverá ser protegida e somente acessar quando estiver logado.
- Caso o usuário não esteja logado, deverá ser avisado que os dados de login não estão corretos.
- No header o ícone/botão para a conta deverá mudar para o nome do usuário logado.
- Não precisa ter conteúdo em tela por agora -->

<!-- ### Admin

- Basta somente o componente da tela e a rota criada, não precisa ter conteúdo por agora.
- Deverá ser protegida e somente acessar quando estiver logado.
- Este usuário deve ser identificado como admin para ter acesso.
- O acesso deverá ser dado somente através da rota e caso o usuário não esteja logado, seja avisado que os dados de login estão incorretos. -->

### Login

- A tela de login deverá ter os campos de login e senha.
- Agora é necessário existir uma lógica e será mais fácil usando um serviço http para o site [DummyJson](https://dummyjson.com/docs/auth) ou alguma *API fake* que faça algo similar.
- Criar um interceptor para enviar o token nas próximas requests.
- Após o login, redirecionar para a página principal

### Serviço

Pelo menos organizar e separar as responsabilidade dos serviços, regras de negócios e serviços externos (HTTP e afins, por exemplo) não devem ficar juntos.

### Testes

É necessario que os testes cubram uma margem de 40% de linhas e funcões em seu código. Devem sintetizar com a aplicação e os testes existentes quando os componentes/recursos forem criados serão ignorados.

## Pesos

Para se inspirar e testar a jornada completa, acesse: <https://storetheme.vtex.com/>

## Envio

- Para envio, suba para o repositório do seu projeto no Github
- Deverá criar um pull/request de uma branch nova para que seja comparada as mudanças somente dessa semana, se possível.
- **ATENÇÃO**: Para quem utiliza o *JSON-Server*, por favor, publique este para que seja mais fácil rodar seu projeto na avaliação. Instruções: <https://my-json-server.typicode.com/>
- Qualquer dificuldade, favor informar com antecedencia, estou aqui para ajudar.
- **Prazo**: Até as *23hs* de domingo, dia 29/02/2023
