import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tecnico } from '../../../models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [MatPaginator, MatTableModule],
  templateUrl: './tecnico-list.component.html',
  styleUrl: './tecnico-list.component.scss'
})
export class TecnicoListComponent implements AfterViewInit{

  ELEMENT_DATA:Tecnico[] = [
    {
      id: 1,
      nome: 'Kaike Tuerpe',
      cpf: '112.030.345-98',
      email: 'kaike@gmail.com',
      senha: '1234',
      perfil: ['0'],
      dataCriacao: '03/03/2025'
    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
