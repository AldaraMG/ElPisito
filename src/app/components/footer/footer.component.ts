import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy {

  suscripcion:Subscription;
  esVisible:boolean = true;
  constructor(

    private _comunicationService:ComunicationService
  ) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    
  }
  ngOnInit(): void {
    this.suscripcion = this._comunicationService.footer$.subscribe({
      next:(datos)=>{this.esVisible = datos},//recibimos true o false
      error:(error)=>{},

      complete:()=>{}
    }); 
    
  }

}
