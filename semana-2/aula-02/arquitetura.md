# Arquitetura do Angular

O Angular é um framework para o desenvolvimento de software front-end. Isso quer dizer que utiliza tecnologias padrão do contexto web como HTML, CSS e uma linguagem de programação como JavaScript ou TypeScript.

Um software desenvolvido em Angular é composto por diversos elementos como: módulos, componentes, templates e serviços. Esses elementos fazem parte da arquitetura do Angular, que é ilustrada pela figura a seguir.

![arquitetura](https://algaworks-blog.s3.amazonaws.com/wp-content/uploads/Building-blocks-angular.png)

## Padrões de arquitetura

Essa arquitetura de software orientada a componentes implementa conceitos de dois padrões de arquitetura de software:

- **MVC** (Model, View, Controller) é um padrão de software que separa a representação da informação (Model) da interação do usuário com ele (View-Controller). Geralmente, Model e Controller são representados por código em linguagem de programação (classes e/ou funções) e View é representado por HTML e CSS.
- **MVVM** (Model, View, View-Model) é um padrão de software semelhante ao MVC, com a diferença de que o View-Model utiliza recurso de data binding para fazer com que a View seja atualizada automaticamente quando ocorrer uma modificação no Model.

## Elementos da Arquitetura do Angular

### Módulos

**Módulos** representam a forma principal de modularização de código. Isso significa que um módulo é um elemento de mais alto nível da arquitetura do Angular e é composto por outros elementos, como componentes e serviços.

Um software desenvolvido em Angular possui pelo menos um módulo, chamado root module (módulo raiz). Os demais módulos são chamados ***feature modules*** (módulos de funcionalidades).

### Bibliotecas

**Bibliotecas** funcionam como um agrupador de elementos de software desenvolvido em Angular. Bibliotecas oficiais têm o prefixo `@angular`. Geralmente é possível instalar bibliotecas utilizando o **npm** (gerenciador de pacotes do NodeJs).

Uma biblioteca pode conter módulos, componentes, diretivas e serviços.

**Exemplos de Bibliotecas**:

- *PrimeNG*;
- *Angular Material*;
- *ng-bootstrap*;

### Componentes

Um componente está, geralmente, relacionado a algo visual, ou seja, uma tela ou parte dela. Nesse sentido, um componente possui código (**Controller**) que determina ou controla o comportamento da interação com o usuário (**View** ou **Template**).

O Template determina a parte visual do componente e é definido por código HTML e CSS, além de recursos específicos do Angular, como outros componentes e diretivas.

### Metadados

**Metadados** são um recurso do Angular para adicionar detalhes a classes. Isso é utilizado para que o Angular interprete uma classe como um Módulo ou como um Componente, por exemplo.

### Data binding

**Data binding** é um recurso do Angular que representa um componente importante da sua arquitetura. Considere os seguintes elementos:

- um **Model** define dados que serão apresentados no Template
- um **Template** apresenta os dados do Model
- um **View-Model** determina o comportamento do Template

Se o Controller atualiza o Model, então o Template tem que ser atualizado automaticamente. Se o usuário atualiza o Model por meio do Template (usando um formulário, por exemplo) o Controller também precisa ter acesso ao Model atualizado. O Data Binding atua garantindo que esse processo ocorra dessa forma.

### Serviços

Um **Serviço** é uma abstração do Angular utilizado *para isolar a lógica de negócio de Componentes*. Na prática, um Serviço é representado por uma classe com métodos que podem ser utilizados em Componentes. Para isso, para que um Componente utilize um serviço, o Angular utiliza o conceito de **Injeção de Dependência** (*DI, do inglês Dependency Injection*). DI é um padrão de software que faz com que dependências sejam fornecidas para quem precisar. Na prática, o Angular identifica as dependências de um Componente e cria automaticamente instâncias delas, para que sejam utilizadas posteriormente no Componente.

![services representation](https://algaworks-blog.s3.amazonaws.com/wp-content/uploads/Angular-services-1024x436.png)

---

## Desafio

Escolha uma das implementações para praticar o uso de um serviço:

1. Crie um projeto To-do-list com um serviço que forneça suas funcionalidades (CRUD)
2. Em seu projeto usado na atividade semanal, o carrinho de compras, isole as sua lógica de negócio em um serviço para poder dar manutenção as funcionalidades do carrinho através deste.

Ambas devem ser colocadas em um repositório na nuvem (github, gitlab, etc.) e o link enviado para a atividade disponibilizada no classroom