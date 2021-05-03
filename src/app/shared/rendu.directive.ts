import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.backgroundColor="lightgrey";
    el.nativeElement.style.border="1px solid green";
    el.nativeElement.classList.add("rendu");
  }

}
