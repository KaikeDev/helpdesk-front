import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-delete',
  standalone: true,
  imports: [MatCheckbox,
    FormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective,],
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.scss'
})
export class TecnicoDeleteComponent  implements OnInit{

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfil: [],
    dataCriacao: '',
  };

  ngOnInit(): void {
      this.tecnico.id = this.rotaId.snapshot.paramMap.get('id') //pega o id que está na URL no navegador
      this.findById()
  }

  constructor(private service: TecnicoService, private post: ToastrService, private router: Router, private rotaId: ActivatedRoute) {}


  findById(){
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfil = []
      this.tecnico = resposta
    })
  }
  deleteTecnico() {
    this.service.delete(this.tecnico).subscribe(
      () => {
        this.post.success('Técnico atualizado com sucesso', 'Atualizado');
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

}
