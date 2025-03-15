import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipie } from "../Model/recipie.model";
import { DataStorageService } from '../shared-service/data-storage.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class recipiesResolverService implements Resolve <Recipie[]>{

  constructor(
    private dataStorageService:DataStorageService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipie[]> | Promise<Recipie[]> | Recipie[] | any{
    return this.dataStorageService.fetchRecipies();
  }

}
