# Route parameters e query parameters no Angular

## O que é Route Parameter?

Os route parameters nos permite mandar dados através da URL. Um exemplo é mandar um ID de usuário para outro componente, podemos usar o route parameters e a URL ficaria parecido com isso:

```bash
…/user/id
…/user/1
…/user/2
```

Imagine que nossa aplicação tem muitos usuários, então fica impraticável codar todos os ID em links de route. Para isso podemos usar um `placeholder` como um ID para os dados.

### Como configurar o Route Parameters

Para definir um parâmetro devemos adicionar o `“/”` seguido pelo `“:”` e `placeholder`:

```ts
{ path: 'path_to_component/:placeholder_name',  component: component_name }
```

Caso você queira mandar dados para a rota atual:

```ts
{ path: '/:placeholder_name',  component: component_name }
```

Exemplo para enviar o ID de pessoa para o componente *“pessoa”*:

```ts
...

const appRoutes: Routes = [
  { path: 'pessoa', component: PessoaComponent },
  { path: 'pessoa/:id', component: PessoaComponent }
];

...
```

Se você olhar para URL vamos ver: 

```bash
http://localhost:4200/pessoa/1
```

### Como enviar Route Parameter

```html
<a [routerLink]="['/path', 'parameter']">Link</a>
```


### Como acessar um Route Parameter

Vamos usar o serviço `ActivatedRoute`, que faz um track na rota ativa no momento e no componente carregado.

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-pessoa,
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
 
  // Injeção do tracking de routes
  constructor(private activatedRoute : ActivatedRoute) { }
 
}
```

Angular adiciona todos os parâmetros no `ParamMap`, facilitando o nosso trabalho. Existem duas maneiras:

- `Observable`;
- `Snapshot`.

### Usando o snapshot

O snapshot retorna o valor inicial da rota. Assim podemos acessar o array de `paramMap` e retirar o valor via `get()`.

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-pessoa,
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  public userID: string | null | undefined;
 
  constructor(private activatedRoute : ActivatedRoute) { }
 
  ngOnInit(): void {
    this.userID = this.activatedRoute.snapshot.paramMap.get("id");
  }

}
```

No arquivo `pessoa.component.html`:

```html
<p>User ID: {{ userID }}</p>
```

### Usando Observable para acessar Route Parameter

Podemos pegar o valor do parâmetro fazendo um `subscribe` do `paramMap` da `ActivatedRoute`.

```ts

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(params => {
    this.userID = params.get('id');
  });
}

```

## O que é Query Parameter

Query Parameters é um parâmetro opcional que podemos passar através da rota. Ele é passado no final da rota com um ponto de interrogação, sintaxe:

```bash
/listings?page=4
```

O `page=4` é uma `query string` de `URI`. Ele é bem popular em paginação e consultas.

### Como usar o Query Parameter

O query parameter não é uma parte da rota, podemos enviar usando o `queryParams` ou `router.navigate()`

A sintaxe do `queryParams`:

```html
<a [routerLink]="['path']" [queryParams]="{ key:value }">Página 4</a>
```

A sintaxe do `router.navigate()`:

```ts
this.route.navigate(['/path'], { queryParams: { key: value } });
```

> Não podemos esquecer de fazer o import do `Router` no `core` do Angular.

### Como acessar o Query Parameter

Da mesma forma que fizemos com o ActivatedRoute, mas ao invés de usar o `ParamMap` vamos utilizar o `“queryParamsMap`.

Usando o `snapshot` para acessar o Query Parameter

```ts
...
import { ActivatedRoute } from '@angular/router';

...
export class PessoaComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute) { }

...

  ngOnInit(): void {
    this.pageNum = this.activatedRoute.snapshot.queryParamMap.get("page");
  }
}
```

Porém podemos usar um observable para caso quiser sempre pegar o valor atualizado, por exemplo, se caso quiser para o valor de um query para ser exibido na tela, com o `snapshot` só pega o valor inicial do componente e assim não atualiza mais qualquer informação.

### Usando Observable para acessar o Query Parameter

Podemos pegar o valor do query parameter dando um subscribing no `queryParamMap`.

```ts

ngOnInit(): void {
  this.activatedRoute.queryParamMap.subscribe(params => {
    this.pageNum = params.get('page');
  });
}

```
