import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-delete',
  standalone: true,
  imports: [MatCheckbox,
    FormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    ],
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.scss'
})
export class ClienteDeleteComponent  implements OnInit{

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfil: [],
    dataCriacao: '',
  };

  ngOnInit(): void {
      this.cliente.id = this.rotaId.snapshot.paramMap.get('id') //pega o id que está na URL no navegador
      this.findById()
  }

  constructor(private service: ClienteService, private post: ToastrService, private router: Router, private rotaId: ActivatedRoute) {}


  findById(){
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      resposta.perfil = []
      this.cliente = resposta
    })
  }
  deleteCliente() {
    this.service.delete(this.cliente).subscribe(
      () => {
        this.post.success('Cliente atualizado com sucesso', 'Atualizado');
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

}
