import { Component, OnInit, ɵConsole } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Agrupaciones } from 'src/app/models/Agrupaciones';
import { Preguntas } from 'src/app/models/Preguntas';
import { Opciones } from 'src/app/models/Opciones';
import { Formularios } from 'src/app/models/Formulario';
import { FormularioService } from 'src/app/services/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { element } from 'protractor';
import { Catalogo } from 'src/app/models/Catalogos';
import { ItemsCatalogo } from 'src/app/models/ItemsCatalogo';

@Component({
  selector: 'app-registrarformulario',
  templateUrl: './registrarformulario.component.html',
  styleUrls: ['./registrarformulario.component.css']
})
export class RegistrarformularioComponent implements OnInit {

  public identity;
  public Form; 
  public Agrupaciones;
  public agrupaciones: Array<Agrupaciones> = [];
  public titulo: string; 
  public posicion: number = 0;
  public idOpcion: number = 0; 
  public titulopregunta: string; 
  public tipopregunta: string;
  public opcion: string;
  public opciones: Array<Opciones>= [];
  public obligatorio: boolean = false;
  public tipo_dato: any = {};
  public preguntas_predefinidas: any={};
  public tipo_dato_texto: string;
  public tipo_pregunta_predefinida: string;
  public identificador_texto: string;
  public id_pregunta: number=0;
  public texto_opcion_select: string;
  public idOpcionsecundario: number=0;

  constructor(
    private _userService: UserService,
    private _formularioService: FormularioService, 
    private toastr: ToastrService, 
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.Form = new Formularios(0,'', '', 0, [],0,0);
    this.Form.P_ID_USUARIO_REGISTRA = this.identity.ID_USUARIO; 
    this.Form.P_TITULO_F = '';
    this.titulo = null;
    this.titulopregunta = null; 
    this.opcion = null;
    this._formularioService.get_tipo_dato().subscribe(
      response => {
        this.tipo_dato= response; 
      },
      err => {

      }
    )

    this._formularioService.get_catalogos().subscribe(
      response => {
        this.preguntas_predefinidas = response;
      },
      err => {

      }
    )
  }

  

  agregarAgrupacion(titulo){

    if(titulo !== null && String(titulo).length> 5){
      this.posicion++;
      let agrupacion = new Agrupaciones(0,'', '','', [], false, false, 0, 0,0);
      agrupacion.P_ID_AGRUPACION = this.posicion;
      agrupacion.P_NUM_TAB = 'tab_' + this.posicion;
      agrupacion.P_TITULO_A = titulo;
      agrupacion.P_PREGUNTAS = [];
      this.agrupaciones.push(agrupacion);
      this.titulo = null;
    }else {
      this.toastr.error("Ingrese el titulo de la agrupacion.");
    }
   

   // console.log(JSON.stringify( this.agrupaciones));
  }

  eliminarAgrupacion(Num_tab)
  {
    //console.log(Num_tab);
    //console.log(this.agrupaciones.findIndex(item=>item.Num_tab === Num_tab))
    this.agrupaciones.splice(this.agrupaciones.findIndex(item => item.P_NUM_TAB === Num_tab), 1);  
  }

