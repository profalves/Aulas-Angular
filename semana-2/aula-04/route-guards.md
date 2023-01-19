# Route Guards Angular

## O que é Route Guards Angular

![Guard](https://res.cloudinary.com/practicaldev/image/fetch/s--SPkw1eh3--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/je1ykrj0o677bqottopu.png)

É uma interface do Angular que faz o meio de campo antes de chamar a rota de fato, seja navegando entre os componentes ou saindo de algum deles.

O route guards (ou rota de guarda), faz a verificação se o usuário pode ou não acessar determinada rota. Um exemplo é quando esquecemos de preencher algum campo obrigatório de um formulário e a página não nos deixa seguir em frente antes de preenchê-lo.

Existem alguns tipos para rota de guarda:

- *CanActivate* – Verifica se o usuário pode acessar a rota;

- *CanActivateChild* – Verifica se o usuário pode visitar uma rota filha;

- *CanDeactivate* – Verifica se o usuário pode sair da rota;

- *CanMatch* – Decide se uma rota pode ser correspondida. (A *CanLoad* foi depreciada).

## Route Guards Angular Getting Started

Para iniciar um projeto de guards vamos ao básico:

`ng generate component home`

`ng generate component user`

Vamos deixar as rotas pré prontas aqui também:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent  } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';


import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '',     component: HomeComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

No app component, vamos colocar link para a home e o user:

```html
<ul>
  <li><a routerLink="/">Home</a></li>
  <li><a routerLink="/user">User</a></li>
</ul>
<hr>

<router-outlet></router-outlet>
```

## CanActivate rota de guarda

O CLI consegue nos prover uma maneira simples de gerar o guard:

`ng generate guard user`

> Sendo o `user` no comando é o nome que daremos ao *guard*

Vai ser feito a pergunta de qual interface queremos usar, vamos começar com o **canActive**, ele é o default do CLI, então apenas confirme.

Abrindo o arquivo do guards o `user.guard.ts`

```ts
import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
```

Vale lembrar que ele pode tanto retornar uma `Promise<boolean>` como um `Objectable<boolean>`, caso o retorno da rota seja true ele pode acessar e caso seja false será negado o acesso a ela.

Não podemos esquecer de importar o guard no `NgModule`, dentro do `app.module`.

```ts
// ...
import { UserGuard } from './user.guard';
// ...

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserGuard],
  bootstrap: [AppComponent]
})

// ...
```

Ainda dentro da lista de rotas, devemos dizer ao Angular em quais rotas queremos usar o guard e a sintaxe para isso é a seguinte:

```ts
{ path: '/caminho_do_componente',
  component: nome_do_componente,
  canActivate: [nome_do_guard]
}
```

Vamos usar o guard no `/user`

```ts
// Resto dos imports e configurações acima...

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'user', 
    component: UserComponent, 
    canActivate: [UserGuard] 
  }
];

// ...
```

Em todo caso, como o guard está retornando `true` sempre, ele não faz diferença alguma, mas para testa-lo vamos deixar o retorno como `false` e ver como o guard se comporta.

## CanActivateChild rota de guarda

A `CanActivatechild` é muito parecida com `CanActivate`. Aplicamos essa guarda à rota pai. O Angular invoca esse guarda sempre que o usuário tenta navegar para qualquer uma de suas rotas filhas. Isso nos permite verificar alguma condição e decidir se devemos prosseguir com a navegação ou cancelá-la.

```ts
const appRoutes: Routes = [
  { 
    path: 'user', 
    component: UserComponent, 
    canActivate : [UserGuard], 
    canActivateChild : [DashboardGuard],
      children: [
      {  path: 'dashboard', component: DashboardComponent},
      {  path: 'profile', component: ProfileComponent  },
      ]  
  }
];
```

## CanDeactive rota de guarda

É com ele que garantimos que algo seja feito antes do usuário sair da rota, um exemplo real é quando preenchemos um formulário e no meio dele decidimos sair da página, podemos deixar configurado para o componente perguntar se realmente ele quer sair dessa rota sem salvar os dados ou mudar alguma informação da conta e não apertamos o botão de salvar, são esses tipos de situações que podemos usar o `CanDeactive`.

