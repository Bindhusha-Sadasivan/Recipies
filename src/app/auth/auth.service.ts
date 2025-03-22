import { HttpClient } from '@angular/common/http';
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
    ).pipe(catchError ( error => {
      let errorMessage = "An unknown error occurred!!!";
      if (!error.error || !error.error.error) {
        return throwError(() => new Error(errorMessage));
      }
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "This email already exists!!!";
          break;
      }
      return throwError(() => new Error(errorMessage));
    }))

  }
}
