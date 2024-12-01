import { Component } from '@angular/core';
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
  new Recipie("A Test Recipie", "Description of a Test Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg"),
  new Recipie("A Test Recipie", "Description of a Test Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg"),
  new Recipie("A Test Recipie", "Description of a Test Recipie", "https://c8.alamy.com/comp/HW5KR2/cookies-forming-the-word-recipes-HW5KR2.jpg")
];
}
