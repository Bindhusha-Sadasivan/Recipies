import { Component } from '@angular/core';
import { RecipieItemComponent } from "./recipies-item/recipie-item.component";

@Component({
  selector: 'app-recipie-list',
  standalone: true,
  imports: [RecipieItemComponent],
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css'
})
export class RecipieListComponent {

}
