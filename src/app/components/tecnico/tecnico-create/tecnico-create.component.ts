import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [
    MatCheckbox,
    FormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective

  ],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.scss',
})
export class TecnicoCreateComponent {
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
