import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  constructor(private formBuilder: FormBuilder) { }

  formulario: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    cep: ['', this.validarCep]
  })

  validarCep(control: AbstractControl) {
    const cep = control.value;
    return cep && cep.length !== 8 ? { cepInvalid: true } : null;
  }

  enviar() {
    if (this.formulario.valid)
      console.log('Formulario: ', this.formulario.value);

  }

}
