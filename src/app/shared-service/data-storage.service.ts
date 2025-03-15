import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipiesService } from '../recipies/recipies.service';
import { Recipie } from '../Model/recipie.model';

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

  fetchRecipies(){
    this.http.get<Recipie[]>("https://ng-recipies-web-api-default-rtdb.firebaseio.com/recipies.json").subscribe({
      next: (response:Recipie[]) => {
        console.log(response)
        this.recipieService.setRecipie(response);
      }})
  }
}


