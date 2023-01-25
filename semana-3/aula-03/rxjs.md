# RxJS Observable com Angular

## O que é um Observable?

Por definição é uma **coleção** que funciona de forma **unidirecional**, ou seja, ele **emite notificações** sempre que ocorre uma mudança em um de seus itens e a partir disto podemos executar uma ação.

## Funções de criação de Observable

O **RxJS** oferece várias funções que podem ser usadas para criar novos *"observáveis"*. Essas funções podem simplificar o processo de criação de observable ​​a partir de itens como eventos, cronômetros e promessas. Por exemplo:

### Criar um observable a partir de uma promise

```typescript
import { from, Observable } from 'rxjs';

// Create an Observable out of a promise
const data = from(fetch('/api/endpoint'));
// Subscribe to begin listening for async result
data.subscribe({
  next(response) { console.log(response); },
  error(err) { console.error('Error: ' + err); },
  complete() { console.log('Completed'); }
});
```

### Criar um observable a partir de um contador

```typescript
import { interval } from 'rxjs';

// Create an Observable that will publish a value on an interval
const secondsCounter = interval(1000);
// Subscribe to begin publishing values
const subscription = secondsCounter.subscribe(n =>
  console.log(`It's been ${n + 1} seconds since subscribing!`));
```

### Criar um observable a partir de um evento

```typescript
import { fromEvent } from 'rxjs';

const el = document.getElementById('my-element')!;

// Create an Observable that will publish mouse movements
const mouseMoves = fromEvent<MouseEvent>(el, 'mousemove');

// Subscribe to start listening for mouse-move events
const subscription = mouseMoves.subscribe(evt => {
  // Log coords of mouse movements
  console.log(`Coords: ${evt.clientX} X ${evt.clientY}`);

  // When the mouse is over the upper-left of the screen,
  // unsubscribe to stop listening for mouse movements
  if (evt.clientX < 40 && evt.clientY < 40) {
    subscription.unsubscribe();
  }
});
```

### Crie um observable que crie uma solicitação AJAX

```typescript
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// Create an Observable that will create an AJAX request
const apiData = ajax('/api/data');
// Subscribe to create the request
apiData.subscribe(res => console.log(res.status, res.response));
```

## Operadores (Conceitos Gerais)

Os operadores são funções que se baseiam na base dos observable ​​para permitir a manipulação sofisticada de coleções. Por exemplo, **RxJS** define operadores como `map()`, `filter()`, `concat()` e `flatMap()`.

Os operadores aceitam opções de configuração e retornam uma função que usa um observável de origem. Ao executar essa função retornada, o operador observa os valores emitidos do observável de origem, os transforma e retorna um novo observável desses valores transformados. Aqui está um exemplo simples:

### Operador Map

```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const nums = of(1, 2, 3);

const squareValues = map((val: number) => val * val);
const squaredNums = squareValues(nums);

squaredNums.subscribe(x => console.log(x));

