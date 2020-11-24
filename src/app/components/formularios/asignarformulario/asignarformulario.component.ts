import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Formularios } from 'src/app/models/Formulario';
import { FormularioService } from 'src/app/services/formulario.service';
import { User } from 'src/app/models/User';
import { element } from 'protractor';
import { Asignaciones } from 'src/app/models/Asignaciones';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asignarformulario',
  templateUrl: './asignarformulario.component.html',
  styleUrls: ['./asignarformulario.component.css']
})
export class AsignarformularioComponent implements OnInit {

  public formulario; 
  public identity
  public usuarios: Array<User> = [];
  public usuarios_con_asignacion: Array<User> = [];  
  public formularios: any = {};
  public formularioId: number;

  public usuarios_disponibles: User[]; 
  public usuarios_asignados: User[];

  public Asignaciones: Array<Asignaciones> = []; 
  
  constructor(
    private _userService: UserService,
    private _formularioService: FormularioService,
    private toastr: ToastrService, 
  ) { 
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {

    this._formularioService.get_formularios(1).subscribe(
      response => {
        this.formularios = response;

      },
      err => {

      }
    );
    
  }

  changeFormulario(e: any) {

  this.usuarios = [];
  this.usuarios_con_asignacion = []; 
  this.usuarios_disponibles= [];
  this.usuarios_asignados=  [];
  this.Asignaciones = [];
  
    this._formularioService.get_usuarios_disponibles(e.target.value).subscribe(
      response => {
        this.usuarios = response;
      },
      err => {

      }
    );

    this._formularioService.get_usuarios_asignados(e.target.value).subscribe(
      response => {
        this.usuarios_con_asignacion = response;
      },
      err => {

      }
    );

  }

  AsignarUsuarios(){

    if(Number(this.formularioId) > 0)
    {   
        let x=0;
        try {
          this.usuarios_disponibles.forEach(ele=>{
            x++;
          })
        } catch (error) {
        }
      
        if (x>0)
        { 
          let contador = 0;
          this.usuarios_disponibles.forEach(element => {

            contador++;
            let asignaciones = new Asignaciones(0, 0, 0, 0, 0, 0);
            asignaciones.P_ID_ASIGNACION = contador;
            asignaciones.P_ID_USUARIO_ASIGNADO = element.ID_USUARIO;
            asignaciones.P_ID_FORMULARIO = Number(this.formularioId);
            asignaciones.P_ID_USUARIO_ASIGNA = this.identity.ID_USUARIO;
            asignaciones.P_ESTADO = 1;
            this.Asignaciones.push(asignaciones);

            //let usuario = new User(0, 0, '', '', '', '', '', '', '', '', '', '', '', 0, 0, [], [], [], '');
            //usuario.ID_USUARIO = element.ID_USUARIO
            //this.usuarios_con_asignacion.push(usuario);
            //this.usuarios.splice(this.usuarios.findIndex(item => item.ID_USUARIO === element.ID_USUARIO), 1);
          })

          //INSERTAR Y CONSUMIR API
          this._formularioService.asignarFormulario(this.Asignaciones).subscribe(
            response => {

             this.toastr.success(response.mensaje);

            },
            error => {
              this.toastr.error(error.error.mensaje);
            }

          );

          this.usuarios_disponibles.forEach(element => {
            let usuario = new User(0, 0, '', '', '', '', '', '', '', '', '', '', '', 0, 0, [], [], [], '');
            usuario.ID_USUARIO = element.ID_USUARIO
            usuario.PRIMER_NOMBRE = element.PRIMER_NOMBRE
            usuario.SEGUNDO_NOMBRE = element.SEGUNDO_NOMBRE
            usuario.PRIMER_APELLIDO = element.PRIMER_APELLIDO
            usuario.SEGUNDO_APELLIDO = element.SEGUNDO_APELLIDO
            usuario.CUI = element.CUI
            this.usuarios_con_asignacion.push(usuario);
            this.usuarios.splice(this.usuarios.findIndex(item => item.ID_USUARIO === element.ID_USUARIO), 1);
          })  
        
          //console.log(JSON.stringify(this.Asignaciones));
          this.usuarios_disponibles = [];
          this.Asignaciones = [];

        }
        else {
          this.toastr.error('Seleccione uno o varios usuarios para realizar la asignacion');
        }


    }else{
      this.toastr.error('Seleecione un formulario para realizar la asignacion');
    }
    
  }
  
  DesAsignarUsuarios(){
    if (Number(this.formularioId) > 0) {
      let x = 0;
      try {
        this.usuarios_asignados.forEach(ele => {
          x++;
        })
      } catch (error) {
      }

      if (x > 0) {
        let contador = 0;
        this.usuarios_asignados.forEach(element => {

          contador++;
          let asignaciones = new Asignaciones(0, 0, 0, 0, 0, 0);
          asignaciones.P_ID_ASIGNACION = contador;
          asignaciones.P_ID_USUARIO_ASIGNADO = element.ID_USUARIO;
          asignaciones.P_ID_FORMULARIO = Number(this.formularioId);
          asignaciones.P_ID_USUARIO_DESASIGNA = this.identity.ID_USUARIO;
          asignaciones.P_ESTADO = 0;
          this.Asignaciones.push(asignaciones);

          //let usuario = new User(0, 0, '', '', '', '', '', '', '', '', '', '', '', 0, 0, [], [], [], '');
          //usuario.ID_USUARIO = element.ID_USUARIO
          //this.usuarios_con_asignacion.push(usuario);
          //this.usuarios.splice(this.usuarios.findIndex(item => item.ID_USUARIO === element.ID_USUARIO), 1);
        })

        //INSERTAR Y CONSUMIR API
        this._formularioService.desasignarFormulario(this.Asignaciones).subscribe(
          response => {
            this.toastr.success(response.mensaje);

          },
          error => {
            this.toastr.error(error.error.mensaje);
          }

        );

        this.usuarios_asignados.forEach(element => {
          let usuario = new User(0, 0, '', '', '', '', '', '', '', '', '', '', '', 0, 0, [], [], [], '');
          usuario.ID_USUARIO = element.ID_USUARIO
          usuario.PRIMER_NOMBRE = element.PRIMER_NOMBRE
          usuario.SEGUNDO_NOMBRE = element.SEGUNDO_NOMBRE
          usuario.PRIMER_APELLIDO = element.PRIMER_APELLIDO
          usuario.SEGUNDO_APELLIDO = element.SEGUNDO_APELLIDO
          usuario.CUI = element.CUI
          this.usuarios.push(usuario);
          this.usuarios_con_asignacion.splice(this.usuarios_con_asignacion.findIndex(item => item.ID_USUARIO === element.ID_USUARIO), 1);

        })


        //console.log(JSON.stringify(this.Asignaciones));
        this.usuarios_asignados = [];
        this.Asignaciones = [];

      }
      else {
        this.toastr.error('Seleccione uno o varios usuarios para realizar la desasignacion');
      }


    } else {
      this.toastr.error('Seleecione un formulario para realizar la desasignacion');
    }

  }

}
