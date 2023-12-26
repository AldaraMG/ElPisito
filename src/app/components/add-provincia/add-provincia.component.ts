import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../models/entity';

@Component({
  selector: 'app-add-provincia',
  templateUrl: './add-provincia.component.html',
  styleUrl: './add-provincia.component.css'
})
export class AddProvinciaComponent {
    ///////////////////////////////////////////////// 
nFases:number=2; 
cargaCompletada:boolean=false;
fasesCargadas:number=0; 
///////////////////////////////////////////////// 


  constructor(
    private _provinciaService:ProvinciaService,
    private _router:Router
  ){}

  provincia:Provincia={
  
    nombre:'',
    activo:1
  }
  add():void{ 

console.log(this.provincia);

    this.provincia.nombre = this.provincia.nombre.toUpperCase(); 
    this._provinciaService.addProvincia(this.provincia).subscribe({ 
    
    next: (datos)=>{console.log(datos)} 
    , 
    error:(error)=>{console.log(error)}
    , 
    complete: ()=>{this._router.navigate(["/list-provincia"])} 
    
    
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
