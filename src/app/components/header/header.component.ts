import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  suscripcion:Subscription;
  veoCarousel:boolean = true;
  constructor(

    private _comunicationService:ComunicationService
  ) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
   this.suscripcion = this._comunicationService.portada$.subscribe({
      next:(datos)=>{this.veoCarousel = datos},//recibimos true o false
      error:(error)=>{},

      complete:()=>{}
    }); 
  }

}
