import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipiesComponent, ShoppingListComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Recipes';

  loadedRecipieFeature='recipie';

  checkRecipieFeature(feature:string){
    this.loadedRecipieFeature = feature;
  }
}
