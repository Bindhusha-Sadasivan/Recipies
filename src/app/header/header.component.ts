import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DataStorageService } from '../shared-service/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers:[DataStorageService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubs!:Subscription;
  isAuthenticated:boolean = false;

  constructor(
    private dataStorageService:DataStorageService,
    private authService:AuthService,
    private router:Router
  ) {  }

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !user ? false : true;  //or this.isAuthenticated = !!user
      console.log(!user);
      console.log(!!user);
    });
  }

  // @Output() recipieFeature = new EventEmitter<string>();

  // onClickRecipies(feature:string){
  //   this.recipieFeature.emit(feature);
  //   // this.recipieFeature.subscribe(data => console.log(data));
  // }

  onSaveData(){
    this.dataStorageService.storeRecipies();
  }

  // onfetchData(){
  //   this.dataStorageService.fetchRecipies();
  // }

  onfetchData():any{
    // this.dataStorageService.fetchRecipies()?.subscribe();
    this.dataStorageService.fetchRecipies()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubs.unsubscribe()
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
