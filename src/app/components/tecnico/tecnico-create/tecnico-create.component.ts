import { Component,  } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  imports: [MatCheckbox, FormsModule, MatFormField, MatLabel, MatIcon, FormsModule, MatInputModule],
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.scss'
})
export class TecnicoCreateComponent {

}
