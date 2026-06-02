import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
  standalone: true
})

export class HoverEffectDirective {
  private el = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter(){
    this.el.nativeElement.classList.add('shadow-xl', '-translate-y-1', 'transition-all');
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.el.nativeElement.classList.remove('shadow-xl', '-translate-y-1');
  }
}
