import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoggedIn:boolean = true;

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
    const email = authForm.value.email;
    const password = authForm.value.password;
    if(this.isLoggedIn){

    }
    else{
      this.authservice.signup(email,password).subscribe({
        next: (response:any) => {
          console.log("Response:", response)
        }
      })
    }
    authForm.reset();
  }
}
