# Angular Lifecycle Hooks

Vamos pensar no ciclo de vida *(lifecycle)* como o que conhecemos mesmo, *nascemos*, *vivemos* e *morremos*, o Angular também trabalha desta forma, usamos várias fases desde criação até a destruição do componente ou o que quer que seja.

E não necessariamente ao carregar a aplicação todos os ciclos de vida são ativados ao mesmo tempo, podemos chamar um componente ao realizar determinada ação e assim dar início ao ciclo de vida dele. Então o Angular nos fornece *ganchos* (Hooks) para lidar com essas situações, e a ordem de execução é a seguinte:

- `ngOnInit`: é executado uma vez quando o componente é inicializado;
- `ngOnChanges`: executado também uma vez na criação do componente e toda vez que ele sofrer alguma mudança;
- `ngDoCheck`: executado a cada mudança que o ngOnChange não detecta;
- `ngOnDestroy`: executado na destruição do componente.

Além desses existem outros quatros hooks dentro do `ngDoCheck`:

- `ngAfterContentInit`: sempre que um conteúdo vindo de uma fonte externa do componente é inserido;
- `ngAfterContentChecked`: quando o conteúdo externo é verificado;
- `ngAfterViewInit`: executado logo após os dados dos filhos e do próprio componente ser inicializado;
- `ngAfterViewChecked`: sempre que é detectado uma alteração do conteúdo é chamado esse cara.

## Funcionamento do Lifecycle Hook

Para a gente iniciar um hook, devemos atender a duas coisas e são elas fazer a implementação da **interface** do hook e criar o método especial com seu nome.

Vamos ver como seria a criação de um `ngOnInit()`:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({...})

export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Olá, mundo');
  }
}
```

Podemos notar que o nome dado a interface do `OnInit` é a mesma do método, porém sem o **ng** na frente dele, assim facilitando o entendimento da situação e assim segue para todos os outros hooks.

> **Uma dica de boas práticas**, sempre faça a implementação da interface, mesmo que não seja obrigatório para o funcionamento. E caso queira utilizar mais de um hook fica assim as importações e chamadas:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({...})

export class AppComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log('Olá, mundo');
  }

  ngOnDestroy() {
    console.log(“Tchau”);
 }
}
```

## OnInit

**ngOnInit**: é executado uma vez quando o componente é inicializado;

O `OnInit` é excelente caso você precise fazer muitas coisas ao inicializar o componente, podendo ser algum tipo de configuração. Também usamos ele para atribuir `Observables` nas variáveis de componente, **parâmetros de rotas** também é muito legal de se usar aqui caso queira recuperar algum tipo de informação vindo delas.

```typescript
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({...})

export class ExemploComponent implements OnInit {

  pag: string; // Só um exemplo que pode mudar...

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => this.pag = params['pag'];
    );
  }
}
```

### Qual é a diferença entre usar ngOnInit e Constructor?

**Constructor**: é um método *default* do TypeScript, ele é utilizado como membro de uma `class` e nos possibilita trabalhar com Injeção de Dependência (**DI**).

**ngOnInit**: é carregado na inicialização de um componente.

Quando um componente é criado, os dois métodos são chamados. O `constructor` é o primeiro método a ser carregado quando nós instanciamos uma `class`. No Angular nós podemos usar para inicializar variáveis e DI como podemos ver no exemplo abaixo:

```typescript
constructor(peopleService: PeopleService) {
    this.people = peopleService.getPeople();
}
```

O ngOnInit é carregado depois que do nosso construtor é inicializado, abaixo podemos ver um exemplo onde nós estamos injetando novamente o nosso PeopleService no nosso construtor e buscando people no método ngOnInit.

```typescript
import {Component, OnInit} from '@angular/core';
export class AppComponent implements OnInit {
 
 constructor(peopleService: PeopleService) {}
 
 getList() {
    this.people = peopleService.getPeople();
 }

 ngOnInit() {
   this.getList();
 }
}
```

## OnChanges

**ngOnChanges**: executado também uma vez na criação do componente e toda vez que ele sofrer alguma mudança;

```typescript
import { Component, OnChanges, Input } from '@angular/core';

@Component({...})

export class ExemploComponent implements OnChanges {

  @Input() name: string;

  fullName: string;

  ngOnChanges() {
    this.fullName= name + "Silva";

  }
}
```

