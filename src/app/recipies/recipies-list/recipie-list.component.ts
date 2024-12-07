import { Component, EventEmitter, Output } from '@angular/core';
import { RecipieItemComponent } from "./recipies-item/recipie-item.component";
import { Recipie } from '../../Model/recipie.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipie-list',
  standalone: true,
  imports: [RecipieItemComponent, CommonModule],
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css'
})
export class RecipieListComponent {
recipie: Recipie[] = [
  new Recipie("First Recipie", "Description of a First Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg"),
  new Recipie("Second Recipie", "Description of a Second Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg"),
  new Recipie("Third Recipie", "Description of a Third Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg")
];
@Output() recipieWasSelected = new EventEmitter<Recipie>();

handleSelectedRecipie(recipie:Recipie){
  this.recipieWasSelected.emit(recipie);
}
}
