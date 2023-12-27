import { Component, OnInit } from '@angular/core';
import { Poblacion, Provincia } from '../../models/entity';
import { PoblacionService } from '../../services/poblacion.service';
import { ProvinciaService } from '../../services/provincia.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-add-poblacion',
  templateUrl: './add-poblacion.component.html',
  styleUrl: './add-poblacion.component.css'
})
export class AddPoblacionComponent implements OnInit {
   /////////////////////////////////////////////////
  nFases:number=1;
  cargaCompletada:boolean=false;
  fasesCargadas:number=0;
  /////////////////////////////////////////////////

  aProvincias:Provincia[];
  
  /* ESTE OBJETO LO UTILIZAMOS SÓLO PARA RELLENARLO DESDE LA VISTA
  Y ENVIARLO A LA API */
  poblacion:Poblacion={

    nombre:"",
    provincia:{

      nombre:"",
      activo:0
    },
    activo:1
  }

  constructor(
    private _poblacionService:PoblacionService,
    private _provinciaService:ProvinciaService,
    private _router:Router,
    private _comunicationService:ComunicationService
  ){}


  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
    
  }

  getDatos():void{

    //Rellenar el select provincia con los datos de la BBDD
    this._provinciaService.getProvincias().subscribe({

      next: (datos)=>{this.aProvincias = datos}
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{this.faseCarga();}

    });
  }


  add():void{

    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.addPoblacion(this.poblacion).subscribe({

      next: (datos)=>{console.log(datos)}
      ,
      error: (error)=>{this._router.navigate(['/error'])}
      ,
      complete: ()=>{this._router.navigate(['/list-poblacion'])}

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
