import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../Model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
@ViewChild('nameInput') enterdName!:ElementRef<any>;
@ViewChild('amountInput') enteredAmount!:ElementRef<any>;

@Output() onAddName = new EventEmitter<Ingredients>();

onAdd(){
  const enterdName:string = this.enterdName.nativeElement.value;
  const enteredAmount:number = this.enteredAmount.nativeElement.value;
  const newIngredient = new Ingredients(enterdName, enteredAmount);
  this.onAddName.emit(newIngredient);
  this.onAddName.subscribe(data => console.log(data));
}

}
