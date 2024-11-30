import { Component } from '@angular/core';
import { RecipieListComponent } from "./recipies-list/recipie-list.component";
import { RecipieDetailComponent } from "./recipies-detail/recipie-detail.component";

@Component({
  selector: 'app-recipies',
  standalone: true,
  imports: [RecipieListComponent, RecipieDetailComponent],
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css'
})
export class RecipiesComponent {

}
