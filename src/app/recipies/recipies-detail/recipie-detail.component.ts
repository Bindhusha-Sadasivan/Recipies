import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Recipie } from '../../Model/recipie.model';
import { RecipiesService } from '../recipies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipie-detail.component.html',
  styleUrl: './recipie-detail.component.css'
})
export class RecipieDetailComponent implements OnInit{
  // @Input() receivedRecipie!:Recipie;
  receivedRecipie!:Recipie;
  id!:number;

  constructor(
    private recipiesService:RecipiesService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // const id = +this.route.snapshot.params['id'];
    // console.log(id);

    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.receivedRecipie = this.recipiesService.getRecipiesById(this.id);
      }
    );
  }


  onAddToShoppingList(){
    this.recipiesService.addIngredientsToShoppingList(this.receivedRecipie.ingredients);
    console.log(this.recipiesService)
  }
}
