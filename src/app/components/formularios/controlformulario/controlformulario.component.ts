import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { Formularios } from 'src/app/models/Formulario';
import { Encuestas } from 'src/app/models/Encuestas';

@Component({
  selector: 'app-controlformulario',
  templateUrl: './controlformulario.component.html',
  styleUrls: ['./controlformulario.component.css']
})
export class ControlformularioComponent implements OnInit {

  public identity;
  public formularios: any = {};
  public formularioId: number;
  //public encuestas: any = {};
  public encuestas: Array<Encuestas> = [];
  public totalRecords: number;
  public page: number = 1; 

  constructor(
    private _userService: UserService,
    private _formularioService: FormularioService,
    private _encuestasService: EncuestasService,
    private toastr: ToastrService,
    private _router: Router,
  ) {
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this._formularioService.get_formularios(0).subscribe(
      response => {
        this.formularios = response;

      },
      err => {

      }
    )

  }

  responderFormulario() {
    if (this.formularioId !== null && this.formularioId > 0) {
      this._router.navigate(['responderformulario/' + this.formularioId])
    }
    else {
      this.toastr.error('Seleccione un formulario a responder');
    }
  }

  changeFormulario(e: any) {
    this.encuestas = [];
    this._encuestasService.get_encuestas_all(e.target.value).subscribe(
      response => {

        this.totalRecords = response.length;    
        
        response.forEach(item => {

          let encuestas = new Encuestas(0, 0, '', '', 0, 0);
          encuestas.P_ID_FORMULARIO = item.ID_FORMULARIO;
          encuestas.P_ID_ENCUESTA = item.ID_ENCUESTA;
          encuestas.P_FORMULARIO_NOMBRE = item.NOMBRE;
          encuestas.P_FECHA_REGISTRO = item.FECHA_CONFIRMACION;
          encuestas.P_CONFIRMAR_REGISTRO = item.CONFIRMAR_ENCUESTA;
          encuestas.P_USUARIO_NOMBRE = item.NOMBRE_COMPLETO
          this.encuestas.push(encuestas);

        });
      },
      err => {

      }
    );


  }

  Estado(idConfirmar) {
    if (idConfirmar === 1) {
      return true
    } else {
      return false
    }

  }

}
