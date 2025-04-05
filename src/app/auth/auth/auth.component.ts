import { Component, ComponentFactoryResolver } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared-service/loading-spinner/loading-spinner.component';
import { authResponse } from '../interfaces/authResponcse.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from "../../shared-service/alert/alert/alert.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingSpinnerComponent, AlertComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoggedIn:boolean = true;
  isLoading:boolean = false;
  error!:string;

  constructor(
    private authservice:AuthService,
    private router:Router,
    private componentFactoryResolver:ComponentFactoryResolver
  ){}

  onSwitchMode(){
    this.isLoggedIn = !this.isLoggedIn;
  }

  //refactored method
  onSubmit(authForm:NgForm){
    // console.log("Auth Form",authForm);
    // console.log("Auth Form",authForm.value);
    if(!authForm.valid){
      return
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs:Observable<authResponse>;

    if(this.isLoggedIn){
      authObs = this.authservice.login(email,password);

    }
    else{
      authObs = this.authservice.signup(email,password)
    }

    authObs.subscribe({
      next: (response:any) => {
        console.log("Response:", response)
        this.isLoading = false;
        this.router.navigate(['/recipies'])
      },
      error: (errorMessage:any) => {
        console.log("Error:", errorMessage)
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    })
    authForm.reset();
  }

  //Original method
  // onSubmit(authForm:NgForm){
  //   // console.log("Auth Form",authForm);
  //   // console.log("Auth Form",authForm.value);
  //   if(!authForm.valid){
  //     return
  //   }
  //   this.isLoading = true;
  //   const email = authForm.value.email;
  //   const password = authForm.value.password;
  //   if(this.isLoggedIn){
  //     this.authservice.login(email,password).subscribe({
  //       next: (response:any) => {
  //         console.log("Response:", response)
  //         this.isLoading = false;
  //       },
  //       // error: (error:any) => {
  //       //   console.log("Error:", error)
  //       //   switch(error.error.error.message){
  //       //     case 'EMAIL_EXISTS':
  //       //       this.error = "This email already exists!!!"
  //       //   }
  //       //   // this.error = "An error occured!!!"
  //       //   this.isLoading = false;
  //       // }

  //        error: (errorMessage:any) => {
  //         console.log("Error:", errorMessage)
  //         this.error = errorMessage;
  //         this.isLoading = false;
  //       }
  //     })

  //   }
  //   else{
  //     this.authservice.signup(email,password).subscribe({
  //       next: (response:any) => {
  //         console.log("Response:", response)
  //         this.isLoading = false;
  //       },
  //       // error: (error:any) => {
  //       //   console.log("Error:", error)
  //       //   switch(error.error.error.message){
  //       //     case 'EMAIL_EXISTS':
  //       //       this.error = "This email already exists!!!"
  //       //   }
  //       //   // this.error = "An error occured!!!"
  //       //   this.isLoading = false;
  //       // }

  //        error: (errorMessage:any) => {
  //         console.log("Error:", errorMessage)
  //         this.error = errorMessage;
  //         this.isLoading = false;
  //       }
  //     })
  //   }
  //   authForm.reset();
  // }

  onHandleError(){
    this.error = "";
  }

  private showErrorAlert(message:string){
    // const alertComp = new AlertComponent();
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  }
}
