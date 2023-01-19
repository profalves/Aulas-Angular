# Desafio da Semana 2

Você teve a oportunidade de iniciar com a construção de um carrinho de compras semana passada. Daremos continuidade construindo um e-commerce por completo até a nossa ultima semana. Com isso, nesta semana será importante o desenvolvimento da navegação na **Jornada Simples de Compra**.

Com isso, precisa escolher qual loja virtual deseja construir (moda, eletrônicos, mercados, variedades, etc.). Isso será fundamental para as regras e o que será necessário incrementar nela ao longo dos desafios.

Esta semana precisaremos desta estrutura de navegação criada:

```
|-- home
    |-- PDP
    |-- Cart
        |-- resume
        |-- checkout
        |-- confirmation
```

## Critérios de Aceite

### Home page

- Deve Apresentar um banner principal onde pode ser uma única imagem ou um carrossel de imagens.
- Uma lista de no mínimo 8 produtos. Podem ser apresentados em uma lista na tela ou em um carrossel de produtos.
- Cada produto será um card onde terá a imagem do produto, nome, preço e o botão de "adicionar no carrinho". Pode alterar a quantidade de produtos ao ser enviada no carrinho através dele, mas não é obrigatório.
- Fique a vontade para deixar o site mais próximo do segmento que você escolheu, e pode apresentar mais de uma lista de produtos (novidades, mais vendidos, etc.).

### PDP (Product Details Page)

- Deverá abrir o produto com a imagem mais ampliada.
- Nome do produto.
- Preço.
- Quantidade a ser lançada no carrinho.
- Botão para adicionar este produto ao carrinho.

### Carrinho

- Os mesmos critério anteriores:
  - O carrinho será uma lista de produtos onde terá imagem, o nome, preço e quantidade de cada produto
  - Também precisa mostrar o **Total** dos valores dos produtos
  - Poderá ter o **Desconto** adicionando através de um cupom (Este cupom é uma string que representa exatamente o valor de um desconto)
  - Se seu carrinho tem *desconto* então precisa ter **Subtotal** (Total sem desconto)
  - Precisa ter como excluir o produto do carrinho.
  - Precisam ter uma rota para o resumo do pedido (`/cart`), que a lista de produtos adicionados. Nele haverá o botão para ir para a tela de pagamento.
  - Nesta tela será aplicado o cupom de desconto. Então a partir de agora é necessário termos um input para o nome do cupom e o demonstrativo de subtotal, desconto aplicado(valor e/ou porcentagem) e total (total = subtotal - desconto).
  - Precisam ter uma rota para o pagamento do pedido (`/checkout`), onde deve só passar para a próxima após escolher a forma de pagamento. Ou seja, sem ter uma pagamento escohido o botão de Finalizar compra deverá ficar desabilitado.
  - Precisam ter uma rota para a confirmação do pedido(`/confirmation`), onde o usuário será avisado que o seu pedido foi realizado com sucesso e logo abaixo terá os detalhes do mesmo:
    - Lista de itens comprados, com imagem, nome, quantidade e preço em cada
    - Subtotal, Desconto aplicado e Total.

### Header/Footer

Para toda a navegação pode apresentar um `header` e um `footer`, e estes também devem condizer com o segmento escolhido para o seu site.

- Header:
  - Logo
  - Menu categorias do site
  - Ícone para a conta do usuário (cliente)
  - Ícone para ir para o carrinho

- Footer:
  - Os links para diferentes partes do site e/ou links externos.
  - Powered by Angular e a sua autoria no site.

> A medida que na semana os conteúdos vão sendo ensinados, iremos acrescentar mais requisitos com a inteção de tornar que este projeto seja trabalhado até o fim do curso.

Para se inspirar e testar a jornada completa, acesse: <https://storetheme.vtex.com/>
