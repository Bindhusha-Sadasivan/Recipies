import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse } from './interfaces/authResponcse.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(email:string, password:string):any{
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABNkTVMJuGL04SzxkoX92MgnIGHpTPTU0',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    ).pipe(catchError (this.handleError))
  }

  login(email:string, password:string):any{
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABNkTVMJuGL04SzxkoX92MgnIGHpTPTU0',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    ).pipe(catchError (this.handleError))
  }

  private handleError(error:HttpErrorResponse){
    let errorMessage = "An unknown error occurred!!!";
    if (!error.error || !error.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
          errorMessage = "The email address is already in use by another account.!!!";
          break;
      case 'OPERATION_NOT_ALLOWED:':
          errorMessage = "Password sign-in is disabled for this project.!!!";
          break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER:':
          errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.!!!";
          break;
      case 'EMAIL_NOT_FOUND':
            errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.!!!";
            break;
      case 'INVALID_PASSWORD':
            errorMessage = "The password is invalid or the user does not have a password.!!!";
            break;
      case 'USER_DISABLED':
            errorMessage = "The user account has been disabled by an administrator.!!!";
            break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
