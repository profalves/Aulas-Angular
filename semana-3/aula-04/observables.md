# RxJS Observable com Angular

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

## Concluindo

***Quanto mais reativa é a solução que você precisa, melhor é trabalhar com Observable***, isso quer dizer que se você está trabalhando com uma aplicação que funcione de forma assíncrona(onde a ordem de execução não é um fator denominante para o funcionamento, com Observable não existem operações blocantes) ou *realtime*, as vantagens crescem muito se compararmos o trabalho que teríamos utilizando `Promises`, por exemplo. O poder que o **RxJS** nos dá para trabalhar com múltiplos eventos de forma completamente assíncrona pode nos ajudar a construir aplicações muito mais consistentes e resilientes.

---

## Docs

- <https://rxjs.dev/guide/overview>
- <https://angular.io/guide/rx-library>
- <https://www.tektutorialshub.com/angular/using-switchmap-in-angular/>
- <https://www.digitalocean.com/community/tutorials/angular-takeuntil-rxjs-unsubscribe>