Padrão CLI para criar ele:

`ng generate guard user-exit`

Não podemos esquecer de selecionar o CanDeactive no prompt, mesma coisa do `CanActivatechild`, só que agora iremos usar o `CanDeactive`, então atenção nessa parte.

Vamos abrir o arquivo e dar uma olhada nele:

```ts
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return false;
  }
}

```

Vamos criar uma lógica falsa para o usuário confirmar se ele realmente quer sair da rota. Vai aparecer um pop-up para ele confirmar.

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

  canExit(): boolean {
    if(confirm("Você quer sair da rota?")) {
      return true;
    } else {
      return false;
    }
  }
}
```

Como essa lógica está dentro do **“user”**, não podemos esquecer de importà-lo.

```ts
import { Injectable } from '@angular/core';

import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { UserComponent } from './user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: UserComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return component.canExit();
  } 
}
```

Fizemos o import do `UserComponent` com a nossa lógica falsa, um ponto que vale ressaltar é o seguinte, dentro do `canDeactivate` temos o parâmetro `component`, que nada mais é onde iremos colocar o componente onde está a nossa lógica.

Agora só falta colocar dentro das rotas e dizer em qual rota vamos usar o `canDeactivate`.

```ts
// ...
import { UserExitGuard } from './user-exit.guard';

const appRoutes: Routes = [
  { path: '',     component: HomeComponent },
  { path: 'user', component: UserComponent, canDeactivate: [UserExitGuard] }
];
// ...
```

Se você testar e acessar a página `/user` e tentar sair dela, irá aparecer nosso pop-up perguntando se você tem certeza.

## CanMatch rota de guarda

O exemplo a seguir implementa uma função `CanMatch` que decide se o usuário atual tem permissão para acessar a página de usuários.

```ts
class UserToken {}
class Permissions {
  canAccess(user: UserToken, id: string, segments: UrlSegment[]): boolean {
    return true;
  }
}

@Injectable()
class CanMatchTeamSection implements CanMatch {
  constructor(private permissions: Permissions, private currentUser: UserToken) {}

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    return this.permissions.canAccess(this.currentUser, route, segments);
  }
}
```

Aqui, a função de proteção é fornecida como parte do Route objeto na configuração:

```ts
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'team/:id',
        component: TeamComponent,
        loadChildren: () => import('./team').then(mod => mod.TeamModule),
        canMatch: [CanMatchTeamSection]
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [CanMatchTeamSection, UserToken, Permissions]
})
class AppModule {}
```

Se o `CanMatchTeamSection` retornasse false, o roteador continuaria navegando para o `team/:id`, mas carregaria o `NotFoundComponent` porque se a rota for `team/:id` não poderia ser usado para uma correspondência de URL, mas o `catch-all **` sim.

Como alternativa, você pode fornecer uma função in-line com a CanMatchFnassinatura:

```ts
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'team/:id',
        component: TeamComponent,
        loadChildren: () => import('./team').then(mod => mod.TeamModule),
        canMatch: [(route: Route, segments: UrlSegment[]) => true]
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
})
class AppModule {}
```

Agora temos várias possibilidades de lidar com pequenos problemas que possam acessar rotas ou sair delas, poderiam gerar.

Como o Angular é extremamente robusto, temos maneiras de lidar com as coisas de forma excelente, como sair da rota sem salvar dados ou carregar dados externos primeiro.

---

## Docs

- <https://angular.io/api/router#structures>
- <https://codecraft.tv/courses/angular/routing/router-guards/>
- <https://medium.com/angularbr/angular-6-route-guards-3a621846b8e4>
- <https://medium.com/rocketseat/implementando-lazy-loading-no-angular-d8a6541c0580>
- <https://imasters.com.br/front-end/angular-6-lazy-loading>
- <https://www.alura.com.br/artigos/como-lazy-loading-pode-melhorar-desempenho-aplicacao-angular>
