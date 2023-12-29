import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoImage]'
})
export class NoImageDirective {

  constructor(
    private nodoDOM:ElementRef,
    private renderer:Renderer2
  ) { }
//Decora el método onError. Cuando se poduce un error  en el dom se llama automaticamente. 
@HostListener('error')
onError():void{
  this.renderer.setAttribute(this.nodoDOM.nativeElement,'src','assets/img/no-image.jpg');
}
}
