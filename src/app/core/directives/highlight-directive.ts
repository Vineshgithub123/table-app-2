import { Directive, ElementRef, Renderer2, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {
  private renderer: Renderer2 = inject(Renderer2);
  private el: ElementRef = inject(ElementRef);

  constructor() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.3s ease');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.fade(0.7);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.fade(1);
  }

  private fade(opacityValue: number) {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', opacityValue.toString());
  }
}
