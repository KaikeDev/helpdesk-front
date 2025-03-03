import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [{ path: 'home', component: HomeComponent }], // rota filho do componente nav, renderiza o nav e o home quando entrar na url home
  },
];
