import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { EditInmuebleComponent } from './components/edit-inmueble/edit-inmueble.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './components/header/header.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarrouselHomeComponent } from './components/carrousel-home/carrousel-home.component';
import { CabeceraFooterComponent } from './components/cabecera-footer/cabecera-footer.component';
import { MenuFooterComponent } from './components/menu-footer/menu-footer.component';
import { PieFooterComponent } from './components/pie-footer/pie-footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ListHomeComponent } from './components/list-home/list-home.component';
import { ListTipoComponent } from './components/list-tipo/list-tipo.component';
import { AddTipoComponent } from './components/add-tipo/add-tipo.component';
import { EditTipoComponent } from './components/edit-tipo/edit-tipo.component';
import { ListProvinciaComponent } from './components/list-provincia/list-provincia.component';
import { AddProvinciaComponent } from './components/add-provincia/add-provincia.component';
import { EditProvinciaComponent } from './components/edit-provincia/edit-provincia.component';
import { ListPoblacionComponent } from './components/list-poblacion/list-poblacion.component';
import { AddPoblacionComponent } from './components/add-poblacion/add-poblacion.component';
import { EditPoblacionComponent } from './components/edit-poblacion/edit-poblacion.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ListInmuebleComponent } from './components/list-inmueble/list-inmueble.component';
import { AddInmuebleComponent } from './components/add-inmueble/add-inmueble.component';
import { Cabecera1Component } from './components/cabecera1/cabecera1.component';
import { AddImagenComponent } from './components/add-imagen/add-imagen.component';
import{ApiInterceptor} from './utils/api.interceptor';
import { FichaInmuebleComponent } from './components/ficha-inmueble/ficha-inmueble.component';
import { CarouselFichaComponent } from './components/carousel-ficha/carousel-ficha.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuPrincipalComponent,
    FooterComponent,
    CarrouselHomeComponent,
    CabeceraFooterComponent,
    MenuFooterComponent,
    PieFooterComponent,
    HomeComponent,
    ErrorComponent,
    ListHomeComponent,
    ListTipoComponent,
    AddTipoComponent,
    EditTipoComponent,
    ListProvinciaComponent,
    AddProvinciaComponent,
    EditProvinciaComponent,
    ListPoblacionComponent,
    AddPoblacionComponent,
    EditPoblacionComponent,
    PreloaderComponent,
    ListInmuebleComponent,
    AddInmuebleComponent,
    EditInmuebleComponent,
    Cabecera1Component,
    AddImagenComponent,
    FichaInmuebleComponent,
    CarouselFichaComponent,
    
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ApiInterceptor,
      multi:true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

