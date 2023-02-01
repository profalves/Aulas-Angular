# Desafio da Semana 4

Você teve a oportunidade de construir de um ecommerce do zero com a sua jornada e funcionalidades básica. Daremos continuidade incrementando mais funcionalidades na nossa ultima semana. Com isso, nesta semana será o desenvolvimento das páginas de administração e a área do cliente.

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

- [Desafio da Semana 4](#desafio-da-semana-4)
  - [Estrutura de navegação](#estrutura-de-navegação)
  - [Critérios de Aceite](#critérios-de-aceite)
    - [Critérios Anteriores (ultima chance)](#critérios-anteriores-ultima-chance)
    - [Criação do usuário](#criação-do-usuário)
    - [Minha Conta (Área do cliente)](#minha-conta-área-do-cliente)
    - [Admin](#admin)
    - [Testes](#testes)
  - [Pesos](#pesos)
  - [Envio](#envio)

### Critérios Anteriores (ultima chance)

- Todos os critérios anteriores poderão ser atingidos a fim de tornar o seu ecommerce mais completo e satisfatório. Além de ser um portfolio para o seu Github. Então vamos lá e mão na massa: [Semana 3 - Critérios de Aceite](../semana-3/DESAFIO_S3.md)

### Criação do usuário

- A tela deverá ser acessível pela tela de login com um botão que leve a tela de cadastro quando o usuário ainda não é cadastrado.
- Os campos do formulário de cadastro, devem ser:
  - Nome completo
  - Email
  - Telefone
  - Endereço:
    - CEP (Com consulta a uma API de sua escolha para preencher os dados do endereço do cliente, conforme o CEP consultado)
    - Rua, Avenida, travessa, etc. (logradouro)
    - Número. Precisa ter alguma indicação do que preencher quando não tiver número
    - Complemento
    - Bairro
    - Cidade
    - Estado
    - Campo para senha
    - Campo para repetir e confirmar a senha
  - Checkbox aceitando as politicas de privacidade. Não precisa existir a página de politica de privacidade, mas pode apresentar como link
  - Checkbox aceitando o compartilhamento dos dados para uso interno do ecommerce. Pode apresentar o link que vá para a LGPD ou algo do tipo.
  - Botão de salvar o cadastro
- Após o cadastro o usuário deverá ser redirecionado para a tela de login para realizar o cadastro
- **ATENÇÃO**: A partir de agora nenhuma compra deverá ser concluida sem o usuário ser cadastrado. Então ele deverá se identificar por login ou se cadastrar, antes de concluir a compra.

### Minha Conta (Área do cliente)

- Deverá ser protegida e somente acessar quando estiver logado.
- No header o ícone/botão para a conta deverá mudar para o nome do usuário logado.
- O conteúdo desta tela deverá ser os dados do cliente e devem permitir que sejam editados pelo mesmo:
  - Nome completo
  - Email
  - Endereço. Nessa parte deverá ter um botão que permita que este cadastre um novo endereço além de poder editar o já existente.
  - Telefone
  - Um checkbox que aceita assinar a newsletter do site
- Botão para logout do site
- Os dados do login do usuário poderá ser persistidos no `localStorage` do browser

### Admin

- Deverá ser protegida e somente acessar quando estiver logado.
- Este usuário deve ser identificado como admin para ter acesso.
- O acesso deverá ser dado somente através da rota `/admin` e caso o usuário não esteja logado, seja redirecionado para a tela de login
- esta tela terá duas opções em forma de botão:
  - Lista de produtos cadastrado e cadastro de produtos
  - Lista de usuários, onde permita editar marcando algum usuário como admin também.
- Um dos dois cadastros deverão existir e se conseguir realizar os dois será adicionado pontuação extra para a nota.

### Testes

É necessario que os testes cubram uma margem de 40% de linhas e funcões em seu código. Devem sintetizar com a aplicação e os testes existentes quando os componentes/recursos forem criados serão ignorados.

## Pesos

Considerando que o desafio vale **10 pontos**:

1. Critérios anteriores: 5 pontos
2. Testes: 1 ponto
3. Criação de usuário: 1 ponto
4. Minha conta: 1 ponto
5. Admin: 1 ponto
6. Apresentação: 1 ponto

Para se inspirar e testar a jornada completa, acesse: <https://storetheme.vtex.com/>

## Envio

- Para envio, suba para o repositório do seu projeto no Github
- Deverá criar um pull/request de uma branch nova para que seja comparada as mudanças somente dessa semana, se possível.
- **ATENÇÃO**: Para quem utiliza o *JSON-Server*, por favor, publique este para que seja mais fácil rodar seu projeto na avaliação. Instruções: <https://my-json-server.typicode.com/>
- Qualquer dificuldade, favor informar com antecedencia, estou aqui para ajudar.
- **Prazo**: Até as *9hs* da manhã de sábado, dia 04/02/2023
