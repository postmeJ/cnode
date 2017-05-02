import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[preview]'
})
export class PreviewDirective {

  @Input('preview') height: string;
  constructor(private renderer: Renderer,
    private el: ElementRef) { }

  ngOnInit() {
    this.renderer.setElementStyle(this.el.nativeElement, 'border-radius', '50%');
    this.renderer.setElementStyle(this.el.nativeElement, 'height', this.height);
  }

}
