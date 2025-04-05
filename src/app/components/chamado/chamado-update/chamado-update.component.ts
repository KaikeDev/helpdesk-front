import { ChamadoService } from './../../../services/chamado.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Chamado } from '../../../models/chamado';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chamado-update',
  standalone: true,
  imports: [   MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatSelectModule,
    MatInputModule,
    NgFor,],
  templateUrl: './chamado-update.component.html',
  styleUrl: './chamado-update.component.scss'
})
export class ChamadoUpdateComponent implements OnInit{

  chamado: Chamado = {
      prioridade: '',
      status: '',
      titulo: '',
      observacoes: '',
      tecnico: '',
      cliente: '',
      nomeCliente: '',
      nomeTecnico: '',
    };

    clientes: Cliente[] = [];
    tecnicos: Tecnico[] = [];

    prioridade: FormControl = new FormControl(null, [Validators.required]);
    status: FormControl = new FormControl(null, [Validators.required]);
    titulo: FormControl = new FormControl(null, [Validators.required]);
    observacoes: FormControl = new FormControl(null, [Validators.required]);
    tecnico: FormControl = new FormControl(null, [Validators.required]);
    cliente: FormControl = new FormControl(null, [Validators.required]);

    constructor(
      private chamadoService: ChamadoService,
      private clienteService: ClienteService,
      private tecnicoService: TecnicoService,
      private toast: ToastrService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.chamado.id =   this.route.snapshot.paramMap.get('id')
      this.findById()
      this.findAllClientes();
      this.findAllTecnicos();
    }

    findById(){
      this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
        this.chamado = resposta
      }, ex =>{
        this.toast.error(ex.error)
      })
    }

    update() {
      this.chamadoService.update(this.chamado).subscribe((resposta) => {
        this.toast.success('Chamado atualizado com sucesso', 'Atualizar chamado')
        this.router.navigate(['chamados'])
      }, ex =>{
        this.toast.error(ex.error)
      }
      );
    }

    findAllClientes() {
      this.clienteService.findAll().subscribe((resposta) => {
        this.clientes = resposta;
      });
    }

    findAllTecnicos() {
      this.tecnicoService.findAll().subscribe((resposta) => {
        this.tecnicos = resposta;
      });
    }

    retornaStatus(status: any): string {
      if(status == '0') {
        return 'ABERTO'
      } else if(status == '1') {
        return 'EM ANDAMENTO'
      } else {
        return 'ENCERRADO'
      }
    }

    retornaPrioridade(prioridade: any): string {
      if(prioridade == '0') {
        return 'BAIXA'
      } else if(prioridade == '1') {
        return 'MÉDIA'
      } else {
        return 'ALTA'
      }
    }

    validaCampos(): boolean {
      return (
        this.prioridade.valid &&
        this.status.valid &&
        this.titulo.valid &&
        this.observacoes.valid &&
        this.tecnico.valid &&
        this.cliente.valid
      );
    }


}
