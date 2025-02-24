import { Component, OnInit } from '@angular/core';
import { RecipieListComponent } from "./recipies-list/recipie-list.component";
import { RecipieDetailComponent } from "./recipies-detail/recipie-detail.component";
import { Recipie } from '../Model/recipie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipiesService } from './recipies.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [RecipieListComponent, RecipieDetailComponent, CommonModule, FormsModule,RouterModule],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css',
  // providers:[RecipiesService]
})
export class RecipiesComponent implements OnInit{

  selectedRecipie!:Recipie;
  rescipiesSub!:Subscription;

  constructor(private recipiesService:RecipiesService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //Using Event Emitter
    // this.recipiesService.selectedRecipie.subscribe(
    //   (recipie) => {
    //     this.selectedRecipie = recipie;
    //   }
    // )

    //Using Subject
    this.rescipiesSub = this.recipiesService.selectedRecipie.subscribe(
      (recipie) => {
        this.selectedRecipie = recipie;
      }
    )
  }

  // recipieHasBeenSelected(selectedRecipie:Recipie){
    // this.selectedRecipie = selectedRecipie;
  // }

  //Using Subject
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.rescipiesSub.unsubscribe();
  }
}
