import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { Nivel } from 'src/app/models/Niveles';
import { Catalogo } from 'src/app/models/Catalogos';

@Component({
  selector: 'app-gestioncatalogos',
  templateUrl: './gestioncatalogos.component.html',
  styleUrls: ['./gestioncatalogos.component.css']
})
export class GestioncatalogosComponent implements OnInit {

  public identity
  public nombreCatalogo;
  public titulocatalogo;
  public titulocatalogo_display;
  public catalogos_registrados: Array<Catalogo> = []; 
  public niveles: Array<Nivel> = [];
  public catalogos: Catalogo ;
  public contador: number=0;
  public cont: number=0;
  public nivelseleciconado: number =1;
  public totalRecords: number;
  public page: number = 1; 

  constructor(
    private _userService: UserService,
    private _formularioService: FormularioService,
    private toastr: ToastrService, 
  ) { 
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.catalogos = new Catalogo(0,0,'','',[])
    let nivel = new Nivel(0,'',0);
    this.contador++;
    nivel.P_ID_NIVEL = this.contador;
    nivel.P_TITULONIVEL= 'Catalogo Padre';
    this.niveles.push(nivel);

    this._formularioService.get_catalogos().subscribe(
      response => {

        this.totalRecords = response.length;    

        response.forEach(element=>{
          let catalogo = new Catalogo(0, 0, '', '', [], 0, 0);
          catalogo.P_ID_CATALOGO = element.ID_CATALOGO;
          catalogo.P_CATALOGO_TITULO = element.TITULO_CATALOGO;
          catalogo.P_CATALAGO_NOMBRE = element.TABLA;
          catalogo.P_ESTADO = element.ESTADO; 
          catalogo.P_FECHA_REGISTRO = element.FECHA_REGISTRO;
          catalogo.P_CATALOGO_DISPLAY = element.TITULO_DISPLAY;
          this.catalogos_registrados.push(catalogo);
        })
        

      },
      err => {

      }
    )
    
  }

  AgregarCatalogo(){

    if(this.catalogos.P_ID_CATALOGO === 0 )
    {
      this.cont++;
      this.contador++;
      this.catalogos.P_ID_CATALOGO = this.cont;
      this.catalogos.P_CATALAGO_NOMBRE = this.nombreCatalogo;
      this.catalogos.P_ID_NIVEL = this.nivelseleciconado;
      this.catalogos.P_CATALOGO_TITULO = this.titulocatalogo; 
      let nivel = new Nivel(0, '', 0);
      nivel.P_ID_NIVEL = this.contador;
      nivel.P_TITULONIVEL = 'Hijo del catalogo ' + this.nombreCatalogo;
      this.niveles.push(nivel);

      //dtc_deptto
    }
    else{
      //dtc_deptto
      if(this.catalogos.P_CATALOOGO_HIJOS.length === 0)
      {
        if (this.catalogos.P_ID_NIVEL < this.nivelseleciconado) {
          this.cont++;
          this.contador++;
          let catalogo = new Catalogo(0,0,'','',[]);
          catalogo.P_ID_CATALOGO = this.cont;
          catalogo.P_CATALAGO_NOMBRE = this.nombreCatalogo;
          catalogo.P_ID_NIVEL = this.nivelseleciconado;
          catalogo.P_CATALOGO_TITULO = this.titulocatalogo
          this.catalogos.P_CATALOOGO_HIJOS.push(catalogo);
          let nivel = new Nivel(0, '', 0);
          nivel.P_ID_NIVEL = this.contador;
          nivel.P_TITULONIVEL = 'Hijo del catalogo ' + this.nombreCatalogo;
          this.niveles.push(nivel);
          //dtc_muni
        }
      }
      else{
        //dtc_muni
        this.catalogos.P_CATALOOGO_HIJOS.forEach(element=>{
          if ( element.P_CATALOOGO_HIJOS.length === 0) {
            if (element.P_ID_NIVEL < this.nivelseleciconado) {
            this.cont++;
            this.contador++;
            let catalogo = new Catalogo(0, 0, '', '', []);
            catalogo.P_ID_CATALOGO = this.cont;
            catalogo.P_CATALAGO_NOMBRE = this.nombreCatalogo;
            catalogo.P_ID_NIVEL = this.nivelseleciconado;
            catalogo.P_CATALOGO_TITULO = this.titulocatalogo
            element.P_CATALOOGO_HIJOS.push(catalogo);
            let nivel = new Nivel(0, '', 0);
            nivel.P_ID_NIVEL = this.contador;
            nivel.P_TITULONIVEL = 'Hijo del catalogo ' + this.nombreCatalogo;
            this.niveles.push(nivel);
            //dtc_zona
            }
          } 
          else{
              element.P_CATALOOGO_HIJOS.forEach(ele=>{
                if (ele.P_CATALOOGO_HIJOS.length === 0) {

                  if (ele.P_ID_NIVEL < this.nivelseleciconado) {
                  this.cont++;
                  this.contador++;
                  let catalogo = new Catalogo(0, 0, '', '', []);
                  catalogo.P_ID_CATALOGO = this.cont;
                  catalogo.P_CATALAGO_NOMBRE = this.nombreCatalogo;
                  catalogo.P_ID_NIVEL = this.nivelseleciconado;
                  catalogo.P_CATALOGO_TITULO = this.titulocatalogo
                  ele.P_CATALOOGO_HIJOS.push(catalogo);
                  }
                  
                } 

              })
          }
        })      

      }
     
    }

    this.nombreCatalogo = '';
    this.titulocatalogo = '';
  }

