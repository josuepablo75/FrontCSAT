import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { GLOBAL } from "../../services/GLOBAL";
import { identity } from 'rxjs';
import { Message } from "../../models/Message";
import * as io from "socket.io-client";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
 
  public identity
  public usuarios: any = {};  
  public id_usuario: number; 
  public totalRecords: number; 
  public page: number = 1; 

  constructor(
    private _userService: UserService,
    private _router: Router, 
    private toastr: ToastrService 
    ) {
 
    this.identity = this._userService.getIdentity()

    } 

    

  ngOnInit(): void {
    this._userService.get_usuarios(0).subscribe(
      response => {
        this.usuarios = response;   
        this.totalRecords = response.length;    
      },
      err => {
        
      }
    )

 
    
  }

  actualizarUsuario(id_usuario){
    this._router.navigateByUrl('actualizar/' + id_usuario)
  }

  actualizarEstadoUsuario(id_usuario, estado) {
    var datos_deshabilitar: any = {};

     datos_deshabilitar = {
      ID_USUARIO: id_usuario,
      ESTADO: estado
    }

    this._userService.actualizarestado(datos_deshabilitar).subscribe(
      response => {
        this.toastr.success(response.mensaje);
        this.usuarios.forEach(element => {
          if (element.ID_USUARIO === id_usuario)
            {
              element.ESTADO = estado; 
            }
        });
      },
      error => {
      }
    )
  }

  
  Estado(estado){
  if (estado === 1){
    return true; 
  }else{
    return false; 
  }
    
  }

  setUsuarioid(id_formulario) {
    this.id_usuario = id_formulario;
  }

  InactivarUsuario() {
    this.actualizarEstadoUsuario(this.id_usuario, 0);
    this.id_usuario = 0;
  }

}