Nessa lógica ao digitar o seu nome no campo e atualizar ele vai aparecer junto com o sobrenome e assim o `OnChange` é chamado. Vale ressaltar que o OnChange também pode receber um parâmetro opcional chamado `SimpleChanges` que contém os valores do `@Input()`, vamos dar uma olhada na sintaxe dele.

```typescript
interface SimpleChanges {
  [propName: string]: SimpleChange;
}
```

E segue as propriedades:

```typescript
interface SimpleChange {
  currentValue: any;
  previousValue: any;
  firstChange: boolean;
  isFirstChange(): boolean;
}
```

Sobre cada propriedade:

- **CurrentValue**: contém o valor que está no Input no momento;
- **PreviousValue**: contém o valor de Input antes de qualquer tipo de atualização no conteúdo dele;
- **FirstChange**: retorna true ou false caso seja a primeira alteração sofrida no conteúdo;
- **IsFristChange**: outro método que retorna true se for a primeira alteração sofrida no conteúdo.

## DoCheck

**ngDoCheck**: executado a cada mudança que o `ngOnChange` não detecta;

`DoCheck` é um hook de ciclo de vida usado para invocar uma função de detecção de alterações personalizada para uma diretiva. O Angular dispara o DoCheck após cada detecção de alteração.

Ele será executado quando um valor de variável for alterado para que coisas básicas também possam ser capturadas desta função. Portanto, neste método, estamos lidando com todos os tipos de coisas com instruções `if-else`. pois a função será executada toda vez que houver uma alteração no componente então aqui está um código de exemplo que você pode conferir.

```typescript
ngDoCheck() {

  if (this.hero.name !== this.oldHeroName) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
    this.oldHeroName = this.hero.name;
  }

  if (this.power !== this.oldPower) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
    this.oldPower = this.power;
  }

  if (this.changeDetected) {
      this.noChangeCount = 0;
  } else {
      // log that hook was called when there was no relevant change.
      const count = this.noChangeCount += 1;
      const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
      if (count === 1) {
        // add new "no change" message
        this.changeLog.push(noChangeMsg);
      } else {
        // update last "no change" message
        this.changeLog[this.changeLog.length - 1] = noChangeMsg;
      }
  }

  this.changeDetected = false;
}
```

> `ngDoCheck` e `ngOnChanges` não devem ser implementados juntos no mesmo componente.

## OnDestroy

**ngOnDestroy**: executado na destruição do componente.

Por fim, mas não menos importante vamos falar um pouco do `OnDestroy`, que é iniciado antes do componente ser finalizado ou "destruído" e assim temos uma maneira de liberar ciclos lógicos completos.

Com o `OnDestroy` podemos evitar também ***memory leak*** e assim problemas de desempenho e quem sabe até erros em projetos.

Uma das principais causas de memory leak (*a ameaça silenciosa do vazamento de memória*) no Angular é com o `Observable`, assinamos ele e depois não o destruímos, deixando assim ele consumindo memória. Imagina que um componente é iniciado com requests (retornando Observables) e destruído 3 vezes, então vamos ficar com 3 `Observables` executando ainda em memória que não estão sendo usados.

```typescript

import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from './user.service';

import { Subscription } from 'rxjs';


@Component({...})

export class UserComponent implements OnInit, OnDestroy {

  subUser: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subUser = this.userService.getUser().subscribe(
      (user: any) => console.log(`Usuário logado: ${user}`);
    );
  }

  ngOnDestroy() {
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }
}
```

Aqui usamos o `unsubscribe()` e o `ngOnDestroy()` para resolver esses problemas de cancelamento de assinatura em Observables.

> Lembrando que para uso de **HTTP** você não precisa destruir o subscribe ele se destroi sozinho

---

## Docs

- <https://angular.io/guide/lifecycle-hooks>
- <https://medium.com/xp-inc/angular-ngoninit-e-constructor-be52ad5ba599#:~:text=Constructor%3A%20%C3%A9%20um%20m%C3%A9todo%20default,na%20inicializa%C3%A7%C3%A3o%20de%20um%20componente.>
- <https://medium.com/totvsdevelopers/chega-de-vazamentos-nos-seus-observables-5c69bba8f77>
- <https://www.amplifyre.com/articles/2-best-ways-prevent-memory-leaks-in-angular>
- <https://betterprogramming.pub/build-me-an-angular-app-with-memory-leaks-please-36302184e658>
