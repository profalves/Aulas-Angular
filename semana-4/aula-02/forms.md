# Angular Reactive Forms

Os **Reactive forms** (formulários reativos) fornecem uma abordagem baseada em um modelo para lidar com entradas de formulário cujos valores mudam ao longo do tempo.

Os formulários reativos usam uma abordagem explícita e imutável para gerenciar o estado de um formulário em um determinado momento. *Cada alteração no **estado do formulário** retorna um novo estado, que mantém a integridade do modelo entre as alterações*. Formulários reativos são construídos em torno de fluxos observáveis, onde entradas e valores de formulário são fornecidos como fluxos de valores de entrada, que podem ser acessados ​​de forma síncrona.

Os formulários reativos também fornecem um caminho direto para o teste porque você tem certeza de que seus dados são consistentes e previsíveis quando solicitados. Quaisquer consumidores dos fluxos têm acesso para manipular esses dados com segurança.

Os formulários reativos diferem dos formulários baseados em modelos de maneiras distintas. Os formulários reativos fornecem acesso síncrono ao modelo de dados, imutabilidade com operadores observáveis ​​e controle de alterações por meio de fluxos observáveis.

## Como usar

1. Instale o pacote `@angular/forms` utilizando o comando `npm install @angular/forms`.
2. Importe o módulo `ReactiveFormsModule` no módulo da aplicação.
3. No componente, importe o `FormBuilder` e o `Validators` do pacote `@angular/forms`.
4. Injeta o FormBuilder via construtor da classe `constructor(private formBuilder: FormBuilder) { ... }`
5. Crie uma variável para armazenar o formulário reativo usando `formBuilder.group({})` e configure os campos e validações necessárias.
6. Adicione o formulário ao template HTML usando a diretiva `[formGroup]` e os controles de formulário (`input`, `select`, etc) com a diretiva `formControlName`.
7. Trabalhe com os dados do formulário em seu componente, como acessar e atualizar valores, verificar validação, etc.

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

...

export class MeuFormularioComponent {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarDados() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }
}
```

No html do componente fica assim:

```html
<form [formGroup]="formulario">
  <div>
    <label>Nome:</label>
    <input type="text" formControlName="nome">
  </div>
  <div>
    <label>Email:</label>
    <input type="email" formControlName="email">
  </div>
  <button (click)="enviarDados()">Enviar</button>
</form>
```

## Validações de campos no formulário

`Validators` são funções que verificam se o valor de um campo de formulário é válido ou não. O Angular fornece uma série de validadores pré-definidos, como `required`, `email`, `minLength`, `maxLength`, etc, que podem ser usados ​​com o método `Validators.validatorName`. Também é possível criar validadores personalizados.

Para aplicar validadores em um campo de formulário, basta passá-los como um array de funções de validação na configuração do grupo de formulário.

```typescript
this.formulario = this.formBuilder.group({
  nome: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]]
});
```

Neste exemplo, o campo `nome` é obrigatório e o campo `email` deve ser preenchido com um endereço de email válido.

Para verificar se o formulário inteiro é válido ou não, você pode usar a propriedade `valid` do objeto FormGroup. Para obter a lista de erros de validação, você pode usar a propriedade `errors`.

Exemplo:

```typescript
if (this.formulario.valid) {
  console.log('Formulário válido');
} else {
  console.log('Erros de validação: ', this.formulario.errors);
}
```

## Validação personalizada

Você pode incluir um campo de validação de CEP adicionando uma nova propriedade para o seu formulário e aplicando uma validação personalizada para o campo de CEP.

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

...

export class MeuFormularioComponent {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, this.validarCEP]]
    });
  }

  validarCEP(control: AbstractControl) {
    const cep = control.value;
    if (cep && cep.length !== 8) {
      return { cepInvalido: true };
    }
    return null;
  }

  enviarDados() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }
}
```

```html
<form [formGroup]="formulario">
  <div>
    <label>Nome:</label>
    <input type="text" formControlName="nome">
  </div>
  <div>
    <label>Email:</label>
    <input type="email" formControlName="email">
  </div>
  <div>
    <label>CEP:</label>
    <input type="text" formControlName="cep">
  </div>
  <button (click)="enviarDados()">Enviar</button>
</form>
```

Neste exemplo, o campo de CEP é obrigatório e deve ter exatamente 8 dígitos. Se a validação falhar, a chave "cepInvalido" será adicionada à lista de erros do formulário.

---

## Docs

- <https://angular.io/guide/reactive-forms>
- <https://angular.io/guide/form-validation>
