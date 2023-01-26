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

@ViewChild('my-element', { static: true }) el!: ElementRef;

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

---

## Docs

- <https://rxjs.dev/guide/overview>
- <https://angular.io/guide/rx-library>
