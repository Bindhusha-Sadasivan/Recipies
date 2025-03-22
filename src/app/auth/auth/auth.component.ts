import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoggedIn:boolean = true;

  onSwitchMode(){
    this.isLoggedIn = !this.isLoggedIn;
  }
}
