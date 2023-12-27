import { Component } from '@angular/core';
import { Inmueble, Poblacion, Tipo } from '../../models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from '../../services/inmueble.service';
import { PoblacionService } from '../../services/poblacion.service';
import { TipoService } from '../../services/tipo.service';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-edit-inmueble',
  templateUrl: './edit-inmueble.component.html',
  styleUrl: './edit-inmueble.component.css'
})
export class EditInmuebleComponent {
   /////////////////////////////////////////////////
   nFases:number=3;
   cargaCompletada:boolean=false;
   fasesCargadas:number=0;
   /////////////////////////////////////////////////

   id:number;

   aPoblaciones:Poblacion[];
   aTipos:Tipo[];

   inmueble:Inmueble;

   /* inmueble:Inmueble={

     activo:1,
     amueblado:0,
     apertura:"",
     ascensor:0,
     cp:"",
     descripcion:"",
     jardin:0,
     nombreVia:"",
     numero:"",
     numeroBalcones:"",
     numeroBanhos:"",
     numeroHabitaciones:"",
     orientacion:"",
     piscina:0,
     planta:"",
     plazasGaraje:"",
     portada:0,
     precio:0,
     puerta:"",
     superficieConstruida:"",
     superficieUtil:"",
     tendedero:0,
     tipoCalefaccion:"",
     titular:"",
     trastero:0,
     via:"",
     poblacion:{
       nombre:"",
       provincia:{
         nombre:"",
         activo:0
 
       },
       activo:0
     },
     tipo:{
       nombre:"",
       activo:0
     }
   
 
   } */


   constructor(
     private _inmuebleService:InmuebleService,
     private _poblacionService:PoblacionService,
     private _tipoService:TipoService,
     private _route:ActivatedRoute,
     private _router:Router,
     private _comunicationService:ComunicationService
   ){}


 ngOnInit(): void {
   this._comunicationService.cambioPortada(false);
   this._comunicationService.cambioFooter(false);
   this.getDatos();
 }


 getDatos():void{

     //El primer dato que necesito es es id de la ruta, porque sin él no podemos
   //acceder a los atributos del abjeto a modificar
   this._route.params.subscribe({

     next:(params)=>{
       this.id=params['id'];    
     
     }
     ,
     error:(error)=>{this._router.navigate(["/error"])}

   });//NO TIENE COMPLETE


   //Cargamos el inmueble con el id que nos llega en la URL

   this._inmuebleService.getInmueble(this.id).subscribe({

     next: (datos)=>{

         //Mapeamos los datos en la interface inmueble preparada para ello
         this.inmueble = datos;

         /* this.inmueble.id= datos.id;
         this.inmueble.activo= datos.activo; //Asigna el 1 como true y el 0 como false
         this.inmueble.amueblado=datos.amueblado;
         this.inmueble.apertura=datos.apertura;
         this.inmueble.ascensor=datos.ascensor;
         this.inmueble.cp=datos.cp;
         this.inmueble.descripcion=datos.descripcion;
         this.inmueble.jardin=datos.jardin;
         this.inmueble.nombreVia=datos.nombreVia;
         this.inmueble.numero=datos.numero;
         this.inmueble.numeroBalcones=datos.numeroBalcones;
         this.inmueble.numeroBanhos=datos.numeroBanhos;
         this.inmueble.numeroHabitaciones=datos.numeroHabitaciones;
         this.inmueble.orientacion=datos.orientacion;
         this.inmueble.piscina=datos.piscina;
         this.inmueble.planta=datos.planta;
         this.inmueble.plazasGaraje=datos.plazasGaraje;
         this.inmueble.portada=datos.portada;
         this.inmueble.precio=datos.precio; 
         this.inmueble.puerta=datos.puerta;
         this.inmueble.superficieConstruida=datos.superficieConstruida;
         this.inmueble.superficieUtil=datos.superficieUtil; 
         this.inmueble.tendedero=datos.tendedero;
         this.inmueble.tipoCalefaccion=datos.tipoCalefaccion;
         this.inmueble.titular=datos.titular;
         this.inmueble.trastero=datos.trastero;
         this.inmueble.via=datos.via;
         this.inmueble.poblacion=datos.poblacion;
         this.inmueble.tipo=datos.tipo;
       
         */
         
         
       
     }
     ,
     error: (error)=>{this._router.navigate(['/error'])}
     ,
     complete: ()=>{this.faseCarga()}


   });


   //Rellenar el select población con los datos de la BBDD
   this._poblacionService.getPoblaciones().subscribe({

     next: (datos)=>{this.aPoblaciones = datos}
     ,
     error: (error)=>{this._router.navigate(['/error'])}
     ,
     complete: ()=>{this.faseCarga()}

   });



   //Rellenar el select tipo con los datos de la BBDD
   this._tipoService.getTipos().subscribe({

     next: (datos)=>{this.aTipos = datos}
     ,
     error: (error)=>{this._router.navigate(['/error'])}
     ,
     complete: ()=>{this.faseCarga()}

   });




 }




edit():void{

 //Convertimos los valores booleanos de los check box en formato number
 this.inmueble.activo = Number(this.inmueble.activo);
 this.inmueble.portada = Number(this.inmueble.portada);
 this.inmueble.ascensor = Number(this.inmueble.ascensor);
 this.inmueble.tendedero = Number(this.inmueble.tendedero);
 this.inmueble.amueblado = Number(this.inmueble.amueblado);
 this.inmueble.trastero = Number(this.inmueble.trastero);
 this.inmueble.piscina = Number(this.inmueble.piscina);
 this.inmueble.jardin = Number(this.inmueble.jardin);


 this._inmuebleService.updateInmueble(this.inmueble).subscribe({


   next: (datos)=>{console.log(datos);}
     ,
     error: (error)=>{this._router.navigate(['/error'])}
     ,
     complete: ()=>{this._router.navigate(["/list-inmueble"]);}

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
