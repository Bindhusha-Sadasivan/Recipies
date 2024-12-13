import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  //class.open -> This represents the class which is responsible for opening the dropdown.
  // This class is not available in bootstrap 5. so this directive or class will not work.
  //In bootstrap 5 we make the dropdown click work, we added js file in the index.html.
  //Just for test purpose i created this.
  @HostBinding('class.open') isOpen:boolean = false;

  constructor() { }

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

}
