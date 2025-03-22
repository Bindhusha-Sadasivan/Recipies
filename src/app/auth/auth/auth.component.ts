import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared-service/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule,LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoggedIn:boolean = true;
  isLoading:boolean = false;
  error!:string;

  constructor(private authservice:AuthService){}

  onSwitchMode(){
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(authForm:NgForm){
    // console.log("Auth Form",authForm);
    // console.log("Auth Form",authForm.value);
    if(!authForm.valid){
      return
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;
    if(this.isLoggedIn){

    }
    else{
      this.authservice.signup(email,password).subscribe({
        next: (response:any) => {
          console.log("Response:", response)
          this.isLoading = false;
        },
        error: (error:any) => {
          console.log("Error:", error)
          this.error=error.message;
          this.isLoading = false;
        }
      })
    }
    authForm.reset();
  }
}
