import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';

import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatSidenavModule, MatNavList, MatIcon, RouterOutlet, HeaderComponent, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toast: ToastrService){}

  // Faz ele sempre iniciar no /HOME
  ngOnInit(): void {
    if (this.router.url === '/') {
      this.router.navigate(['home']);
    }
  }

  logout(){
    this.router.navigate(['login'])
    this.authService.logout()
    this.toast.info('Logout realizado com sucesso', 'Logout', {timeOut: 7000})
  }

}
