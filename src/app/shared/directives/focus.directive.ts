import {AfterContentInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: "input:not([type=submit])[ng2focus], textarea[ng2focus]"
})
export class FocusDirective implements AfterContentInit {
  constructor(private ele: ElementRef) {
  }

  ngAfterContentInit() {
    this.ele.nativeElement.focus();
  }
}
