# Desafio da Semana 2

Você teve a oportunidade de iniciar com a contrução de um carrinho de compras semana passada. Daremos continuidade construindo um e-commerce por completo até a nossa ultima semana. Com isso, nesta semana será importantea construção da navegação da **Jornada Simples de Compra**.

Com isso, precisa escolher qual loja virtual deseja construir (moda, eletronicos, mercados, variedades, etc). Isso será fundamental para as regras e o que será necessario incrementar nela ao longo dos desafios.

Esta semana precisaremos desta navegação criada:

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

- Deve Apresentar um banner principal onde pode ser uma unica imagem ou um carrosel de imagens.
- Uma lista de no mínimo 8 produtos. Podem ser apresentados em uma lista na tela ou em um carrosel de produtos.
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
  - Poderá ter o desconto adicionando através de um cupom (Este cupom é uma string que representa exatamente o valor de um desconto)
  - Se seu carrinho tem desconto então precisa ter Sub-total (Total sem desconto)
  - Precisa ter como excluir o produto do carrinho.
  - Precisam ter uma rota para o resumo do pedido (/cart), que a lista de produtos adicionados
  - Precisam ter uma rota para o pagamento do pedido (/checkout), onde deve só passar para a próxima após escolher a forma de pagamento. Ou seja, sem ter uma pagamento escohido o botão de Finalizar compra deverá ficar desabilitado.
  - Precisam ter uma rota para o resumo do pedido, que a lista de produtos adicionados

### Header/Footer

Para toda a navegação pode apresentar um header e um footer, e estes também devem condizer com o segmento escolhido para o seu site.

- Header:
  - Logo
  - Menu categorias do site
  - Icone para a conta do usuário (cliente)
  - Icone para ir para o carrinho

- Footer:
  - Os links para diferentes parte do site e/ou Links externos.
  - Powered by Angular e a sua autoria no site.

> A medida que na semana os conteúdos vão sendo ensinados, iremos acrescentar mais requisitos com a inteção que este projeto se trabalhado até o fim do curso.

Para se inspirar e testar a jornada completa, acesse: <https://storetheme.vtex.com/>
