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
import { DetailInmuebleComponent } from './components/detail-inmueble/detail-inmueble.component';
import { ListFinderComponent } from './components/list-finder/list-finder.component';
import { adminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"list-tipo",component:ListTipoComponent,canActivate:[adminGuard]},
  {path:"list-provincia",component:ListProvinciaComponent,canActivate:[adminGuard]},
  {path:"list-poblacion",component:ListPoblacionComponent,canActivate:[adminGuard]},
  {path:"list-inmueble",component:ListInmuebleComponent,canActivate:[adminGuard]},
  {path:"list-finder/:po/:ti/:op",component:ListFinderComponent},
  {path:"add-tipo",component:AddTipoComponent,canActivate:[adminGuard]},
  {path:"add-provincia",component:AddProvinciaComponent,canActivate:[adminGuard]},
  {path:"add-poblacion",component:AddPoblacionComponent,canActivate:[adminGuard]},
  {path:"add-inmueble",component:AddInmuebleComponent,canActivate:[adminGuard]},
  {path:"add-imagen/:id",component:AddImagenComponent,canActivate:[adminGuard]},
  {path:"detail-inmueble/:id",component:DetailInmuebleComponent},
  {path:"edit-tipo/:id",component:EditTipoComponent,canActivate:[adminGuard]},
  {path:"edit-provincia/:id",component:EditProvinciaComponent,canActivate:[adminGuard]},
  {path:"edit-inmueble/:id",component:EditInmuebleComponent,canActivate:[adminGuard]},
  {path:"edit-poblacion/:id",component:EditPoblacionComponent,canActivate:[adminGuard]},
  {path:"login",component:LoginComponent},
  {path:"error",component:ErrorComponent},
  {path:"**", component:ErrorComponent}//Poner siempre en la última posición!!!

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
