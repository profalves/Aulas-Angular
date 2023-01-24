# Requisições HTTP com Angular

Realizar requisições HTTP é uma das tarefas mais comuns em SPAs atualmente. É por meio delas que a aplicação se comunica com APIs RESTful que lhes provêem dados e funcionalidades. Portanto, saber realizar esse tipo de ação no Angular é fundamental para todo desenvolvedor que utiliza esse framework.

## Primeiros passos

Para usar a classe `HttpClient`, primeiramente precisamos importar o módulo `HttpClientModule` no módulo em que se encontra declarado o componente/serviço em que vamos realizar as requisições. Aqui vamos realizar as requisições no próprio `AppComponent`, que é criado por padrão quando iniciamos um novo projeto Angular. Portanto, precisamos importar o módulo `HttpClientModule` no `app.module.ts`

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//Importamos o módulo HttpClientModule do pacote @angular/common/http, de forma que ele possa ser usado nesse arquivo mais adiante;
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // importamos o HttpClientModule, assim a classe HttpClient poderá ser usada no componente AppComponent, que é declarado mais acima neste mesmo arquivo.
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Feito isso, podemos abrir o `app.component.ts` e declarar no construtor da classe um parâmetro do tipo `HttpClient`. Note no código abaixo que usaremos o modificador **private** para que esse parâmetro seja automaticamente uma propriedade do componente, de forma que possamos usá-lo em seguida usando a sintaxe `this.http`.

```ts
constructor(private http : HttpClient) {}
```

> _Como usamos o modificador private já no parâmetro, não precisamos atribuí-lo a nenhum objeto internamente. O Angular será capaz de injetar uma instância da classe HttpClient dinamicamente. Assim sendo, não precisamos usar o operador new para instanciar o objeto local http._

## Enviando requisições HTTP

Começaremos essa seção declarando uma variável no componente contendo o endereço da API. Ele será usado para que não precisemos repetir o endereço completo em cada requisição, bem como para facilitar sua alteração caso seja necessário:

```ts
readonly apiURL : string;
```

A variável foi declarada como readonly, pois ela não deve ser alterada em nenhum outro ponto do código após ser inicializada, o que será feito no construtor da classe:

```ts
constructor() {
   this.apiURL == 'http://localhost:3000';
}
```

Em seguida, a primeira requisição que enviaremos será do tipo **GET** para listar todos os produtos, então vamos codificar o método `listarTodosProdutos`

```ts
listarTodosProdutos() {
  // com nome sugestivo, o método get da classe HttpClient é o responsável por enviar requisições do tipo GET para o endereço informado como parâmetro. Aqui esse endereço é formado pela concatenação da URL base + /produtos, conforme vimos na documentação da API.
  this.http.get(`${ this.apiURL }/produtos`)
           .subscribe(resultado => 
             console.log(resultado)
           );
  //o método get é assíncrono e retorna um Observable. Sendo assim, para recuperarmos seu resultado precisamos invocar o método subscribe, passando para ele uma função anônima cujo argumento é o corpo da resposta obtido, já devidamente convertido para objeto JavaScript.
}
```

Podemos tratar o erro para apresentar um retorno amigável. Para isso, podemos informar uma segunda função como parâmetro para o método subscribe, dessa vez tendo como argumento o erro que é retornado, como mostra a Listagem 5.

```ts
listarProdutoPorId() {
  this.http.get(`${ this.apiURL }/produtos/99`)
           .subscribe(
              resultado => {
                console.log(resultado)
            }, erro => {
              if(erro.status == 404) {
                console.log('Produto não localizado.');
              }
           });
}
```

No entanto, até o momento não enviamos dados no corpo da requisição. Isso será feito na requisição POST para adicionar um novo produto, a qual é realizada no método adicionarProduto.

```ts
adicionarProduto() {
  let produto = { nome : "" };

  this.http.post(`${ this.apiURL }/produtos`, produto)
      .subscribe(
        resultado => {
          console.log(resultado)
        },
        erro => {
          if(erro.status == 400) {
            console.log(erro);
          }
        }
      );
}
```

## Requisições tipadas

Projetos Angular usam a linguagem TypeScript por padrão, o que nos permite desfrutar dos recursos que essa linguagem oferece. Entre eles está a tipagem estática, que é a possibilidade de fixar o tipo de uma variável no momento da sua declaração.

```ts
export class Produto {
  id : number;
  nome : string;
}
```

Em seguida, importaremos esse tipo no `AppComponent` para que possamos usá-lo nas requisições:

```ts
import { Produto } from './models/produto.model';
```

Feito isso, podemos agora especificar o tipo de retorno das requisições **GET**. No caso do método `listarTodosProdutos`, o tipo de retorno será `Produto[]`, ou seja, **um array de produtos**. Já no `listarProdutoPorId` o tipo é apenas `Produto`, posto que apenas um item é retornado.

```ts
listarTodosProdutos() {
  this.http.get<Produto[]>(`${ this.apiURL }/produtos`)
            .subscribe(resultado => console.log(resultado));
}
```

---

## Desafio

Implementar um service http para buscar os produtos da api e popular o seu frontend.
