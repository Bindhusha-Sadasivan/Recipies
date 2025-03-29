import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../../auth.service";
import { map, Observable, take, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree {

    //Method 1: Using localStorage to check if user is logged in
  //   const user = localStorage.getItem('userData');  // Check if user is logged in
  //   if (user) {

  //     return true;  // Allow access to the route
  //   }
  //   else {

  //     alert("Please login to access this page"); // Show alert if not logged in
  //     return false;  // Deny access to the route
  //   }
  // }

  //method 2: Using AuthService to check if user is logged in
    // this.authService.user.subscribe(user => {
    //   if (user) {
    //     return true;  // Allow access to the route
    //   } else {
    //     alert("Please login to access this page"); // Show alert if not logged in
    //     return false;  // Deny access to the route
    //   }
    // });
  //   return false;  // Deny access to the route by default

  // }

    //Method 3: Using AuthService to check if user is logged in with async pipe

    // return this.authService.user.pipe(map(user => { return !!user; }));

    // return this.authService.user.pipe(
    //   map(user => {
    //     return !!user; // Check if user is logged in
    //   }),
    //     tap(isAuth => {
    //     if(!isAuth) {
    //       // console.log(isAuth);
    //       this.router.navigate(['/recipies']); // Redirect to the recipies page if logged in

    //     }
    //   })
    // );

    // return this.authService.user.pipe(
    //   take(1),
    //   map(user => {
    //     const isAuth = !!user; // Check if user is logged in
    //     if (isAuth) {
    //       return true;  // Allow access to the route
    //     } else {
    //       alert("Please login to access this page"); // Show alert if not logged in
    //       return false;  // Deny access to the route
    //     }
    //   })
    // );

  return this.authService.user.pipe(
    map(user => {
      const isAuth = !!user; // Check if user is logged in
      if (isAuth) {
        return true as boolean;  // Allow access to the route
      }
      return this.router.createUrlTree(['/auth']); // Redirect to the auth page if not logged in
    })
  );
}
}
























// import { CanActivateFn } from '@angular/router';
import { routes } from '../../../app.routes';

// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };
