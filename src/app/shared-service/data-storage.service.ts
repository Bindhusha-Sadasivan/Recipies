import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipiesService } from '../recipies/recipies.service';
import { Recipie } from '../Model/recipie.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { Ingredients } from '../Model/ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http:HttpClient,
    private recipieService:RecipiesService,
    private authService:AuthService
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
    // this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user:any) => {
    //     return this.http.get<Recipie[]>("https://ng-recipies-web-api-default-rtdb.firebaseio.com/recipies.json",
    //       {
    //         params:new HttpParams().set('auth', user?.token)
    //       }
    //     );
    //   }),
    //         map( recipies => {
    //           return recipies.map( recipie => {
    //             return {...recipie, ingredient: recipie.ingredients? recipie.ingredients : []}
    //           })
    //       }))
    //       .subscribe({
    //         next: (response:Recipie[]) => {
    //           console.log(response)
    //           this.recipieService.setRecipie(response);
    //         }})
    //   }


    this.http.get<Recipie[]>("https://ng-recipies-web-api-default-rtdb.firebaseio.com/recipies.json")
    .pipe(
      map( recipies => {
        return recipies.map( recipie => {
          return {...recipie, ingredient: recipie.ingredients? recipie.ingredients : []}
        })
    }))
    .subscribe({
      next: (response:Recipie[]) => {
        console.log(response)
        this.recipieService.setRecipie(response);
      }})
  }

  //with Resolve
  // fetchRecipies():any{
  //   this.http.get<Recipie[]>("https://ng-recipies-web-api-default-rtdb.firebaseio.com/recipies.json")
  //   .pipe(
  //     map( recipies => {
  //       return recipies.map( recipie => {
  //         return {...recipie, ingredient: recipie.ingredients? recipie.ingredients : []}
  //       })
  //   })),
  //   tap((recipies:Recipie[]) => {
  //     this.recipieService.setRecipie(recipies)
  //   })

  // }
// }
}


