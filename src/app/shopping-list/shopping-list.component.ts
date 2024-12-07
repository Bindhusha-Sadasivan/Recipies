import { Component } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredients } from '../Model/ingredient.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent, CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients : Ingredients[] = [
    new Ingredients( "Apple" , 5),
    new Ingredients( "Tomato" , 10)
  ];


  handleAddedName(addedInputs:any){
    this.ingredients.push(addedInputs);
  }
}
