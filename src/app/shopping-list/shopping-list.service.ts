import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredients } from '../Model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

@Output() enteredIngredients = new EventEmitter<Ingredients>();

ingredients : Ingredients[] = [
    new Ingredients( "Apple" , 5),
    new Ingredients( "Tomato" , 10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
}
