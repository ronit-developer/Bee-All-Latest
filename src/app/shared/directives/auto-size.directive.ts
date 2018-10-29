import {Directive, DoCheck, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[baAutosize]'
})


export class AutoSizeDirective implements DoCheck {
  @Input() private height: number = 10;


  constructor(public element: ElementRef) {
  }

  ngDoCheck() {
    this.adjust();
  }

  @HostListener('keyup', ['$event'])
  onInput(textArea: string) {
    this.adjust();
  }


  adjust(): void {
    this.element.nativeElement.style.overflow = 'hidden';
    // Set element's height as auto - this will change the scrollHeight
    this.element.nativeElement.style.height = 'auto';
    // Set element's height by element's scrollHeight
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + this.height + 'px';
  }
}
