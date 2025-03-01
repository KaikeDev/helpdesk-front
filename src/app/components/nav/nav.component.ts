import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';

import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatSidenavModule, MatNavList, MatIcon],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
