import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { Formularios } from 'src/app/models/Formulario';
import { Encuestas } from 'src/app/models/Encuestas';

@Component({
  selector: 'app-informaciongeneral',
  templateUrl: './informaciongeneral.component.html',
  styleUrls: ['./informaciongeneral.component.css']
})
export class InformaciongeneralComponent implements OnInit {

  public identity;
  public formularios: any = {};
  public formularioId: number;
  public totalRecords: number;
  public page: number = 1; 
  //public encuestas: any = {};
  public encuestas: Array<Encuestas> = [];

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
    this._formularioService.get_formularios_asignados(this.identity.ID_USUARIO).subscribe(
      response => {
        this.formularios = response;
      },
      err => {

      }
    );
    
  }

  responderFormulario(){
    if(this.formularioId !== null && this.formularioId > 0){
      this._router.navigate(['responderformulario/' + this.formularioId])
    }
    else
    {
      this.toastr.error('Seleccione un formulario a responder');
    }
  }

  changeFormulario(e: any) {
    this.encuestas = [];
    this._encuestasService.get_encuestas(e.target.value, this.identity.ID_USUARIO ).subscribe(
      response => {
        this.totalRecords = response.length;    
        response.forEach(item => {

          let encuestas = new Encuestas(0,0,'','',0,0);
          encuestas.P_ID_FORMULARIO = item.ID_FORMULARIO;
          encuestas.P_ID_ENCUESTA = item.ID_ENCUESTA;
          encuestas.P_FORMULARIO_NOMBRE = item.NOMBRE_FORMULARIO; 
          encuestas.P_ESTADO = item.ESTADO;
          encuestas.P_FECHA_REGISTRO = item.FECHA_REGISTRO; 
          encuestas.P_CONFIRMAR_REGISTRO = item.CONFIRMAR_ENCUESTA;

          this.encuestas.push(encuestas);
          
        });
      },
      err => {

      }
    );

      
  }

  Estado(idConfirmar){
    if(idConfirmar === 1){
      return true
    }else{
      return false
    }

  }


}
