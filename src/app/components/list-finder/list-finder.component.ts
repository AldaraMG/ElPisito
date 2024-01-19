import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunicationService } from '../../services/comunication.service';
import { InmuebleService } from '../../services/inmueble.service';
import { PoblacionService } from '../../services/poblacion.service';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-list-finder',
  templateUrl: './list-finder.component.html',
  styleUrl: './list-finder.component.css'
})
export class ListFinderComponent implements OnInit {
  poblacion:number;
  tipo:number;
  operacion:string;
  cartelNoInmuebles:boolean=false;

  nombrePoblacion:string;
  nombreTipo:string;

    /////////////////////////////////////////////////
    nFases:number=2;
    cargaCompletada:boolean=false;
    fasesCargadas:number=0;
    /////////////////////////////////////////////////

    aDatos:any[]=[];

  constructor(
    private _comunicationService:ComunicationService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _inmuebleService:InmuebleService,
    private _poblacionService:PoblacionService,
    private _tipoService:TipoService
  ){}


  ngOnInit(): void {
    this._comunicationService.cambioPortada(false);
    this._comunicationService.cambioFooter(false);
    this.getDatos();
  }


  getDatos():void{
    

    //Necesito las tres variables de ruta po, ti, op
  // Necesito las tres variables de ruta po, ti, op
this._route.params.subscribe({
  next: (params) => {
    this.poblacion = params['ti'];  // Cambiado a 'ti'
    this.tipo = params['po'];  // Cambiado a 'po'
    this.operacion = params['op'];
   
  },
  error: (error) => { this._router.navigate(["/error"]) }
});

    
    //Hacemos esta llamada para conseguir el nombre de la población elegida
    this._poblacionService.getPoblacion(this.poblacion).subscribe({

      next: (datos)=>{
        this.nombrePoblacion = datos.nombre;
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga()}


    });

    //Hacemos esta llamada para conseguir el nombre del tipo elegido
    this._tipoService.getTipo(this.tipo).subscribe({

      next: (datos)=>{

        this.nombreTipo = datos.nombre;
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga()}


    });



    this._inmuebleService.getInmueblesFinder(this.tipo, this.poblacion, this.operacion).subscribe({

      next: (datos)=>{

        this.aDatos = datos;  

        if(this.aDatos.length == 0){

          this.cartelNoInmuebles = true;

        }
  

      
      }
      ,
      error: (error)=>{this._router.navigate(["/error"])}
      ,
      complete: ()=>{this.faseCarga()}
    });




  }//end getDatos




  ////////////////////////////////////////////////
  faseCarga():void{

    this.fasesCargadas++;
    if(this.fasesCargadas == this.nFases){
      this.cargaCompletada = true;
    }
  
  }
  ////////////////////////////////////////////////
  



}
