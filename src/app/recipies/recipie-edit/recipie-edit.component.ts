import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipiesService } from '../recipies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipie-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipie-edit.component.html',
  styleUrl: './recipie-edit.component.css'
})
export class RecipieEditComponent implements OnInit{

  id!:number;
  editMode:boolean = false;
  recipieForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipieService: RecipiesService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // const id = this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params:Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    )
  }

   private initForm(){
    let recipieName = '';
    let recipieImagePath = '';
    let recipieDescription = '';
    let recipieIngredients:any = new FormArray([]);

    if(this.editMode){
      const recipie = this.recipieService.getRecipiesById(this.id);
      recipieName = recipie.name;
      recipieImagePath = recipie.imagePath;
      recipieDescription = recipie.description;
      if(recipie['ingredients']){
        for(let ingredients of recipie.ingredients){
          recipieIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredients.name),
              'amount': new FormControl(ingredients.amount)
            })
          )
        }
    }
  }

    this.recipieForm = new FormGroup({
      'name': new FormControl(recipieName),
      'imagePath': new FormControl(recipieImagePath),
      'description': new FormControl(recipieDescription),
      'ingredients': recipieIngredients
    });
  }

  get recipieFormControls(){
    return (<FormArray>this.recipieForm.get('ingredients')).controls;
  }

  onSubmit(){
    console.log(this.recipieForm);
  }
}
