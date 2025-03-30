import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Chamado } from '../../../models/chamado';
import { MatRadioButton } from '@angular/material/radio';

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
    MatRadioButton
  ],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.scss',
})
export class ChamadoListComponent {
  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      dataAbertura: '30/03/2025',
      dataFechamento: '30/03/2025',
      prioridade: 'ALTA',
      status: 'ANDAMENTO',
      titulo: 'Chamado 1',
      observacoes: 'Teste chamado',
      tecnico: 1,
      cliente: 6,
      nomeCliente: 'Kaike Tuerpe',
      nomeTecnico: 'Lucas'
    },
  ];

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
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
