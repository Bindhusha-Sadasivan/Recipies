import { Component, Input, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredients } from '../Model/ingredient.model';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from './shopping-list.service';
import { RecipiesService } from '../recipies/recipies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent, CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  // providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
  // ingredients : Ingredients[] = [
  //   new Ingredients( "Apple" , 5),
  //   new Ingredients( "Tomato" , 10)
  // ];

  @Input() ingredients:Ingredients[]=[];
  //Using Subjects
  ingSub!:Subscription;


  constructor(private shoppingListService:ShoppingListService) {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.shoppingListService.enteredIngredients.subscribe(
    //   (data:any) => {
    //     this.ingredients.push(data);
    //   }
    // )

    //using Event Emitter
    // this.shoppingListService.enteredIngredients.subscribe(
    //   (data) => {
    //     this.ingredients = data;
    //   });

    //Using Subject
    this.ingSub = this.shoppingListService.enteredIngredients.subscribe(
      (data) => {
        this.ingredients = data;
      });
  }


  // handleAddedName(addedInputs:any){
  //   this.ingredients.push(addedInputs);
  // }

  //Using Subject
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ingSub.unsubscribe();
  }
}
