import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponse } from './interfaces/authResponcse.interface';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './auth/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user = new Subject<User>();
  user = new BehaviorSubject<User | null>(null);
  token:any = null;
  private tokenExpirationTimer:any = null; //to store the timer for auto logout

  constructor(private http:HttpClient) { }

  signup(email:string, password:string):any{
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABNkTVMJuGL04SzxkoX92MgnIGHpTPTU0',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    ).pipe(catchError (this.handleError),
      tap(response =>{
        // const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
        // const user = new User(response.email, response.localId, response.idToken, expDate);
        // this.user.next(user);
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
      })
          )
  }

  login(email:string, password:string):any{
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABNkTVMJuGL04SzxkoX92MgnIGHpTPTU0',
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    ).pipe(catchError (this.handleError),
    //tap -> allows us to perform some actions without changing the response
      tap(response =>{
        // const expDate = new Date(new Date().getTime() + +response.expiresIn*1000)
        // const user = new User(response.email, response.localId, response.idToken, expDate);
        // this.user.next(user);
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
      })
     )
  }

  private handleAuthentication(email:string,  localId:string, idToken:string, expiresIn:number){
    const expDate = new Date(new Date().getTime() + expiresIn*1000)
        const user = new User(email, localId, idToken, expDate);
        this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user)); //store user data in local storage
    this.autoLogout(expiresIn*1000); //set the timer for auto logout
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

  logout(){
    this.user.next(null);
    // this.router.navigate(['/auth']);
    localStorage.removeItem('userData'); //remove user data from local storage
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer); //clear the timer
    }
    this.tokenExpirationTimer = null; //reset the timer
  }

  autoLogin(){
    const userData:{email:string, id:string, _token:string, _tokenExpirationDate:string} = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); //calculate the expiration duration
      this.autoLogout(expirationDuration); //set the timer for auto logout
    }
  }

  autoLogout(expirationDuration:number){
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
