import { Directive, Renderer2, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAddOrRemoveClass]'
})
export class AddOrRemoveClassDirective implements OnInit {
  selt = 'up-btn multiple';
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.renderer.addClass(this.elRef.nativeElement, 'up-btn multiple');
    this.renderer.addClass(this.elRef.nativeElement, 'up-btn multiple');
  }
}
