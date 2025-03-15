import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipie } from '../Model/recipie.model';
import { Ingredients } from '../Model/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipiesService {

  //using Event Emitter
//  selectedRecipie = new EventEmitter<Recipie>();

//using Subject
selectedRecipie = new Subject<Recipie>();

recipiesChanged = new Subject<Recipie[]>();

  recipie: Recipie[] = [
    new Recipie(
      "First Recipie",
      "Description of a First Recipie",
      "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg",
      [
        new Ingredients("Onion", 10),
        new Ingredients("Tomato", 5)
      ]),
    new Recipie(
      "Second Recipie",
      "Description of a Second Recipie",
      "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg",
        [
          new Ingredients("Brinjal", 10),
          new Ingredients("Garlic", 5)
        ]),
    new Recipie(
      "Third Recipie",
      "Description of a Third Recipie",
      "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg",
      [
        new Ingredients("Cabbage", 10),
        new Ingredients("Shallots", 5)
      ])
  ];

  constructor(private shoppinglistService:ShoppingListService) { }

  setRecipie(recipies:Recipie[]){
    this.recipie = recipies;
    this.recipiesChanged.next(this.recipie.slice());
  }

  getRecipies(){
    //Instead of calling the original array, here we are using the reference of the array. Slice will call the new instance / copy of the original array.
    return this.recipie.slice();
  }

  getRecipiesById(index:number){
    return this.recipie[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredients[]){
    //Here we need to access the shopping list service
    this.shoppinglistService.receiveIngredientsFromRecipies(ingredients);
  }

  addRecipie(recipie:Recipie):any{
    this.recipie.push(recipie);
    this.recipiesChanged.next(this.recipie.slice());
  }

  updateRecipie(index:number, recipie:Recipie){
    this.recipie[index] = recipie;
    this.recipiesChanged.next(this.recipie.slice());
  }

  deleteRecipie(index:number){
    this.recipie.splice(index, 1)
    console.log(this.recipie);
    this.recipiesChanged.next(this.recipie.slice());
  }
}
