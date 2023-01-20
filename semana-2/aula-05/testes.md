# Iniciando com teste de software

Teste de software é uma área da Engenharia de Software que envolve um conjunto de práticas para garantir a qualidade de software conforme requisitos e expectativas dos interessados, clientes ou desenvolvedores. Durante esse processo há geração de informação e conhecimento que permite entender o comportamento do software em situações simuladas ou com dados fictícios.

Uma forma de avaliar a qualidade do software utilizando teste de software é utilizar mecanismos que permitam identificar se o software está operando como esperado, fazendo o que deveria fazer.

## Testes com Angular

Ao criar o projeto com o Angular CLI, junto com o componente `AppComponent` também é criado o arquivo `src/app/app.component.spec.ts`. Esse arquivo *TypeScript* descreve testes utilizando:

- [**Jasmine**](https://jasmine.github.io/pages/getting_started.html). Por definição *Jasmine* é um framework de teste de software que segue a técnica **BDD (Behaviour Driven Development)**. Embora o Jasmine possa ser utilizado diretamente para testar JavaScript, o Angular utiliza duas outras tecnologias:
  - [**Karma**](https://karma-runner.github.io/1.0/index.html), uma ferramenta utilizada para executar os testes escritos em Jasmine (por definição, Karma é um test runner); e
  - [**Protractor**](https://karma-runner.github.io/1.0/index.html), um framework para testes end-to-end (e2e).

Então, um trecho do arquivo `src/app/app.component.spec.ts`:

```ts
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  ...
  
  it('should create the app', async(() => {
  ...
  }));
  it(`should have as title 'Angular'`, async(() => {
  ...
  }));
  it('should render title in a h1 tag', async(() => {
  ...
  }));
});
```

Testes escritos em Jasmine são chamados de `specs` e, por padrão, precisam estar em arquivos com nomes que terminem em `.spec.ts` (isso está definido no arquivo `src/tsconfig.spec.json`).

Depois das primeiras linhas com import há a primeira utilização de um recurso do Jasmine: a chamada do método describe(). Esse método cria uma suíte de testes (um grupo de testes). Os parâmetros para o método são:

- o nome da suíte de testes; e
- uma função que define suítes internas e specs.

No exemplo, o nome da suíte é `'AppComponent'` e a função que define as suítes internas e as specs está definindo três testes.

As specs (testes) são definidas por meio de uma chamada ao método `it()`. Esse método cria uma `spec`. Os parâmetros do método são:

- *o nome da spec* (na prática, uma descrição do que a spec está testando);
- *uma função* que descreve o código do teste; e
- um número que representa *o tempo limite de execução do teste* (timeout).

No caso do exemplo há três specs:

- `should create the app` (deveria criar o app -- ou o app deveria ser criado)
- `should have title as 'Angular'` (deveria ter o título como 'Angular' -- ou o título deveria ser 'Angular')
- `should render title in a h1 tag` (deveria renderizar o título em uma tag h1 -- ou o título deveria estar em uma tag h1)

Percebeu o *"should"* (deveria) no nome de cada spec? Isso faz parte da filosofia [BDD](https://pt.wikipedia.org/wiki/Behavior_Driven_Development) que indica que cada spec checa se as expectativas sobre o teste são válidas (passam) ou não (falham). Antes de ver mais detalhes, vamos testar o software. Execute o comando:

```bash
npm test
```

Esse comando executa o script "test" definido no arquivo `package.json`. Na prática, ele executa o comando `ng test`.

Dentro de instantes você deverá ver uma janela do browser mostrando algo semelhante ao da figura a seguir.

![Janela do browser demonstrando o resultado dos testes iniciais](https://jacksongomesbr.gitbooks.io/desenvolvimento-web-front-end-com-angular/content/assets/primeiro-teste-browser-inicial.png)

Note que a URL do browser é `http://localhost:9876`. Essa é a URL padrão que apresenta os resultados do teste do software. A tela apresenta várias informações importantes:

- versão do sistema operacional
- versão do browser
- versão do Karma
- versão do Jasmine
- tempo total de execução dos testes
- quantidade de specs
- quantidade de falhas

Além disso a tela apresenta o próprio componente (`AppComponent`) em execução. Ainda, também há informações no prompt. Você deveria ver algo como o seguinte:

![cmd](https://www.palador.com/wp-content/uploads/2017/10/Running-tests-using-NPM-script-ol-2.png)

Ok, agora vamos a detalhes dos testes mas, antes de ver cada teste individualmente, o segundo parâmetro do método `describe()` chama o método `beforeEach()`, que é utilizada para realizar uma espécie de setup dos testes, executando um código antes deles:

```ts
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  ...
});
```

Por vezes é necessário realizar certas atividades antes de um teste (como por exemplo criar um objeto) designadas setup, e outras depois do teste, designadas teardown.

Funções Jasmine para setup e teardown:

- **beforeAll** – função invocada uma vez antes de todos os specs do test suite describe
correrem.
- **afterAll** – função invocada uma vez depois de todos os specs do test suite describe
correrem.
- **beforeEach** – função invocada antes de cada test specification, função it, correr.
- **afterEach** - função invocada depois de cada test specification, função it, correr.

A classe `TestBed` é um utilitário do Angular para testes de software. Seu método `configureTestingModule()` cria um módulo específico para executar os testes que serão descritos a seguir. Pense nisso como um módulo mais enxuto que os utilizados no restante do software, voltando apenas para esses testes. Por isso você deveria entender que o parâmetro fornecido para o método é muito similar aos metadados de um módulo e, nesse caso, indicam os componentes do módulo (atributo `declarations`). Portanto, o setup permite que cada teste utilize o componente `AppComponent`.

## Primeiro teste

O trecho de código a seguir apresenta o primeiro teste.

```ts
it('should create the app', async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app).toBeTruthy();
}));
```

Esse primeiro teste verifica se foi possível criar uma instância do componente AppComponent, o que é feito por meio de uma sequência de passos:

1. **criar uma instância** de `AppComponent`: isso é feito por meio do método `TestBed.createComponent()` (armazenado na variável `fixture`, se referindo a um *artefato* ou *componente*) que retorna uma instância de `ComponentFixture`, referência ao ambiente de execução dos testes. Este mesmo dá acesso ao `DebugElement`, que representa o elemento do *DOM* que representa o componente
2. **acessa a instância do componente** (`fixture.debugElement.componentInstance`), armazenada na variável `app`;
3. **criar uma expectativa para o teste**. Uma expectativa é criada por meio do método `expect()`. Uma expectativa representa o comportamento esperado do software: que `app` (uma instância do `AppComponent`) não seja null. O parâmetro de expect() indica a expressão que será analisada, comparada, com outra expressão ou valor. Nesse caso a comparação é realizada por meio do método `toBeTruthy()`. Se a expectativa não for satisfeita o teste falhará. Isso seria o comportamento obtido, por exemplo, por causa de um erro de tempo de execução *(runtime)*.

Neste ultimo ponto, use-se um **Matcher** para fazer uma comparação booleana
entre o valor esperado e o resultado do primeiro argumento da função `expect`.

Matchers built-in:

```ts
expect(array).toContain(member);
expect(fn).toThrow(string);
expect(fn).toThrowError(string);
expect(instance).toBe(instance);
expect(mixed).toBeDefined();
expect(mixed).toBeFalsy();
expect(mixed).toBeNull();
expect(mixed).toBeTruthy();
expect(mixed).toBeUndefined();
expect(mixed).toEqual(mixed);
expect(mixed).toMatch(pattern);
expect(number).toBeCloseTo(number, decimalPlaces);
expect(number).toBeGreaterThan(number);
expect(number).toBeLessThan(number);
expect(number).toBeNaN();
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(number);
expect(spy).toHaveBeenCalledWith(...arguments);
```

## Segundo teste

O trecho de código a seguir apresenta o segundo teste.

```ts
it(`should have as title 'Angular'`, async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app.title).toEqual('Angular');
}));
```

A sequência de passos é semelhante à do primeiro teste. A diferença está na expectativa: o teste deseja verificar se o atributo `title` da instância do `AppComponent` (`app`) tem valor igual a `'Angular'`. Novamente, a expectativa é criada por meio do método `expect()`. Dessa vez a comparação entre o valor esperado (`app.title`) e o valor obtido (`'Angular'`) é feita por meio do método `toEqual()`.

Com isso aprendemos que é possível testar membros de um componente (atributos e métodos), o que é muito valioso.

## Terceiro teste

O trecho de código a seguir apresenta o terceiro teste.

```ts
it('should render title in a h1 tag', async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular!');
}));
```

Em relação aos testes anteriores a sequência de passos inclui uma chamada ao método `ComponentFixture.detectChanges()`. Como o Angular utiliza, muito, o recurso **data binding**, esse recurso faz com que o valor do atributo `title` seja apresentado no Template. Para checar se esse é o comportamento obtido é necessário, primeiro, identificar que ocorreu *data binding*. Uma forma de fazer isso é usando o método `detectChanges()`.

Outra diferença é que o teste lida com o DOM depois de ter sido transformado pelo Angular, ou seja, na prática, em como o usuário está vendo o componente no momento. Por causa disso não é utilizada uma instância do componente, mas uma referência ao DOM compilado (o elemento DOM na raiz do componente, na verdade). Isso é feito por meio de `fixture.debugElement.nativeElement` (armazenado na variável `compiled`).

Por fim, a expectativa é um pouco mais complexa, pois envolve lidar com o DOM. Para isso ocorre o seguinte:

1. encontrar o elemento h1 no DOM: isso é feito por meio do método `querySelector()`;
2. comparar o conteúdo textual do elemento `h1` com a string `'Welcome to Angular!'`: isso é feito por meio de uma expectativa sobre o valor do atributo `textConent` do objeto que representa o elemento `h1` conter a string desejada, comparação implementada pelo método `toContain()`.

## You shall not pass! Ou provocando uma falha nos testes

Suponha que você modifique o valor do atributo `title` do AppComponent para `'Web'`. O que os testes diriam? Se os testes ainda estiverem em execução, apenas observe a janela do browser que mostra o resultado dos testes (ilustrada pela figura a seguir).

![You shall not pass!](https://jacksongomesbr.gitbooks.io/desenvolvimento-web-front-end-com-angular/content/assets/primeiro-teste-com-falha.png)

A saída dos testes mostra claramente que algo errado aconteceu: dos três testes, dois falharam. A saída indica cada teste que falhou (detalhe em vermelho):

- o segundo teste falhou porque a string `'Web`' não igual a `'Angular'`; e
- o terceiro teste falhou porque a string `'Welcome to Web!'` não contém `'Welcome to Angular!'`.

Percebeu que os testes são executados novamente sempre que há uma mudança no código do software? Esse é o comportamento padrão, mas se você precisar desligá-lo precisará de uma mudança no arquivo `package.json`, modificando o script de teste de (`ng test`):

```bash
...
"scripts": {
...
  "test": "ng test",
...
},
...
```

Mude para (`ng test --single-run`):

## Usando a CLI do Angular

### ng test

Muitos comandos do Angular CLI geram um arquivo com a extensão `.spec.ts`. Esses são os arquivos de teste de seu projeto e você pode usar o CLI para executar todos eles e verificar se algum bug foi criado.

Exemplo de uso:

```bash
ng test
```

Para esse comando podemos especificar os parâmetros.

`--watch`

Recria um build que está sendo testado quando encontrar mudanças no código.

`--code-coverage`

Define se deve criar o relatório de cobertura dentro do diretório coverage/. Valor padrão: false.

`--config <string>`

Informar o arquivo de configuração. O padrão é o arquivo do Karma definido no `angular-cli.json`.

`--single-run`

Executar os testes apenas uma vez.

`--progress`

Exibir o progresso no console.

`--browsers <string>`

Informar quais navegadores serão usados para realizar os testes.

`--colors`

Habilita o uso de cores no resultado dos testes.

`--log-level <string>`

Definir o nível de log.

`--port <string>`

Definir a porta que deve ser usada no servidor.

`--reporters <string>`

Informar a lista de reporters que devem ser usados nos testes.

`--sourcemaps`

Criar arquivos de source map (`.map`).

`--poll <number>`

Define o período, em milissegundos, que será usado para verificar se ocorreram mudanças no projeto.

`--app <string>`

É possível definir várias aplicações no arquivo angular-cli.json contendo diferentes configurações. Este parâmetro especifica para qual dessas aplicações o teste deve ser criado. Por padrão, é a primeira aplicação informada no arquivo angular-cli.json.

### ng e2e

O termo **e2e** em *JavaScript* é utilizado para referenciar os testes do tipo *End to End*. Na estrutura de pastas fornecida pelo Angular CLI, esses testes encontram-se no diretório `/e2e` e é possível executá-los utilizando o comando do exemplo abaixo.

Exemplo de uso:

```bash
ng e2e
```

O comando ng e2e pode receber parâmetros, e os principais estão detalhados abaixo.

`--target <string>`

Define qual tipo de build deve ser gerado: (development, production). Valor padrão: development.

`--environment`

Define qual dos ambientes definidos em /src/environments deve ser usado na geração do build.

`--aot`

Criar o build usando compilação AOT (Ahead of Time), ao invés de JIT (Just in Time). Esta opção melhora o desempenho, pois todos artefatos são previamente compilados para Javascript.

`--sourcemaps`

Criar arquivos de source map (arquivos com extensão .map).

`--base-href <string> *`

Altera a tag base-href no arquivo index.html para o valor informado.

`--deploy-url <string> *`

URL na qual a aplicação será implantada.

`--verbose`

Exibe mais informações sobre a execução do comando.

`--i18n-file <string>`

Informar onde se encontra o arquivo de internacionalização (i18n).

`--i18n-format <string>`

Informar qual o formato que se encontra o arquivo de internacionalização indicado no comando --i18n-file.

`--locale <string>`

Informar qual locale deve ser usado para internacionalização.

`--extract-css`

Por padrão, o Angular compila os estilos dentro de arquivos JS. Este parâmetro informa que esses estilos devem ser colocados dentro de arquivos CSS.

`--watch`

Recriar o build quando forem encontradas mudanças. Valor padrão: true.

`--poll <number>`

Define o período, em milissegundos, que será usado para verificar se ocorreram mudanças no projeto.

`-app <string>`

Define qual das aplicações definidas no arquivo angular-cli.json deve ser usada para ser disponibilizada no servidor.

`--port <number>`

Define qual porta o servidor escutará. Valor padrão: 4200.

`--host <string>`

Por padrão, o servidor é acessível apenas na própria máquina onde está sendo executado. Com este comando é possível informar que ele pode ser acessado através de outras interfaces de rede.

`--ssl`

Iniciar o servidor com suporte a SSL (HTTPS).

`--ssl-key <string>`

Informar a chave privada para usar nas conexões SSL.

`--ssl-cert <string>`

Caminho para o certificado para ser usado nas conexões SSL.

`--open`

Abrir o navegador apontando para o endereço do servidor.

`--live-reload`

Informa se deve recarregar a aplicação no navegador sempre que forem encontradas mudanças no projeto.

`--specs <array>`

Sobrescreve os specs do arquivo de configuração do Protractor. É possível enviar múltiplos specs repetindo este parâmetro: --specs=spec1.ts --specs=spec2.ts.

`--element-explorer`

Inicia o Element Explorer do Protractor para fazer debug.

`--serve`

Compila e serve a aplicação. Ao utilizar este comando, todos os parâmetros usados com ng serve também estarão disponíveis.

---

## Docs

- <https://jasmine.github.io/tutorials/your_first_suite>
- <https://imasters.com.br/front-end/jasmine-entendendo-os-matchers>
- <https://mjsjunior.medium.com/testes-unit%C3%A1rios-em-sua-aplica%C3%A7%C3%A3o-angular-7838487c6bd3>
- <https://mjsjunior.medium.com/testando-services-e-requisi%C3%A7%C3%B5es-http-em-aplica%C3%A7%C3%B5es-angular-50f7051cae72>
- <https://vidafullstack.com.br/angular/introducao-aos-testes-unitarios-com-angular/>
