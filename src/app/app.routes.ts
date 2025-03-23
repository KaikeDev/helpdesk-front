import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: NavComponent, canActivate: [authGuard], //  com o canActivate ele não deixa acessar as rotas filha sem acessar o NAV primeiro
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redireciona para home
      { path: 'home', component: HomeComponent },
      { path: 'tecnicos', component: TecnicoListComponent },
      {path: 'tecnicos/create', component: TecnicoCreateComponent}
    ],
  },
];
