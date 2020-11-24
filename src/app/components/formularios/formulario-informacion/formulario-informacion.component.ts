import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/services/formulario.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-formulario-informacion',
  templateUrl: './formulario-informacion.component.html',
  styleUrls: ['./formulario-informacion.component.css']
})
export class FormularioInformacionComponent implements OnInit {

  public identity
  public formularios: any = {};
  public id_formulario: number;   
  public totalRecords: number;
  public page: number = 1; 

  constructor(
    private _userService: UserService,
    private _formularioService: FormularioService,
    private _router: Router,
    private toastr: ToastrService, 

  ) { 
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this._formularioService.get_formularios(0).subscribe(
      response => {
        this.formularios = response;
        this.totalRecords = response.length;    
      },
      err => {

      }
    )


  }

  actualizarFormulario(id_formulario) {
    this._router.navigate(['actualizarformulario/' + id_formulario])
  }

  Estado(estado) {
    if (estado === 1) {
      return true;
    } else {
      return false;
    }

  }

  actualizarEstadoFormulario(id_formulario, estado) {
    var datos_deshabilitar: any = {};

    datos_deshabilitar = {
      P_ID_FORMULARIO: id_formulario,
      P_ESTADO: estado
    }

    this._formularioService.actualizarestado(datos_deshabilitar).subscribe(
      response => {
        this.toastr.success(response.mensaje);
        this.formularios.forEach(element => {
          if (element.ID_FORMULARIO === id_formulario) {
            element.ESTADO = estado;
          }
        });
      },
      error => {
      }
    )
  }

  setFormularioid(id_formulario){
    this.id_formulario = id_formulario; 
  }

  InactivarFormulario(){
    this.actualizarEstadoFormulario(this.id_formulario, 0); 
    this.id_formulario = 0;
  }

}
