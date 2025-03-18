import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataStorageService } from '../shared-service/data-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  providers:[DataStorageService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private dataStorageService:DataStorageService) {  }

  // @Output() recipieFeature = new EventEmitter<string>();

  // onClickRecipies(feature:string){
  //   this.recipieFeature.emit(feature);
  //   // this.recipieFeature.subscribe(data => console.log(data));
  // }

  onSaveData(){
    this.dataStorageService.storeRecipies();
  }

  // onfetchData(){
  //   this.dataStorageService.fetchRecipies();
  // }

  onfetchData():any{
    // this.dataStorageService.fetchRecipies()?.subscribe();
    this.dataStorageService.fetchRecipies()
  }
}
