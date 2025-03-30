import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Chamado } from '../../../models/chamado';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  standalone: true,
  imports: [
    MatPaginator,
    MatTableModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    RouterLink,
    MatIcon,
    MatRadioGroup,
    MatRadioButton,
  ],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.scss',
})
export class ChamadoListComponent implements OnInit {
  ELEMENT_DATA: Chamado[] = [];

  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = [
    'id',
    'titulo',
    'cliente',
    'tecnico',
    'dataAbertura',
    'prioridade',
    'status',
    'acoes',
  ];

  constructor(private service: ChamadoService) {}
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta; // passa o que vier do FINDALL para o ELEMENT_DATA
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator
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

  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach((element) => {
      if (element.status == status) list.push(element);
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
