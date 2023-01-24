# Angular Interceptors

## O que é um Interceptor?

Muitas vezes precisamos modificar solicitações enviadas ou recebidas de um servidor web. E para isso podemos utilizar os **interceptors**. Eles permitem você interceptar solicitações HTTP de entrada e saída. E depois alterar de acordo com as necessidades de sua aplicação.

Sendo útil para tarefas como:

- Autenticar usuários;
- Adaptar informações;
- E tratar erros do servidor.

## Criando um Interceptor

Primeiramente precisamos criar uma classe `Injectable` que implemente a interface `HttpInterceptor`. E para atender essa interface, a classe deve definir um método `intercept()`.

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
```

> Note que o método **intercept()** recebe 2 argumentos, `req` e `next`, e retorna um `Observable` do tipo `HttpEvent`.

Sendo que:

- O objeto `req` é nossa requisição ao servidor;
- E o `next` é o **handler** *(manipulador)* HTTP. O manipulador possui o método `handle()` que retorna o desejado `HttpEvent`.

Então toda vez que seu aplicativo fizer uma requisição HTTP com `HttpClient`, o Interceptor chama o método `intercept()` e o método passa uma referência dessa requisição ao objeto `req`. Assim você pode inspecionar e modificar a requisição conforme necessário. (inclusive a resposta dessa requisição)

Depois quando a lógica estiver concluída, chamamos o next.handle() e retornamos a requisição atualizada para o aplicativo.

> ⚠ **Atenção!** ⚠  Os interceptors interceptarão apenas solicitações feitas com o serviço HttpClient.

## Como criar o Interceptor com Angular CLI

Para criar toda a estrutura do Interceptor, você pode copiar e colar o código acima ou utilizar o Angular CLI, através do comado ng generate:

```bash
ng generate interceptor nome-do-interceptador
```

Lembre que deve substituir `[nome-do-interceptador]` por um nome real da sua escolha. Como por exemplo:

```bash
ng generate interceptor auth-token
```

Em que são gerados 2 arquivos, um de interceptação e outro de teste:

```bash
├── /app/
│   ├── auth-token.interceptor.ts
│   └── auth-token.interceptor.spec.ts
└── ...
```

## Configuração do Angular Interceptor

Depois de criar, precisamos registrar o Interceptor como provedor de serviço em um módulo. Podendo ser tanto no módulo principal (o app.module) quanto em um módulo de recurso qualquer.

Porém normalmente é feito no app.module para que ele se aplique a todas as solicitações HTTP do aplicativo:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthTokenInterceptor } from './auth-token.interceptor.ts';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, // nome do provedor
      useClass: AuthTokenInterceptor, // a classe do interceptor
      multi: true // informa que poderá ser usado para multiplas requests
    }
  ]
})
export class AppModule { }
```

Perceba que o registro do Interceptor é feito como um provedor múltiplo, através do token `HTTP_INTERCEPTORS` e a opção `multi: true`, pois pode haver vários interceptors sendo executados em um único aplicativo. Algo parecido com:

```typescript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: MyFirstInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MySecondInterceptor, multi: true }
],
```

Assim os interceptadores serão chamados na ordem que foram fornecidos, ou seja, primeiro o `MyFirstInterceptor`, depois o `MySecondInterceptor`.

## Modificando requisições HTTP

Agora que nosso interceptor está configurado, vamos alterar o método `intercept()` para manipular as requisições HTTP e realizar uma operação simples.

No caso a ideia é adicionar um token de autenticação ao **header** *(cabeçalho)* HTTP.

Porém os objetos do tipo `HttpRequest` são imutáveis, sendo assim para modificar a requisição devemos:

- Primeiro criar uma copia com o método clone();
- Depois modificar a copia;
- E por fim chamar o next.handle() na copia modificada.

```typescript
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const AUTH_TOKEN = '123456';
    authReq = req.clone({ setHeaders: { AUTH_TOKEN } });
    return next.handle(authReq);
  }
}
```

Assim o código adiciona o `token` ao header toda vez que fizermos uma solicitação HTTP. Perceba também como o código fica mais limpo, quando centralizamos toda essa lógica no Interceptor.

> Caso você precise habilitar ou desabilitar um interceptor, deverá implementar essa lógica dentro do próprio interceptor.

## Modificando uma resposta HTTP

Outra coisa interessante dos interceptors é que eles podem processar a requisição e a resposta juntas. Ou seja, a interceptação de uma resposta é feita pelo mesmo método `intercept()`.

Mas para trabalhar com a resposta, devemos fazer dentro do `Observable` que retornamos do método `intercept()`.

Mas como fazemos isso? Através dos operadores **RxJs** e o método `pipe()`:

```typescript
return next.handle(authReq).pipe(
  // Faça sua customização aqui...
);
```

Então poderemos realizar alterações na resposta, como por exemplo:

```typescript
return next.handle(authReq).pipe(
  map(resp => {
     if (resp instanceof HttpResponse) {
        return  resp.clone({ body: [{title: 'Informação alterada no Interceptor'}] });
    }
  })
);
```

---

## Docs

- <https://angular.io/api/common/http/HttpInterceptor>
- <https://medium.com/angular-in-depth/top-10-ways-to-use-interceptors-in-angular-db450f8a62d6>
- 

---

## Desafio

Implementar um service http para buscar os produtos da api e popular o seu frontend. Poderá obter os produtos da API do DummyJson e usar interceptors para obter o token no recurso seguro desta api.