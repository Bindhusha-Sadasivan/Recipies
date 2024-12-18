import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Recipie } from '../../Model/recipie.model';
import { RecipiesService } from '../recipies.service';

@Component({
  selector: 'app-recipie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipie-detail.component.html',
  styleUrl: './recipie-detail.component.css'
})
export class RecipieDetailComponent {
  @Input() receivedRecipie!:Recipie;

  constructor(private recipiesService:RecipiesService){}

  onAddToShoppingList(){
    this.recipiesService.addIngredientsToShoppingList(this.receivedRecipie.ingredients);
    console.log(this.recipiesService)
  }
}
