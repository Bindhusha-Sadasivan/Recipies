import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipiesService } from '../recipies/recipies.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http:HttpClient,
    private recipieService:RecipiesService
  ) { }

  storeRecipies(){
    const recipies = this.recipieService.getRecipies();
    return this.http.put("https://ng-recipies-web-api-default-rtdb.firebaseio.com/recipies.json", recipies).subscribe({
      next: (response:any) => {
        console.log(response)
      }}
    )
  }
}
function next(value: Object): void {
  throw new Error('Function not implemented.');
}

