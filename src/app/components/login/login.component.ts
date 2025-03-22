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
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

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
  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  creds: Credenciais = {
    email: '',
    senha: '',
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  logar() {
    this.service.authenticate(this.creds).subscribe(
      (resposta) => {
        const authorization = resposta.headers.get('Authorization');
        if (authorization) {
          this.service.successfulLogin(authorization.substring(7));
          this.router.navigate(['']);
        }
      },
      (erro) => {
        if (erro.error) {
        }
        this.toast.error('Usuário ou senha inválidos');
      }
    );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
