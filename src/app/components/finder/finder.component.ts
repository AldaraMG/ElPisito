import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../services/comunication.service';
import { Router } from '@angular/router';
import { InmuebleService } from '../../services/inmueble.service';
import { ProvinciaService } from '../../services/provincia.service';
import { TipoService } from '../../services/tipo.service';
import { Poblacion, Provincia, Tipo } from '../../models/entity';
import { PoblacionService } from '../../services/poblacion.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.css'
})
export class FinderComponent implements OnInit {

  aPoblaciones:Poblacion[];
  aTipos:Tipo[];
  aOperaciones:string[]=["Venta","Alquiler","Traspaso"];

  poblacionElegida:Poblacion;
  tipoElegido:Tipo;
  operacionElegida:string;
  
  ////////////////////////////////////////////////
  nFases:number=2;
  cargaCompletada:boolean=false;
  fasesCargadas:number=0;
  /////////////////////////////////////////////////


constructor(
  private _comunicationService:ComunicationService,
  private _router:Router,
  private _poblacionService:PoblacionService,
  private _tipoService:TipoService,
  private _inmuebleService:InmuebleService,
  
){}
  ngOnInit(): void {
   this.getDatos();
  }
getDatos():void{
  this._poblacionService.getPoblaciones().subscribe({

    next: (datos)=>{this.aPoblaciones = datos;}
    ,
    error: (error)=>{this._router.navigate(['/error'])}
    ,
    complete: ()=>{this.faseCarga();}
  })
  this._tipoService.getTipos().subscribe({

    next: (datos)=>{this.aTipos = datos;}
    ,
    error: (error)=>{this._router.navigate(['/error'])}
    ,
    complete: ()=>{this.faseCarga();}
  })

}//Vamos a traer los datos para rellenar los desplegables, los select de provincias y tipo.
find():void{
  //dejamos nombre dl tipo y nombre de la poblacion en Local Storage.
  
   this._router.navigate(['/list-finder',this.tipoElegido.id,this.poblacionElegida.id,this.operacionElegida,]);
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
