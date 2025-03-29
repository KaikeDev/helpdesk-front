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
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';

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
    NgxMaskDirective,
  ],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.scss',
})
export class TecnicoCreateComponent {
  tecnico: Tecnico = {
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

  constructor(private service: TecnicoService, private post: ToastrService, private router: Router) {}

  createTecnico() {
    this.service.create(this.tecnico).subscribe(
      () => {
        this.post.success('Técnico cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['tecnicos'])
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
     if(this.tecnico.perfil.includes(perfil)){
      this.tecnico.perfil.splice(this.tecnico.perfil.indexOf(perfil), 1)
      console.log(this.tecnico.perfil)
     }else{
      this.tecnico.perfil.push(perfil)
      console.log(this.tecnico.perfil)


     }
  }
  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
