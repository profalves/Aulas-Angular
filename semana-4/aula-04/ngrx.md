# Gerenciamento de estado com NgRx

O uso do NgRx para gerenciamento de estado em um aplicativo Angular permite que você crie fluxos que rastreiam eventos exclusivos e gerenciam o estado de dados compartilhados de maneira *reativa*, *explícita* e *consistente*.

## Visão geral

Nx fornece um esquema para construir uma nova área de recursos NgRx que gerencia o estado compartilhado.

O pacote `@nrwl/angular` possui um esquema para gerar arquivos que implementam as melhores práticas ao usar o **NgRx** para gerenciamento de estado. Este esquema gera arquivos de origem que incluem aprimoramentos para NgRx para estratégias de persistência de dados e testes simplificados.

O NgRx gera um conjunto de recursos contendo os seguintes arquivos:

- `actions`: Expressa eventos exclusivos em todo o seu aplicativo, que são despachados de componentes e serviços.
- `reducer`: Lidar com mudanças de estado de ações despachadas para realizar mudanças de estado de forma imutável, onde usam o estado atual e a ação mais recente para computar um novo estado.
- `effects`: Lidar com efeitos colaterais para isolar interações externas de componentes de interface do usuário.
- `selectors`: Funções puras usadas para selecionar, derivar e compor pedaços de estado e atualizam quando suas entradas mudam.
- `facade`: Classe opcional que fornece encapsulamento adicional de NgRx de seu componente.
- `store`: Store é um gerenciamento de estado global baseado em **RxJS** para aplicativos Angular, inspirado no *Redux*. Store é um contêiner de estado controlado projetado para ajudar a escrever aplicativos consistentes e de alto desempenho sobre o Angular. Ele é um `Observable` de estado e um observador de ações.

**NgRx Store** é principalmente para gerenciar o estado global em um aplicativo inteiro. Nos casos em que você precisa gerenciar o estado do componente temporário ou local, considere o uso do NgRx ComponentStore.

![store](https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png)

## Configuração inicial

Para começar a usar o NgRx em um projeto Angular, configure o armazenamento de nível raiz. À medida que seu aplicativo cresce, você adiciona estados de nível de recurso, garantindo que seu código siga um padrão comum todas as vezes.

O exemplo abaixo mostra como configurar o NgRx na raiz do seu aplicativo.

```bash
nx g @nrwl/angular:ngrx app --module=apps/<appname>/src/app/app.module.ts --root
```

O comando acima aplica as seguintes alterações ao módulo fornecido:

- Registros `StoreModule.forRoot({})` na matriz de importações para gerenciamento de estado, com verificações de tempo de execução recomendadas habilitadas para manter ações e estado imutáveis.
- Registra `EffectsModule.forRoot([])` na imports para isolamento de efeitos colaterais.
- Cadastros StoreRouterConnectingModule.forRoot()no importsarray para integração com o Angular Router .
- Registra -se `StoreDevtools.instrument()` no importsarray para integração com a extensão do navegador Redux Devtools .

Você gerencia fatias separadas de estado usando bibliotecas e estados de recursos.

## Como usar o NgRx no Angular

**1:** Instale o NgRx como uma dependência do seu projeto Angular:

```bash
ng add @ngrx/store@latest
```

**2:** Crie um arquivo de ação para descrever as ações que ocorrerão no seu aplicativo, por exemplo:

```typescript
// file: src/app/actions/counter.actions.ts
import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
```

**3:** Crie um arquivo de estado para descrever o estado inicial do seu aplicativo e como ele será alterado pelas ações:

```typescript
// file: src/app/reducers/counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from '../actions/counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(initialState,
  on(CounterActions.increment, state => state + 1),
  on(CounterActions.decrement, state => state - 1),
  on(CounterActions.reset, state => 0),
);

```

**5:** Adicione os módulos NgRx ao seu módulo principal:

```typescript
// file: src/app/app.module.ts
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './reducers/counter.reducer';

@NgModule({
  ...
  imports: [
    ...
    StoreModule.forRoot({ count: counterReducer })
  ],
  ...
})
export class AppModule { }
```

**6:** Use o estado e as ações em seu componente Angular:

```typescript
// file: src/app/counter/counter.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
})
export class MyCounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
```

E é isso! Agora você pode experimentar um exemplo de como funciona o ***NgRx*** no Angular.

---

## Docs

- <https://ngrx.io/>
- <https://pris.com.br/blog/construindo-aplicacoes-escalaveis-no-angular-com-ngrx/>
- <https://nx.dev/recipes/other/misc-ngrx>
- <https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/>
- <https://www.workingsoftware.dev/what-is-ngrx-and-why-is-it-used-in-angular/>
- <https://github.com/mahenrique94/video-gerenciando-estado-ngrx>
