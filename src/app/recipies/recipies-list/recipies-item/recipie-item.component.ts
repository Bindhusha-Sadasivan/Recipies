import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipie } from '../../../Model/recipie.model';

@Component({
  selector: 'app-recipie-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css'
})
export class RecipieItemComponent {
@Input() receivedRecipie!:Recipie;
@Output() selectedRecipie = new EventEmitter<any>();

onSelectRecipie(){
this.selectedRecipie.emit();
}
}
