import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { appRoutingProviders, routing } from "./app.routing";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelect2Module } from 'ng-select2';
import { LocationService } from './services/location.service';
import { NgxPaginationModule } from 'ngx-pagination';

import { RegistroComponent } from './components/registro/registro.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { MenuComponent } from './components/UI/menu/menu.component';
import { ContentComponent } from './components/UI/content/content.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { SettingComponent } from './components/UI/setting/setting.component';
import { CSATLayoutComponent } from './components/c-satlayout/c-satlayout.component';
import { ActualizarusuarioComponent } from './components/usuarios/actualizarusuario/actualizarusuario.component';
import { RegistrarformularioComponent } from './components/formularios/registrarformulario/registrarformulario.component';
import { FormularioInformacionComponent } from './components/formularios/formulario-informacion/formulario-informacion.component';
import { ActualizarFormularioComponent } from './components/formularios/actualizar-formulario/actualizar-formulario.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AsignarformularioComponent } from './components/formularios/asignarformulario/asignarformulario.component';
import { InformaciongeneralComponent } from './components/formularios/preguntas/informaciongeneral/informaciongeneral.component';
import { ResponderformularioComponent } from './components/formularios/preguntas/responderformulario/responderformulario.component';
import { ActualizarrespuestasComponent } from './components/formularios/preguntas/actualizarrespuestas/actualizarrespuestas.component';
import { VisualizarrespuestasComponent } from './components/formularios/preguntas/visualizarrespuestas/visualizarrespuestas.component';
import { GestioncatalogosComponent } from './components/formularios/gestioncatalogos/gestioncatalogos.component';
import { ControlformularioComponent } from './components/formularios/controlformulario/controlformulario.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    MessengerComponent,
    PerfilComponent,
    TweetsComponent,
    LogoutComponent,
    UsuariosComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    SettingComponent,
    CSATLayoutComponent,
    ActualizarusuarioComponent,
    RegistrarformularioComponent,
    FormularioInformacionComponent,
    ActualizarFormularioComponent,
    FilterPipe,
    AsignarformularioComponent,
    InformaciongeneralComponent,
    ResponderformularioComponent,
    ActualizarrespuestasComponent,
    VisualizarrespuestasComponent,
    GestioncatalogosComponent,
    ControlformularioComponent,

 

    //LoginsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 2000, 
      preventDuplicates:false
    }),
    NgSelect2Module, 
    NgxPaginationModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