  agregarPreguntas(Num_tab, titulo, tipo){


    if (titulo !== null && String(titulo).length > 1 ) {

    if (this.identificador_texto !== undefined && String(this.identificador_texto).length >1 ){
    this.id_pregunta++; 
    let pregunta = new Preguntas(0,'', '', 0, [], 0, false, 0, '', [], '', false);
    pregunta.P_ID_PREGUNTA = this.id_pregunta; 
    pregunta.P_TITULO_P = titulo; 
    pregunta.P_TIPO_DATO = this.tipo_dato_texto;
    
    pregunta.P_CAMPO_OBLIGATORIO = Number(this.obligatorio);
    pregunta.P_IDENTIFICADOR = String(this.identificador_texto).toUpperCase();

    if(Number(this.tipo_pregunta_predefinida)> 0){
      
      this._formularioService.get_catalogo(Number(this.tipo_pregunta_predefinida)).subscribe(
        response => {
            response.forEach(item=>{

              let catalogo = new Catalogo(0, 0, '', '', [], 0, 0);
              catalogo.P_ID_CATALOGO = item.ID_CATALOGO;
              catalogo.P_CATALOGO_TITULO = item.TITULO_CATALOGO;
              catalogo.P_CATALAGO_NOMBRE = item.TABLA;
              catalogo.P_ESTADO = item.ESTADO;
              catalogo.DATOS = []; 
              
               item.ITEMS.forEach(items=>{
                 let item = new ItemsCatalogo(0, '', 0);
                 item.P_ID_ITEM = items.ID_ITEM
                 item.P_DISPLAY = items.DISPLAY
                 item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                 catalogo.DATOS.push(item); 

               })
              
              item.CATALOGO_HIJO.forEach(hijo=>{
                let catalogohijo = new Catalogo(0, 0, '', '', [], 0, 0);
                catalogohijo.P_ID_CATALOGO = hijo.ID_CATALOGO;
                catalogohijo.P_CATALOGO_TITULO = hijo.TITULO_CATALOGO;
                catalogohijo.P_CATALAGO_NOMBRE = hijo.TABLA;
                catalogohijo.P_ESTADO = hijo.ESTADO;
                catalogohijo.DATOS = []; 

                // hijo.ITEMS.forEach(itemshijo=>{
                //   let item = new ItemsCatalogo(0, '', 0);
                //   item.P_ID_ITEM = itemshijo.ID_ITEM
                //   item.P_DISPLAY = itemshijo.DISPLAY
                //   item.P_ID_ITEM_PADRE = itemshijo.ID_ITEM_PADRE

                //   catalogohijo.DATOS.push(item); 
                // })

                hijo.CATALOGO_HIJO.forEach(cathijo3=>{

                  let catalogohijo3 = new Catalogo(0, 0, '', '', [], 0, 0);
                  catalogohijo3.P_ID_CATALOGO = cathijo3.ID_CATALOGO;
                  catalogohijo3.P_CATALOGO_TITULO = cathijo3.TITULO_CATALOGO;
                  catalogohijo3.P_CATALAGO_NOMBRE = cathijo3.TABLA;
                  catalogohijo3.P_ESTADO = cathijo3.ESTADO;
                  catalogohijo3.DATOS = []; 

                  // cathijo3.ITEMS.forEach(itemshijo3 => {
                  //   let item = new ItemsCatalogo(0, '', 0);
                  //   item.P_ID_ITEM = itemshijo3.ID_ITEM
                  //   item.P_DISPLAY = itemshijo3.DISPLAY
                  //   item.P_ID_ITEM_PADRE = itemshijo3.ID_ITEM_PADRE

                  //   catalogohijo3.DATOS.push(item);
                  // })
                  
                  catalogohijo.P_CATALOOGO_HIJOS.push(catalogohijo3)
                })

                catalogo.P_CATALOOGO_HIJOS.push(catalogohijo);

              })
              
              pregunta.P_CATALOGO_ESTADO = true
              pregunta.P_PREGUNTA_CATALAGO = catalogo;
            })
        },
        err => {

        }
      )
      //Llamar procedimiento para cargar catalogos

    }else{
      let cont = 0;
      pregunta.P_OPCIONES = this.opciones;
      this.opciones.forEach(element => {
        element.P_OPCIONES.forEach(opciones=>{
          cont++;
        })
      });

      if(cont > 0){
        pregunta.P_LISTA_DOBLE = true;
      }    
    }

    //console.log(pregunta);

    this.agrupaciones.forEach(item=>{
      if(item.P_NUM_TAB === Num_tab){
        item.P_PREGUNTAS.push(pregunta)
      }
    })

    

    this.opciones = []; 
    this.idOpcion = 0; 
    this.titulopregunta = '';
    this.obligatorio = false;
    this.identificador_texto='';
    this.tipo_pregunta_predefinida = '';
  }
  else{
        this.toastr.error("Ingrese un identificador sin espacios.");
  }
  }else{  
      this.toastr.error("Ingrese el titulo de la pregunta y seleccione el tipo de dato.");
  }
  }

  AgregarOpcion(titulo){
    if (titulo !== null && String(titulo).length > 1) {

    this.idOpcion++; 
    let opcion = new Opciones(0, 0,'',0,0);
    opcion.P_ID_OPCION = this.idOpcion;  
    opcion.P_TITULO_OPCION = titulo; 
    this.opciones.push(opcion);
    this.opcion = null 
    }
    else{
      this.toastr.error("Ingrese el titulo de la opcion.");
    }
   
  }

