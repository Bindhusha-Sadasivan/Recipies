import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipie-edit',
  standalone: true,
  imports: [],
  templateUrl: './recipie-edit.component.html',
  styleUrl: './recipie-edit.component.css'
})
export class RecipieEditComponent implements OnInit{

  id!:number;
  editMode:boolean = false;

  constructor(
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // const id = this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params:Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode)
      }
    )
  }

}
