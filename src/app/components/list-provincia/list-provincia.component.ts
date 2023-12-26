import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../models/entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-provincia',
  templateUrl: './list-provincia.component.html',
  styleUrl: './list-provincia.component.css'
})
export class ListProvinciaComponent implements OnInit{

   /////////////////////////////////////////////////
   nFases:number=1;
   cargaCompletada:boolean=false;
   fasesCargadas:number=0;
   /////////////////////////////////////////////////
  aDatos:Provincia[]=[]; 

  constructor( 
  private _provinciaService:ProvinciaService, 
  private _router:Router 
  ){} 
  
  ngOnInit(): void { 
  this.getDatos(); 
  } 
  
  
  getDatos():void{ 
  
  this._provinciaService.getProvincias().subscribe({ 
  
  next: (datos)=>{ this.aDatos=datos } 
  , 
  error: (error)=>{this._router.navigate(['/error'])} 
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