  EliminarOpcion(id_opcion, id_agrupacion)
  {

    this.opciones.forEach(ele => {
      if (ele.P_PREGUNTA_RELACION.length > 0) {
        ele.P_PREGUNTA_RELACION.forEach(pregu => {
          let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
          pregunta.P_ID_PREGUNTA = pregu.P_ID_PREGUNTA
          pregunta.P_TITULO_P = pregu.P_TITULO_P
          pregunta.P_TIPO_DATO = pregu.P_TIPO_DATO
          pregunta.P_OPCIONES = pregu.P_OPCIONES
          pregunta.P_CAMPO_OBLIGATORIO = pregu.P_CAMPO_OBLIGATORIO
          pregunta.P_IDENTIFICADOR = pregu.P_IDENTIFICADOR
          pregunta.P_CATALOGO_ESTADO = pregu.P_CATALOGO_ESTADO
          pregunta.P_PREGUNTA_CATALAGO = pregu.P_PREGUNTA_CATALAGO

          this.agrupaciones.forEach(agru => {
            if (Number(agru.P_ID_AGRUPACION === id_agrupacion)) {
              agru.P_PREGUNTAS.splice((pregu.P_ID_PREGUNTA - 1), 0, pregunta);
              agru.P_PREGUNTAS.sort((a, b) => (a.P_ID_PREGUNTA - b.P_ID_PREGUNTA));
            }
          })

        })
      }
    })
  
    this.opciones.splice(this.opciones.findIndex(item => item.P_ID_OPCION === id_opcion), 1); 
  }

  getObligatorio(e: any){
    if (e.target.checked) {
      this.obligatorio = true; 
    }else{
      this.obligatorio = false;
    }
  }

  mostrarSeleccion(tipo_dato){
    if (tipo_dato === 'checkbox' || tipo_dato === 'radio' ){
      return true
    }else{
      return false
    }
  }

  mostrarSeleccion_group(tipo_dato) {
    if (tipo_dato === 'checkbox' || tipo_dato === 'radio' || tipo_dato === 'select') {
      return true
    } else {
      return false
    }
  }

  mostrarSeleccion_select(tipo_dato) {
    if (tipo_dato === 'select') {
      return true
    } else {
      return false
    }
  }


  reiniciarOpciones(id_agrupacion){

    
    this.opciones.forEach(ele=>{
      if(ele.P_PREGUNTA_RELACION.length > 0){
        ele.P_PREGUNTA_RELACION.forEach(pregu => {
          let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
          pregunta.P_ID_PREGUNTA = pregu.P_ID_PREGUNTA
          pregunta.P_TITULO_P = pregu.P_TITULO_P
          pregunta.P_TIPO_DATO = pregu.P_TIPO_DATO
          pregunta.P_OPCIONES = pregu.P_OPCIONES
          pregunta.P_CAMPO_OBLIGATORIO = pregu.P_CAMPO_OBLIGATORIO
          pregunta.P_IDENTIFICADOR = pregu.P_IDENTIFICADOR
          pregunta.P_CATALOGO_ESTADO = pregu.P_CATALOGO_ESTADO
          pregunta.P_PREGUNTA_CATALAGO = pregu.P_PREGUNTA_CATALAGO

          this.agrupaciones.forEach(agru => {
            if (Number(agru.P_ID_AGRUPACION === id_agrupacion)) {
              agru.P_PREGUNTAS.splice((pregu.P_ID_PREGUNTA - 1), 0, pregunta);
              agru.P_PREGUNTAS.sort((a, b) => (a.P_ID_PREGUNTA - b.P_ID_PREGUNTA));
            }
          })

        })
      }
    })
    this.opciones = [];
    this.idOpcion = 0; 
  }

  mostrarInput(tipo_dato){
    if (tipo_dato === 'text' || tipo_dato === 'number' || tipo_dato === 'date'  ) {
      return true 
    } else {
      return false
    }
  }