  ReiniciarLista(){
    this.catalogos.P_ID_CATALOGO = 0;
    this.catalogos.P_CATALAGO_NOMBRE = '';
    this.catalogos.P_ID_NIVEL = 0;
    this.catalogos.P_CATALOOGO_HIJOS=[];
    this.niveles = []; 

    this.contador = 0;
    this.cont=0;

    this.contador++;
    let nivel = new Nivel(0, '', 0);
    nivel.P_ID_NIVEL = this.contador;
    nivel.P_TITULONIVEL = 'Catalogo Padre';
    this.niveles.push(nivel);

  }

  Registrar(){
    this.catalogos.P_CATALOGO_DISPLAY = this.titulocatalogo_display
    this.catalogos.P_ID_USUARIO_REGISTRA = this.identity.ID_USUARIO;
    if (String(this.catalogos.P_CATALOGO_DISPLAY).length > 0 && this.catalogos.P_CATALOGO_DISPLAY !== undefined){
      if(this.catalogos.P_ID_CATALOGO > 0)
      {
        this._formularioService.registrar_catalogo(this.catalogos).subscribe(
          response => {
            this.toastr.success(response.mensaje);

            let catalogo = new Catalogo(0, 0, '', '', [], 0, 0);
            var date = new Date();
            catalogo.P_ID_CATALOGO = response.p_result;
            catalogo.P_CATALOGO_TITULO = this.catalogos.P_CATALOGO_TITULO;
            catalogo.P_CATALAGO_NOMBRE = this.catalogos.P_CATALAGO_NOMBRE;
            catalogo.P_CATALOGO_DISPLAY = this.catalogos.P_CATALOGO_DISPLAY;
            catalogo.P_ESTADO = 1;
            catalogo.P_FECHA_REGISTRO = response.p_fecha;
            this.catalogos_registrados.push(catalogo);

            this.catalogos.P_CATALOGO_TITULO = '';
            this.catalogos.P_ID_CATALOGO = 0;
            this.catalogos.P_CATALAGO_NOMBRE = '';
            this.catalogos.P_ID_NIVEL = 0;
            this.catalogos.P_CATALOOGO_HIJOS = [];
            this.niveles = [];
            this.titulocatalogo = '';
            this.titulocatalogo_display= '';
            this.contador = 0;
            this.cont = 0;

            let nivel = new Nivel(0, '', 0);
            this.contador++;
            nivel.P_ID_NIVEL = this.contador;
            nivel.P_TITULONIVEL = 'Catalogo Padre';
            this.niveles.push(nivel);
            
          },
          error  => {
            this.toastr.error(error.error.mensaje);
          }
        )
      
      }
      else{
        this.toastr.error("Ingrese al menos un catalogo");
      }
    }else{
      this.toastr.error("Ingrese el titulo del catalogo");
    }
    
  }


  Estado(estado) {
    if (estado === 1) {
      return true;
    } else {
      return false;
    }

  }

  ActualizarEstado(id_catalogo, estado) {
    var datos_deshabilitar: any = {};

    datos_deshabilitar = {
      P_ID_CATALOGO: id_catalogo,
      P_ESTADO: estado
    }

    this._formularioService.actualizarestado_catalogo(datos_deshabilitar).subscribe(
      response => {
        this.toastr.success(response.mensaje);
        this.catalogos_registrados.forEach(element => {
          if (element.P_ID_CATALOGO === id_catalogo) {
            element.P_ESTADO = estado;
          }
        });
      },
      error => {
      }
    )


  }

}
