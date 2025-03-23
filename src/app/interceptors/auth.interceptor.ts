
import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token')
  let proximo = inject(HttpHandler)

  if(token ){

    const cloneReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)}) // para pegar o token no header do authorization do backend
    return proximo.handle(cloneReq)
  }else{
    return proximo.handle(req)
  }
};

export const  AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor,
    multi: true
  }
]