  EliminarPregunta(Num_tab, IdPregunta) {

    //console.log(Num_tab + ' - ' + IdPregunta)
    this.agrupaciones.forEach(element => {
      if(element.P_NUM_TAB === Num_tab){

        element.P_PREGUNTAS.forEach(pregunta=>{
          if(pregunta.P_ID_PREGUNTA === this.id_pregunta){
            pregunta.P_OPCIONES.forEach(opc=>{
                opc.P_PREGUNTA_RELACION.forEach(preguntas=>{

                  let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
                  pregunta.P_ID_PREGUNTA = preguntas.P_ID_PREGUNTA
                  pregunta.P_TITULO_P = preguntas.P_TITULO_P
                  pregunta.P_TIPO_DATO = preguntas.P_TIPO_DATO
                  pregunta.P_OPCIONES = preguntas.P_OPCIONES
                  pregunta.P_CAMPO_OBLIGATORIO = preguntas.P_CAMPO_OBLIGATORIO
                  pregunta.P_IDENTIFICADOR = preguntas.P_IDENTIFICADOR
                  pregunta.P_CATALOGO_ESTADO = preguntas.P_CATALOGO_ESTADO
                  pregunta.P_PREGUNTA_CATALAGO = preguntas.P_PREGUNTA_CATALAGO

                  element.P_PREGUNTAS.splice((preguntas.P_ID_PREGUNTA - 1), 0, pregunta);
                  element.P_PREGUNTAS.sort((a, b) => (a.P_ID_PREGUNTA - b.P_ID_PREGUNTA)); 
                })
            })
          }
        })

        element.P_PREGUNTAS.splice(element.P_PREGUNTAS.findIndex(item => item.P_ID_PREGUNTA === IdPregunta), 1);
      }  
    });
    //this.opciones.splice(this.opciones.findIndex(item => item.id_opcion === id_opcion), 1);
  }

  Registrar(){

    if (this.Form.P_TITULO_F !== '' && String(this.Form.P_TITULO_F).length > 5 && this.Form.P_DESCRIPCION_F !== '' && String(this.Form.P_DESCRIPCION_F).length > 5)
    {

      this.Form.P_AGRUPACIONES = this.agrupaciones;
      //console.log(JSON.stringify(this.Form));
      
      this._formularioService.registrar_formulario(this.Form).subscribe(
        response => {
          this.toastr.success(response.mensaje);
          this.Form.P_TITULO_F = '';
          this.Form.P_DESCRIPCION_F = '';
          this.Form.P_AGRUPACIONES = [];
          this.agrupaciones = [];
          this.idOpcion = 0;
          this.id_pregunta = 0;
          this.posicion = 0; 

        },
        error => {
          this.toastr.error(error.error.mensaje);
        }

      );  

      
    }
    else {
      this.toastr.error("Ingrese el titulo y la descripcion del formulario.");
    }
    
  }


  MostrarTipoSeleccion(tipo_texto, valor)
  {

    if(tipo_texto === valor){
      return true; 
    }
    else {
      return false;
    }
  }

  mostrarControlEspecial(tipo_texto, valor) {
    if (tipo_texto === valor) {
      return true;
    }
    else {
      return false;
    }
  }

  HabilitarEnlazarPregunta(id_opcion){
    
    this.opciones.forEach(element=>{
      if(element.P_ID_OPCION === id_opcion)
      {
        element.P_HABILITAR_AGREGAR = true;
      }
    })
  }
  DeshabilitarEnlace(id_opcion, id_agrupacion) {
  
    this.opciones.forEach(element => {
      if (Number(element.P_ID_OPCION === id_opcion)) {

        if(element.P_PREGUNTA_RELACION.length>0){
          element.P_PREGUNTA_RELACION.forEach(pregu=>{
            let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
            pregunta.P_ID_PREGUNTA = pregu.P_ID_PREGUNTA
            pregunta.P_TITULO_P = pregu.P_TITULO_P
            pregunta.P_TIPO_DATO = pregu.P_TIPO_DATO
            pregunta.P_OPCIONES = pregu.P_OPCIONES
            pregunta.P_CAMPO_OBLIGATORIO = pregu.P_CAMPO_OBLIGATORIO
            pregunta.P_IDENTIFICADOR = pregu.P_IDENTIFICADOR
            pregunta.P_CATALOGO_ESTADO = pregu.P_CATALOGO_ESTADO
            pregunta.P_PREGUNTA_CATALAGO = pregu.P_PREGUNTA_CATALAGO

            this.agrupaciones.forEach(agru=>{
              if(Number(agru.P_ID_AGRUPACION === id_agrupacion)){
                agru.P_PREGUNTAS.splice((pregu.P_ID_PREGUNTA-1),0, pregunta);
                agru.P_PREGUNTAS.sort((a, b) => (a.P_ID_PREGUNTA - b.P_ID_PREGUNTA));
              }
            })

          })
        }
        element.P_HABILITAR_AGREGAR = false;
        element.P_PREGUNTA_RELACION = [];
      }
    })
  }

