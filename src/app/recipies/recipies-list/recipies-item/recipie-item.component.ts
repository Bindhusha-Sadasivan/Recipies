import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipie } from '../../../Model/recipie.model';
import { RecipiesService } from '../../recipies.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipie-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css'
})
export class RecipieItemComponent {
@Input() receivedRecipie!:Recipie;
// @Output() selectedRecipie = new EventEmitter<any>();
@Input() index!:number;


constructor(private recipiesService:RecipiesService) {

}

// onSelectRecipie(){
// // this.selectedRecipie.emit();
// this.recipiesService.selectedRecipie.emit(this.receivedRecipie);
// }
}
