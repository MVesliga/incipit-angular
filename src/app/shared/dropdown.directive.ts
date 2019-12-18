import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  private isOpen: boolean = false;
  constructor(private _el: ElementRef) {
  }

  @HostBinding('class.show') get opened() {
    return this.isOpen;
  }

  @HostListener('click') open() {
    if (this.isOpen === false) {
      this.isOpen = true;
      this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show');
    } else {
      this.isOpen = false;
      this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }

  @HostListener('document:click', ['$event.target']) close(targetElement) {
    const inside: boolean = this._el.nativeElement.contains(targetElement);
    if (!inside) {
      this.isOpen = false;
      this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }
  }

/*
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show');
  }
*/


}
