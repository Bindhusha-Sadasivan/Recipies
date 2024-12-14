import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredients } from '../Model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

enteredIngredients = new EventEmitter<Ingredients[]>();

private ingredients : Ingredients[] = [
    new Ingredients( "Apple" , 5),
    new Ingredients( "Tomato" , 10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addedIngredients(ingredients:Ingredients){
    this.ingredients.push(ingredients);
    this.enteredIngredients.emit(this.ingredients.slice());
  }
}
