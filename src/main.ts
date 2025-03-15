import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig, // Espalha as propriedades do appConfig aqui
  providers: [
    ...appConfig.providers, // Mantém os outros providers do app
    provideAnimations(),
    provideToastr({ timeOut: 4000, closeButton: true }) // Configuração do Toastr
  ]
}).catch((err) => console.error(err));
