import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Credenciais } from '../../models/credenciais';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatLabel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule, // Adicionando o ToastrModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private toast: ToastrService) {
    console.log('ToastrService:', this.toast);
  }
 
  creds: Credenciais = {
    email: '',
    senha: '',
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  logar() {
    this.toast.error('Usuário e/ou senha inválidos!', 'Login', {
      enableHtml: true,
    });

  }
  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    }
    return false;
  }
}
