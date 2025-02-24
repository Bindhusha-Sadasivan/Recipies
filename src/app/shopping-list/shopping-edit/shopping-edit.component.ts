import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../Model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
@ViewChild('nameInput') enterdName!:ElementRef<any>;
@ViewChild('amountInput') enteredAmount!:ElementRef<any>;

// @Output() onAddName = new EventEmitter<Ingredients>();

// onAdd(){
//   const enterdName:string = this.enterdName.nativeElement.value;
//   const enteredAmount:number = this.enteredAmount.nativeElement.value;
//   const newIngredient = new Ingredients(enterdName, enteredAmount);
//   this.onAddName.emit(newIngredient);
//   this.onAddName.subscribe(data => console.log(data));
// }


constructor(private shoppingListService:ShoppingListService) {

}

// onAdd(){
//   const enterdName:string = this.enterdName.nativeElement.value;
//   const enteredAmount:number = this.enteredAmount.nativeElement.value;
//   const newIngredient = new Ingredients(enterdName, enteredAmount);
//   // this.shoppingListService.enteredIngredients.emit(newIngredient);
//   // this.shoppingListService.enteredIngredients.subscribe(data => console.log(data));
//   this.shoppingListService.addedIngredients(newIngredient);
// }

onSubmit(form:NgForm){
const value = form.value;
const newIngredient = new Ingredients(value.name, value.amount);
this.shoppingListService.addedIngredients(newIngredient);
}
}
