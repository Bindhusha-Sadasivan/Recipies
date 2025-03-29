import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap, of } from 'rxjs';
import { AuthService } from '../../auth.service';
import { User } from '../user/user.model';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  // Get current user (functional approach)
  return authService.user.pipe(
    switchMap((user:User|any) => {
      if (!user) {
        return next(req);
      }

      // Clone request with auth token
      const modifiedReq = req.clone({
        params: req.params.append('auth', user.token)
      });

      return next(modifiedReq);
    })
  );
};

// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { exhaustMap, Observable, take } from 'rxjs';
// import { AuthService } from '../../auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService implements HttpInterceptor{

//   constructor(private authService:AuthService) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return this.authService.user.pipe(
//       take(1),
//       exhaustMap((user:any) => {
//         if(!user){
//           return next.handle(req);
//         }
//         const modifiedReq = req.clone({
//           params: req.params.append('auth', user.token)
//         })
//         return next.handle(modifiedReq);
//       })

//     )
//   }
// }


