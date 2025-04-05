import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared-service/loading-spinner/loading-spinner.component';
import { authResponse } from '../interfaces/authResponcse.interface';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from "../../shared-service/alert/alert/alert.component";
import { PlaceHolderDirective } from '../../shared-service/placeHolder/place-holder.directive';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingSpinnerComponent, AlertComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy {
  isLoggedIn:boolean = true;
  isLoading:boolean = false;
  error!:string;
  @ViewChild(PlaceHolderDirective,{ static: false }) alertHost!:PlaceHolderDirective
  closeSub !: Subscription

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
    //These are all completely like a formula to render a component into the dom dynamically. After angular v9 it might not work properly.
    // const alertComp = new AlertComponent();
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); //clear the view container reference before creating a new component
    hostViewContainerRef.createComponent(alertCompFactory); //create the component
    const componentRef = hostViewContainerRef.createComponent(alertCompFactory); //create the component
    componentRef.instance.message = message; //set the message of the component
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe(); //unsubscribe the close subscription to avoid memory leak
      hostViewContainerRef.clear(); //clear the view container reference when the component is closed
    } //close the component
    );
   }

   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.closeSub){
      this.closeSub.unsubscribe(); //unsubscribe the close subscription to avoid memory leak
    } //if the close subscription is not null then unsubscribe it to avoid memory leak
    // this.closeSub.unsubscribe(); //unsubscribe the close subscription to avoid memory leak
   }
}
