import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { AuthInterceptorProvider } from '../../../interceptors/auth.interceptor';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  providers: [AuthInterceptorProvider],
  imports: [MatPaginator, MatTableModule, MatFormField, MatLabel, FormsModule, MatInput, RouterLink],
  templateUrl: './tecnico-list.component.html',
  styleUrl: './tecnico-list.component.scss',
})
export class TecnicoListComponent implements OnInit {
  constructor(private service: TecnicoService) {}

  ELEMENT_DATA: Tecnico[] = [];

  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta; // pega a resposta do findAll(que está no service) e coloca dentro do array elemente_data
      this.dataSource = new MatTableDataSource<Tecnico>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  // FILTRO DE BUSCA DA TABELA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
