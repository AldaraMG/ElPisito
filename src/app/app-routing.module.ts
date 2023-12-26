import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInmuebleComponent } from './components/add-inmueble/add-inmueble.component';
import { AddPoblacionComponent } from './components/add-poblacion/add-poblacion.component';
import { AddProvinciaComponent } from './components/add-provincia/add-provincia.component';
import { AddTipoComponent } from './components/add-tipo/add-tipo.component';
import { EditPoblacionComponent } from './components/edit-poblacion/edit-poblacion.component';
import { EditProvinciaComponent } from './components/edit-provincia/edit-provincia.component';
import { EditTipoComponent } from './components/edit-tipo/edit-tipo.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ListInmuebleComponent } from './components/list-inmueble/list-inmueble.component';
import { ListPoblacionComponent } from './components/list-poblacion/list-poblacion.component';
import { ListProvinciaComponent } from './components/list-provincia/list-provincia.component';
import { ListTipoComponent } from './components/list-tipo/list-tipo.component';
import { AddImagenComponent } from './components/add-imagen/add-imagen.component';
import { EditInmuebleComponent } from './components/edit-inmueble/edit-inmueble.component';

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"list-tipo",component:ListTipoComponent},
  {path:"list-provincia",component:ListProvinciaComponent},
  {path:"list-poblacion",component:ListPoblacionComponent},
  {path:"list-inmueble",component:ListInmuebleComponent},
  {path:"add-tipo",component:AddTipoComponent},
  {path:"add-provincia",component:AddProvinciaComponent},
  {path:"add-poblacion",component:AddPoblacionComponent},
  {path:"add-inmueble",component:AddInmuebleComponent},
  {path:"add-imagen/:id",component:AddImagenComponent},
  {path:"edit-tipo/:id",component:EditTipoComponent},
  {path:"edit-provincia/:id",component:EditProvinciaComponent},
  {path:"edit-inmueble/:id",component:EditInmuebleComponent},
  {path:"edit-poblacion/:id",component:EditPoblacionComponent},
  {path:"error",component:ErrorComponent},
  {path:"**", component:ErrorComponent}//Poner siempre en la última posición!!!

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
