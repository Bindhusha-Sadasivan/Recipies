import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
              'name': new FormControl(ingredients.name,  [Validators.required]),
              'amount': new FormControl(ingredients.amount,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
    }
  }

    this.recipieForm = new FormGroup({
      'name': new FormControl(recipieName, [Validators.required]),
      'imagePath': new FormControl(recipieImagePath,  [Validators.required]),
      'description': new FormControl(recipieDescription,  [Validators.required]),
      'ingredients': recipieIngredients
    });
  }

  get recipieFormControls(){
    return (<FormArray>this.recipieForm.get('ingredients')).controls;
  }

  onSubmit(){
    console.log(this.recipieForm);
    if(this.editMode){
      this.recipieService.updateRecipie(this.id, this.recipieForm.value);
      console.log("Updated form",this.recipieForm);
    }
    else{
      this.recipieService.addRecipie(this.recipieForm.value);
    }
  }

  onAddIngredients(){
    const ingredientsForm = this.recipieForm.get('ingredients') as FormArray;
    ingredientsForm.push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
    this.recipieForm.markAsTouched();
  }

  hasInvalidIngredientsForm(){
    const ingredientsForm = this.recipieForm.get('ingredients') as FormArray;
    ingredientsForm.controls.some(ingredients => ingredients.invalid)
  }
}