  AsignarRelacion(id_opcion ){
 
    this.opciones.forEach(element=>{
      
        if(element.P_ID_OPCION === id_opcion){

          ///
          if (element.P_PREGUNTA_SELECCIONADA > 0) {

          let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
          let estado: boolean = false; 
          this.agrupaciones.forEach(agru=>{
            agru.P_PREGUNTAS.forEach(pregu=>{

              if ( Number(pregu.P_ID_PREGUNTA) === Number(element.P_PREGUNTA_SELECCIONADA)) {
                pregunta.P_ID_PREGUNTA = pregu.P_ID_PREGUNTA
                pregunta.P_TITULO_P = pregu.P_TITULO_P
                pregunta.P_TIPO_DATO = pregu.P_TIPO_DATO
                pregunta.P_OPCIONES = pregu.P_OPCIONES
                pregunta.P_CAMPO_OBLIGATORIO = pregu.P_CAMPO_OBLIGATORIO
                pregunta.P_IDENTIFICADOR = pregu.P_IDENTIFICADOR
                pregunta.P_CATALOGO_ESTADO = pregu.P_CATALOGO_ESTADO
                pregunta.P_PREGUNTA_CATALAGO = pregu.P_PREGUNTA_CATALAGO
                estado = true
              }
              
            })
            if (estado){
              agru.P_PREGUNTAS.splice(agru.P_PREGUNTAS.findIndex(item => Number(item.P_ID_PREGUNTA) === Number(element.P_PREGUNTA_SELECCIONADA)), 1);
            }
          })
          
          element.P_PREGUNTA_RELACION.push(pregunta);
          element.P_PREGUNTA_SELECCIONADA = 0;
        ///
        }
          else {
            this.toastr.error('Seleccione una pregunta a relacionar');
          }
      }
    }
    
    )

    
  }

  Deshacercambios(id_pregunta, id_agrupacion, id_opcion){
    let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
    let estado: boolean = false; 
    this.opciones.forEach(element => {
        if( Number(element.P_ID_OPCION) === Number(id_opcion))
        {
          element.P_PREGUNTA_RELACION.forEach(pregu=>{
            if(Number(pregu.P_ID_PREGUNTA === id_pregunta)){
              pregunta.P_ID_PREGUNTA = pregu.P_ID_PREGUNTA
              pregunta.P_TITULO_P = pregu.P_TITULO_P
              pregunta.P_TIPO_DATO = pregu.P_TIPO_DATO
              pregunta.P_OPCIONES = pregu.P_OPCIONES
              pregunta.P_CAMPO_OBLIGATORIO = pregu.P_CAMPO_OBLIGATORIO
              pregunta.P_IDENTIFICADOR = pregu.P_IDENTIFICADOR
              pregunta.P_CATALOGO_ESTADO = pregu.P_CATALOGO_ESTADO
              pregunta.P_PREGUNTA_CATALAGO = pregu.P_PREGUNTA_CATALAGO
              estado = true
            }
          })

          if (estado) {
            element.P_PREGUNTA_RELACION.splice(element.P_PREGUNTA_RELACION.findIndex(item => Number(item.P_ID_PREGUNTA) === Number(id_pregunta)), 1);
          }
        }

    
    });

    if(estado)
    {
      this.agrupaciones.forEach(agru=>{
        if(agru.P_ID_AGRUPACION === id_agrupacion){
          agru.P_PREGUNTAS.splice((id_pregunta-1),0,pregunta);
          agru.P_PREGUNTAS.sort((a, b) => (a.P_ID_PREGUNTA - b.P_ID_PREGUNTA));
        }
      })
    }
  //  console.log(this.agrupaciones);
    
  }

