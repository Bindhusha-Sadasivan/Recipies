import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredients } from '../Model/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

//using Event Emitter
// enteredIngredients = new EventEmitter<Ingredients[]>();

//using Subject
enteredIngredients = new Subject<Ingredients[]>();

private ingredients : Ingredients[] = [
    new Ingredients( "Apple" , 5),
    new Ingredients( "Tomato" , 10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addedIngredients(ingredients:Ingredients){
    this.ingredients.push(ingredients);
    //Replace emit by next if you are changing emit to next
    // this.enteredIngredients.emit(this.ingredients.slice());

    //Replace emit by next in Subject
    this.enteredIngredients.next(this.ingredients.slice());
  }

  receiveIngredientsFromRecipies(ingredients:Ingredients[]){
    //  for(let ingredient of ingredients)
    //  {
    //   this.addedIngredients(ingredient);
    //  }
    this.ingredients.push(...ingredients);
    //Replace emit by next if you are changing emit to next
    // this.enteredIngredients.emit(this.ingredients.slice());

    //Replace emit by next in Subject
    this.enteredIngredients.next(this.ingredients.slice());
    }

}