// Logs
// 1
// 4
// 9
```

### Função Pipe

Você pode usar pipes para vincular operadores. Pipes permitem que você combine várias funções em uma única função. A função `pipe()` recebe como argumentos as funções que você deseja combinar, e retorna uma nova função que, ao ser executada, executa as funções compostas em sequência.

Um conjunto de operadores aplicados a um observable é uma receita — isto é, um conjunto de instruções para produzir os valores nos quais você está interessado. Por si só, a receita não faz nada. Você precisa chamar `subscribe()` para produzir um resultado por meio da receita.

Aqui está um exemplo:

***Função de pipe standalone***

```typescript
import { of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const nums = of(1, 2, 3, 4, 5);

// Create a function that accepts an Observable.
const squareOddVals = pipe(
  filter((n: number) => n % 2 !== 0),
  map(n => n * n)
);

// Create an Observable that will run the filter and map functions
const squareOdd = squareOddVals(nums);

// Subscribe to run the combined functions
squareOdd.subscribe(x => console.log(x));
```

A função `pipe()` também é um método no **RxJS** `Observable`, então você usa este formulário mais curto para definir a mesma operação:

***Função Observable.pipe***

```typescript
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const squareOdd = of(1, 2, 3, 4, 5)
  .pipe(
    filter(n => n % 2 !== 0),
    map(n => n * n)
  );

// Subscribe to get values
squareOdd.subscribe(x => console.log(x));
```

### Operadores comuns

O **RxJS** fornece muitos operadores, mas apenas alguns são usados ​​com frequência. Para obter uma lista de operadores e amostras de uso, visite o
Documentação da API RxJS
.

> NOTA : Para aplicações angular, preferimos combinar operadores com tubos, em vez de encadear. O encadeamento é usado em muitos exemplos de RxJS.

| ÁREA          | OPERADORES                                                               |
| ------------- | ------------------------------------------------------------------------ |
| Criação       | `from`, `fromEvent`, `of`                                                |
| Combinação    | `combineLatest`, `concat`, `merge`, `startWith`, `withLatestFrom`, `zip` |
| Filtragem     | `debounceTime`, `distinctUntilChanged`, `filter`, `take`, `takeUntil`    |
| Transformação | `bufferTime`, `concatMap`, `map`, `mergeMap`, `scan`, `switchMap`        |
| Utilitário    | `tap`                                                                    |
| Multicasting  | `share`                                                                  |

### O que faço com Observable? E onde entra Angular nessa história?

Vamos imaginar o consumo de uma web service, algo bem comum em aplicação Single Page, antes do Observable faríamos dessa maneira

```typescript
getUsers(): Promise<User[]>{
  return fetch(myApiUrl)
  .then(res=>res.json())
  .catch(err=>{
     throw new Error(err.message);  
   });
}
```

O código acima é bem simples, estamos buscando um recurso na api (Uma lista de usuários, neste caso) e após a resposta transformamos tudo em JSON.

Entretanto, o novo Angular foi construído pensando em aplicações reativas, abandonando o uso de Promises e adotando por padrão o Observable.

Usando Observable a mesma função ficaria da seguinte maneira:

```typescript
@Injectable()
class UserService {
 ...
 getUsers(): Observable<User[]> {
    return this.http.get(myApiUrl)
                    .map(res=>res.json())
                    .catch(err=> Observable.throw(err.message));
 } 
 ...
}
```

### Quais são as vantagens de usar Observable e não Promises?

A grande vantagem está nos *“poderes”* que o *Observable* nos dá com seus operadores, por exemplo: Podemos *“cancelar”* requests para poupar processamento, ou até mesmo tentar fazer uma nova requisição caso algum problema como perda de conexão aconteça.

## Operador Subscribe

Um dos operadores mais importantes do `Observable` é o `subscribe`, que é o equivalente ao `then` de uma *promise*.

```typescript
import { UserService } from 'user.service';
@Component({
  /* Propriedades do componente*/
})
class UserComponent {
  ...
  constructor(private userService: UserService){}
  private users: User[]; // Lista de usuários
  /* Neste método chamamos a função userService.getUsers, que nos retorna um Observable contendo um array de usuários, então atribuímos ao this.users */
  getUsers() {
    this.userService.getUsers()
                    .subscribe(
                      users => this.users = users,
                      error => /* Tratamos erros aqui :) */);
  }
  ...
}
```

Estamos chamando a função `getUsers()` criada anteriormente e deixamos um `subscribe` ali, ou seja, assim que a nossa resposta vier e for transformada em JSON, seremos notificados e o array users receberá a lista de usuários, ou caso seja um erro, tratamos o erro.

Um cenário ainda melhor seria uma aplicação que use **web sockets**, pois a cada atualização o subscribe iria atualizar o array users novamente, tudo de forma **unidirecional** e sem grande consumo de recursos.

> Se ainda assim você usa Angular em seu projeto e não quer utilizar `Observable` em tudo, existe o operador `toPromise()`
>
> ```typescript
>  lista(): Promisse<FotoComponent[]> {
>    return this.http.get(this.url)
>      .toPromisse()
>     .then(res => res.json())
>      .catch()
>  }
>  ```
>

## Operador Retry

Vamos supor que você está tentando fazer o download de um arquivo, mas está em uma conexão com muita oscilação, é de se esperar que o download falhe.

Nestes casos podemos utilizar o operador `retry`, que é extremamente simples e funciona da seguinte forma: Se a operação falhar, será executada novamente para tentar completá-la(a quantidade de tentativas é especificada como parâmetro do retry). No código ficaria algo parecido com isso:

```typescript
@Injectable()
class downloadFileService {
  ...
  downloadFile(attachment: Attachment)  {
    this.http
        .get(/*URL de download do arquivo*/, { responseType:   ResponseContentType.Blob })
        .retry(3) // Aqui especificamos que a quantidade de     tentativas caso o download falhe é 3.
        .map((response: any) => response.blob())
        /*Agora temos o arquivo e é só mandar para o usuário :)*/
        }, (err:any) => /*Tratamos erros aqui :)*/);
   }
  ...
}
```

## Operador switchMap

Este operador soluciona um dos problemas, que é termos de processar todas as respostas, mesmo mais antigas.

> Por exemplo: Se você pesquisou por Paulo, serão 5 requisições, uma para cada letra, você irá construir os objetos e substituir em seu array 5 vezes, é algo custoso.

O `switchMap` é um dos operadores que você irá usar e se orgulhar infinitamente. Se você fez 5 requisições, ele irá processar apenas a última delas, que é a que realmente importa para nós, construiremos nosso objeto uma vez e substituiremos o array somente uma vez. Seu uso é simples, assim como todos os operadores que vimos até agora.

```typescript
import { UserService } from 'user.service';
@Component({
  /*Propriedades do componente*/
})
class userComponent {
  ...
  constructor(private userService: UserService){}
  private users: User[]; // Nossa lista de usuários
  /*Variável que recebe o valor da função handleFilterChange*/
  private filterString: Subject<string> = new Subject<string>();
  /*Função que recebe o valor digitado e coloca em nosso Subject*/
  handleFilterChange(value: string) {
    this.filterString.next(value);
  }
  /*Fazemos um switchMap em nosso Subject filterString e atribuímos   o resultado à nossa lista de usuários*/
  ngOnInit() {
    this.users = this.filterString
        .switchMap(value => this.userService.getUsers(value))
        .catch(error => /*Tratamos erros aqui :)*/);
  }
  ...
}
```

Temos um pouco mais de código, mas nada muito complexo, a lógica é simples: No evento `keyup` da barra de pesquisa a função `handleFilterChange` é chamada e ela adiciona o valor ao Subject(que em tese, é uma versão bidirecional do Observable), após isso, temos no `ngOnInit` a variável users recebendo o resultado do `switchMap`, que busca os usuários filtrando com o valor passado. Sendo assim, quando digitarmos *“Paulo”*, apenas a última requisição será processada e terá seu valor atribuído à variável users, pois foi a última a ser enviada.

Mas ainda assim, podemos diminuir este número para apenas uma requisição, e poupar, além de processamento, consumo de dados!

## Operador debounceTime

Para chegar a apenas uma requisição é fácil, não precisamos buscar enquanto o usuário ainda não terminou de digitar, ou seja, se queremos buscar por *“Paulo”*, não há motivo para buscarmos somente a letra *“P”*, depois somente as letras *“Pa”*, e assim sucessivamente até completarmos a palavra.

É aí que entra o operador `debounceTime`, seu funcionamento não é nada complexo: Ele só executa uma ação caso tenha se passado uma certa quantidade de tempo desde a última execução desta ação.

> Por exemplo: Com um `debounceTime` de **300 milissegundos**, quando começarmos a digitar “Paulo”, começamos pela letra “P”, mas se logo em seguida digitarmos a próxima letra, que é “A”, ele não irá disparar outra requisição, pois ainda não se passaram 300 milissegundos desde a última vez em que você digitou uma letra.

Com o código que havíamos feito anteriormente ficaria assim:

```typescript
import { UserService } from 'user.service';
@Component({
  /*Propriedades do componente*/
})
class userComponent {
  ...
  constructor(private userService: UserService){}
  private users: User[]; // Nossa lista de usuários
  /*Variável que recebe o valor da função handleFilterChange*/
private filterString: Subject<string> = new Subject<string>();
  /*Função que recebe o valor digitado e coloca em nosso Subject*/
  handleFilterChange(value: string) {
    this.filterString.next(value);
  }
  /*Fazemos um switchMap em nosso Subject filterString e atribuímos o resultado à nossa lista de usuários, porém existe um debounceTime de 300 milissegundos para evitar fazer requisições enquanto o usuário ainda não finalizou a digitação*/
  ngOnInit() {
    this.users = this.filterString
        .debounceTime(300)
        .switchMap(value => this.userService.getUsers(value))
        .catch(error => /*Tratamos erros aqui :)*/);
  }
  ...
}
```

Com isso temos um componente de pesquisa sensacional, e com pouquíssimas linhas de código. Tudo com o poder do Observable!

Estes operadores são apenas alguns entre muitos que o Observable possui, com um pouco mais de leitura podemos aprender a utilizá-los e otimizar muito nossa aplicação, tornando-a não apenas mais rápida, mas também mais inteligente, ajudando o usuário a poupar processamento e dados(o que deve ser uma preocupação, principalmente pensando em aplicações que tendem a ser mais utilizadas em dispositivos móveis).

***Quanto mais reativa é a solução que você precisa, melhor é trabalhar com Observable***, isso quer dizer que se você está trabalhando com uma aplicação que funcione de forma assíncrona(onde a ordem de execução não é um fator denominante para o funcionamento, com Observable não existem operações blocantes) ou *realtime*, as vantagens crescem muito se compararmos o trabalho que teríamos utilizando `Promises`, por exemplo. O poder que o **RxJS** nos dá para trabalhar com múltiplos eventos de forma completamente assíncrona pode nos ajudar a construir aplicações muito mais consistentes e resilientes.

---

## Docs

- <https://rxjs.dev/guide/overview>
- <https://angular.io/guide/rx-library>
