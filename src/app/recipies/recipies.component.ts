import { Component } from '@angular/core';
import { RecipieListComponent } from "./recipies-list/recipie-list.component";
import { RecipieDetailComponent } from "./recipies-detail/recipie-detail.component";
import { Recipie } from '../Model/recipie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [RecipieListComponent, RecipieDetailComponent, CommonModule, FormsModule],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css'
})
export class RecipiesComponent {

  selectedRecipie!:Recipie;

  recipieHasBeenSelected(selectedRecipie:Recipie){
    this.selectedRecipie = selectedRecipie;
  }
}
