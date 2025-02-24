import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../../Model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
@ViewChild('nameInput') enterdName!:ElementRef<any>;
@ViewChild('amountInput') enteredAmount!:ElementRef<any>;
@ViewChild('form') slForm!:NgForm;
editMode:boolean = false;
subscription!:Subscription;
editedItemIndex!:number;
editedItem!:Ingredients;

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

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.subscription = this.shoppingListService.startedEditing.subscribe(
    (index:number)=>{
      console.log(index);
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredientsByIndex(this.editedItemIndex);
      this.slForm.setValue(
        {
          name : this.editedItem.name,
          amount : this.editedItem.amount
        }

      )
    }
  )
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

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.subscription.unsubscribe();
}

}
