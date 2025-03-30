import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-create',
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
    NgxMaskDirective,
  ],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.scss',
})
export class ClienteCreateComponent {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfil: [],
    dataCriacao: '',
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private service: ClienteService, private post: ToastrService, private router: Router) {}

  createCliente() {
    this.service.create(this.cliente).subscribe(
      () => {
        this.post.success('Cliente cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['clientes'])
      },
      (ex) => {
        if(ex.error.errors){
          ex.error.errors.forEach((element: { message: string }) => {
            this.post.error(element.message)
          });
        }else{
          this.post.error(ex.error.message)
        }

      }
    );
  }



  addPerfil(perfil: any): void {

     // para não adicionar mais de uma vez o mesmo perfil
     if(this.cliente.perfil.includes(perfil)){
      this.cliente.perfil.splice(this.cliente.perfil.indexOf(perfil), 1)
      console.log(this.cliente.perfil)
     }else{
      this.cliente.perfil.push(perfil)
      console.log(this.cliente.perfil)


     }
  }
  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
