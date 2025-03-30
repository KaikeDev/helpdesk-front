import { Component, OnInit } from '@angular/core';
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
  selector: 'app-cliente-update',
  standalone: true,
  imports: [  MatCheckbox,
    FormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective,],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.scss'
})
export class ClienteUpdateComponent implements OnInit{
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
  updateCliente() {
    this.service.update(this.cliente).subscribe(
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
