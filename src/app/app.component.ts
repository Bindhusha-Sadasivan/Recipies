import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipiesService } from './recipies/recipies.service';
import { DataStorageService } from './shared-service/data-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipiesComponent, ShoppingListComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //Entire apllication should share this two service. Should not inject thiese services seperately. Because that will create a new instance of the service aand the CRU operations becomes invalid
  providers:[ShoppingListService, RecipiesService]
})
export class AppComponent {
  // title = 'Recipes';

  // loadedRecipieFeature='recipie';

  // checkRecipieFeature(feature:string){
  //   this.loadedRecipieFeature = feature;
  // }
}
