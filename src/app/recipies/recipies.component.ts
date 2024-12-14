import { Component, OnInit } from '@angular/core';
import { RecipieListComponent } from "./recipies-list/recipie-list.component";
import { RecipieDetailComponent } from "./recipies-detail/recipie-detail.component";
import { Recipie } from '../Model/recipie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipiesService } from './recipies.service';

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [RecipieListComponent, RecipieDetailComponent, CommonModule, FormsModule],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css',
  // providers:[RecipiesService]
})
export class RecipiesComponent implements OnInit{

  selectedRecipie!:Recipie;

  constructor(private recipiesService:RecipiesService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.recipiesService.selectedRecipie.subscribe(
      (recipie) => {
        this.selectedRecipie = recipie;
      }
    )
  }

  // recipieHasBeenSelected(selectedRecipie:Recipie){
    // this.selectedRecipie = selectedRecipie;
  // }
}
