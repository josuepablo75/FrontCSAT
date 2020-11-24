import{ Routes, RouterModule } from "@angular/router";
import{ ModuleWithProviders } from "@angular/core";
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
//import { MessengerComponent } from './components/messenger/messenger.component';
//import { PerfilComponent } from './components/perfil/perfil.component';
import { TweetsComponent } from './components/tweets/tweets.component';
//import { LogoutComponent } from './components/logout/logout.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CSATLayoutComponent} from  './components/c-satlayout/c-satlayout.component'; 
import { ContentComponent} from './components/UI/content/content.component';
import { ActualizarusuarioComponent} from './components/usuarios/actualizarusuario/actualizarusuario.component'; 
import { RegistrarformularioComponent} from './components/formularios/registrarformulario/registrarformulario.component'; 
import { FormularioInformacionComponent } from './components/formularios/formulario-informacion/formulario-informacion.component';
import { ActualizarFormularioComponent } from './components/formularios/actualizar-formulario/actualizar-formulario.component';
import { AsignarformularioComponent } from './components/formularios/asignarformulario/asignarformulario.component';
import { InformaciongeneralComponent } from './components/formularios/preguntas/informaciongeneral/informaciongeneral.component';
import { ResponderformularioComponent } from './components/formularios/preguntas/responderformulario/responderformulario.component';
import { ActualizarrespuestasComponent } from './components/formularios/preguntas/actualizarrespuestas/actualizarrespuestas.component';
import { VisualizarrespuestasComponent } from './components/formularios/preguntas/visualizarrespuestas/visualizarrespuestas.component';
import { GestioncatalogosComponent } from './components/formularios/gestioncatalogos/gestioncatalogos.component';
import { ControlformularioComponent } from './components/formularios/controlformulario/controlformulario.component';





const appRouter: Routes = [
  //  {path: 'registro',component:RegistroComponent},
    {path: 'login', component:LoginComponent},
  ///  {path: 'messenger', component: MessengerComponent},
 //   {path: 'perfil', component: PerfilComponent}, 
    {path: 'tweets', component: TweetsComponent }, 
  //  {path: 'logout', component: LogoutComponent}, 
  //   
  { path: '', component: CSATLayoutComponent, children: [
    { path: '', component: ContentComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'content', component: ContentComponent }, 
    { path: 'usuarios', component: UsuariosComponent }, 
    { path: 'actualizar/:id_usuario', component: ActualizarusuarioComponent }, 
    { path: 'registrarformulario', component: RegistrarformularioComponent }, 
    { path: 'formularios', component: FormularioInformacionComponent }, 
    { path: 'actualizarformulario/:id_formulario', component: ActualizarFormularioComponent }, 
    { path: 'asignarformulario', component: AsignarformularioComponent }, 
    { path: 'formulariosasignados', component: InformaciongeneralComponent },
    { path: 'responderformulario/:id_formulario', component: ResponderformularioComponent },
    { path: 'actualizarrespuesta/:id_formulario/:id_encuesta', component: ActualizarrespuestasComponent },
    { path: 'verrespuestas/:id_formulario/:id_encuesta', component: VisualizarrespuestasComponent },
    { path: 'gestioncatalogos', component: GestioncatalogosComponent },
    { path: 'controlformulario', component: ControlformularioComponent }
  ]}, 
]

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter);