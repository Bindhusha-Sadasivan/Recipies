import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Recipie } from '../../../Model/recipie.model';

@Component({
  selector: 'app-recipie-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css'
})
export class RecipieItemComponent {
@Input() receivedRecipie!:{name:string, description:string, imagePath:string};
}
