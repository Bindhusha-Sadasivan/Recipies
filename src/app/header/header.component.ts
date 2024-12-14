import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() recipieFeature = new EventEmitter<string>();

  onClickRecipies(feature:string){
    this.recipieFeature.emit(feature);
    // this.recipieFeature.subscribe(data => console.log(data));
  }
}
