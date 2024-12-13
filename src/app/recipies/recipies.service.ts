import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipie } from '../Model/recipie.model';

@Injectable({
  providedIn: 'root'
})

export class RecipiesService {

  @Output() selectedRecipie = new EventEmitter<Recipie>();

  recipie: Recipie[] = [
    new Recipie("First Recipie", "Description of a First Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg"),
    new Recipie("Second Recipie", "Description of a Second Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg"),
    new Recipie("Third Recipie", "Description of a Third Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg")
  ];

  constructor() { }

  getRecipies(){
    //Instead of calling the original array, here we are using the reference of the array. Slice will call the new instance / copy of the original array.
    return this.recipie.slice();
  }
}
