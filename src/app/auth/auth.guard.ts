import { AuthService } from './../service/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject the AuthService
  const router = inject(Router)

  if(authService.isAuthenticated()){
    return true;
  }else {
    router.navigate(['login']) //sempre que não se autenticar(fizer login) será redirecionado par a tela de login
    return false
  }
};
