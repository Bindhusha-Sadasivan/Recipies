// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
// import { Recipie } from "../Model/recipie.model";
// import { DataStorageService } from '../shared-service/data-storage.service';
// import { Observable } from "rxjs";
// import { RecipiesService } from "../recipies/recipies.service";

// @Injectable({
//   providedIn: 'root'
// })
// export class recipiesResolverService implements Resolve <Recipie[]>{

//   constructor(
//     private dataStorageService:DataStorageService,
//     private recipieService:RecipiesService
//   ){}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipie[]> | Promise<Recipie[]> | Recipie[] | any{
//     // return this.dataStorageService.fetchRecipies();
//     const recipies = this.recipieService.getRecipies();
//     if(recipies.length === 0){
//       return this.dataStorageService.fetchRecipies();
//     } else {
//       return recipies;
//     }
//   }

// }