  SetearHijo(e: any, id_pregunta, id_agrupacion)
  {
    let tabla_hijo; 
    this.agrupaciones.forEach(element=>{
      if(element.P_ID_AGRUPACION === id_agrupacion){
        element.P_PREGUNTAS.forEach(pregunta=>{
          if(pregunta.P_ID_PREGUNTA === id_pregunta){
           pregunta.P_PREGUNTA_CATALAGO.P_CATALOOGO_HIJOS.forEach(hijo=>{
                hijo.DATOS = [];
                
                hijo.P_CATALOOGO_HIJOS.forEach(hijo2=>{
                  hijo2.DATOS=[]
                })
                
                this._formularioService.get_catalogo_hijo(hijo.P_CATALAGO_NOMBRE, e.target.value).subscribe(
                  
                  response => { 

                    response.forEach(items=>{
                      let item = new ItemsCatalogo(0, '', 0);
                      item.P_ID_ITEM = items.ID_ITEM
                      item.P_DISPLAY = items.DISPLAY
                      item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                      hijo.DATOS.push(item);
                    })
                  },
                  err => {

                  }
                 
                )
            })
          }
        })
      }
    })

    //console.log(e.target.value, id_pregunta, id_agrupacion);
    
  }

  SetearHijo2(e: any, id_pregunta, id_agrupacion) {
    let tabla_hijo;
    this.agrupaciones.forEach(element => {
      if (element.P_ID_AGRUPACION === id_agrupacion) {
        element.P_PREGUNTAS.forEach(pregunta => {
          if (pregunta.P_ID_PREGUNTA === id_pregunta) {
            pregunta.P_PREGUNTA_CATALAGO.P_CATALOOGO_HIJOS.forEach(hijo => {
                hijo.P_CATALOOGO_HIJOS.forEach(hijo2=>{
                    hijo2.DATOS=[];

                  this._formularioService.get_catalogo_hijo(hijo2.P_CATALAGO_NOMBRE, e.target.value).subscribe(

                      response => {

                        response.forEach(items => {
                          let item = new ItemsCatalogo(0, '', 0);
                          item.P_ID_ITEM = items.ID_ITEM
                          item.P_DISPLAY = items.DISPLAY
                          item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                          hijo2.DATOS.push(item);
                        })
                      },
                      err => {

                      }

                    )
                })

            })
          }
        })
      }
    })

    //console.log(e.target.value, id_pregunta, id_agrupacion);

  }

  EliminarOpcionSelect(id_opcion)
  {

    //console.log(id_opcion)
    this.opciones.forEach(element=>{
      element.P_OPCIONES.splice(element.P_OPCIONES.findIndex(item => item.P_ID_OPCION === id_opcion), 1);
    })
  }


  AgregarOpcionSelect(id_opcion){

    this.opciones.forEach(element=>{
      if(element.P_ID_OPCION === id_opcion){
        if (String(element.P_TLO_OPCION_SEC).length > 2) {

          this.idOpcionsecundario++;
          let opcion = new Opciones(0, 0, '', 0, 0);
          opcion.P_ID_OPCION = this.idOpcionsecundario;
          opcion.P_TITULO_OPCION = element.P_TLO_OPCION_SEC;
          opcion.P_ID_OPCION_PADRE = id_opcion; 
          element.P_OPCIONES.push(opcion);
          
          element.P_TLO_OPCION_SEC = '';
        }
        else {
          this.toastr.error("Ingrese el titulo de la opcion.");
        }
      }
    })
  }

  EliminarOpcionesSelect(id_opcion){
      this.opciones.forEach(element=>{
        if (element.P_ID_OPCION === id_opcion){
          element.P_OPCIONES = [];
          element.P_HABILITAR_AGREGAR = false;
        }
      })
  }

  SetOpcionesSelect(e: any, id_pregunta){

    this.agrupaciones.forEach(element=>{
      element.P_PREGUNTAS.forEach(pregun=>{
      
        if(pregun.P_ID_PREGUNTA === id_pregunta){
          pregun.P_OPCIONES_SELECT = [];
          pregun.P_OPCIONES.forEach(opcion=>{
          
             if(opcion.P_ID_OPCION === Number(e.target.value)){


              opcion.P_OPCIONES.forEach(item=>{
                let opcion = new Opciones(0, 0, '', 0, 0);
                opcion.P_ID_OPCION = item.P_ID_OPCION;
                opcion.P_TITULO_OPCION = item.P_TITULO_OPCION;
                pregun.P_OPCIONES_SELECT.push(opcion);
              })
             
             }
           
          })
        }
      })
    })
   
    
  }
}
