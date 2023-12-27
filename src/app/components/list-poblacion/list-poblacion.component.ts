import { Component, OnInit } from '@angular/core';
import { Poblacion } from '../../models/entity';
import { PoblacionService } from '../../services/poblacion.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-list-poblacion',
  templateUrl: './list-poblacion.component.html',
  styleUrl: './list-poblacion.component.css'
})
export class ListPoblacionComponent implements OnInit {
   /////////////////////////////////////////////////
   nFases:number=1;
   cargaCompletada:boolean=false;
   fasesCargadas:number=0;
   /////////////////////////////////////////////////
  aDatos:Poblacion[]=[];

  constructor(
    private _poblacionService:PoblacionService,
    private _router:Router,
    private _comunicationService:ComunicationService,
  ){}

  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
    
  }


  getDatos():void{

    this._poblacionService.getPoblaciones().subscribe({

      next: (datos)=>{ this.aDatos=datos;console.log(this.aDatos) }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga()}


    });

  }
  ////////////////////////////////////////////////
  faseCarga():void{

    this.fasesCargadas++;
    if(this.fasesCargadas == this.nFases){
      this.cargaCompletada = true;
    }

  }
  ////////////////////////////////////////////////


}
