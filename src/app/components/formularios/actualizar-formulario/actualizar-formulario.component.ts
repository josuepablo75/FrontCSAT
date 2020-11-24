import { Component, OnInit, ElementRef, ViewChild, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Formularios } from 'src/app/models/Formulario';
import { FormularioService } from 'src/app/services/formulario.service';
import { Opciones } from 'src/app/models/Opciones';
import { Agrupaciones } from 'src/app/models/Agrupaciones';
import { Preguntas } from 'src/app/models/Preguntas';
import { element } from 'protractor';
import { ThrowStmt } from '@angular/compiler';
import { Catalogo } from 'src/app/models/Catalogos';
import { ItemsCatalogo } from 'src/app/models/ItemsCatalogo';

@Component({
  selector: 'app-actualizar-formulario',
  templateUrl: './actualizar-formulario.component.html',
  styleUrls: ['./actualizar-formulario.component.css']
})


export class ActualizarFormularioComponent implements OnInit {

  
  id_formulario: number;
  public identity;
  private sub: any;
  public Form;
  public titulo:string;
  public titulopregunta: string;
  public tipopregunta: string;
  public tipo_dato: any = {};
  public tipo_dato_texto: string;
  public opcion: string;
  public idOpcion: number = 0; 
  public Agrupaciones;
  public agrupaciones: Array<Agrupaciones> = [];
  public agrupacionesCopia: Array<Agrupaciones> = []; 
  public opciones: Array<Opciones> = [];
  public obligatorio: boolean = false;
  public posicion: number = 0;
  public modoedicion: boolean = false;
  public id_preguntaedicion: number = 0;
  public id_pregunta: number = 0;
  public identificador_texto: string;
  public tipo_pregunta_predefinida: string;
  public preguntas_predefinidas: any = {};
  public idOpcionsecundario: number = 0;

  

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _formularioService: FormularioService,
    private toastr: ToastrService
  ) { 
    this.identity = this._userService.getIdentity()
  }
  filterEstado = ''; 
  ngOnInit(): void {
    this.Form = new Formularios(0, '', '', 0, [],0,0);
    this.Form.P_TITULO_F = '';
    this.sub = this.route.params.subscribe(params => {
      this.id_formulario = +params['id_formulario'];
    });
    if (this.id_formulario !== 0)
    {
      this._formularioService.get_formulario(this.id_formulario).subscribe(
        response => {
          response.forEach(item => {
            this.Form.P_ID_FORMULARIO = item.ID_FORMULARIO; 
            this.Form.P_TITULO_F = item.NOMBRE;
            this.Form.P_DESCRIPCION_F = item.DESCRIPCION;
            this.Form.P_ID_USUARIO_REGISTRA = item.ID_USUARIO_REGISTRA; 
           

            item.AGRUPACIONES.forEach(agrupaciones => {
              let agrupacion = new Agrupaciones(0, '', '', '', [], false, false,0, 0, 0);
              agrupacion.P_ID_AGRUPACION = agrupaciones.ID_AGRUPACION;
              agrupacion.P_NUM_TAB = 'tab_' + agrupaciones.ID_AGRUPACION;
              agrupacion.P_TITULO_A = agrupaciones.NOMBRE;
              agrupacion.P_TITULO_AC = agrupaciones.NOMBRE;
              agrupacion.P_MOSTRAR_INPUT = false;
              agrupacion.P_MOSTRAR_TITULO = true; 
              agrupacion.P_PREGUNTAS = [];
              agrupacion.P_ESTADO = agrupaciones.ESTADO;
              agrupacion.P_NUEVO = 0;
              
              this.agrupaciones.push(agrupacion); 

              let arraypregunta = new Array();
              arraypregunta = agrupaciones.PREGUNTAS;
              
              this.agrupaciones.forEach(agrup=>{
                arraypregunta.forEach(item => {
                  if (agrup.P_ID_AGRUPACION === item.ID_FASE){                

                    let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
                    pregunta.P_ID_PREGUNTA = item.ID_PREGUNTA;
                    pregunta.P_TITULO_P = item.DESCRIPCION_PREGUNTA;
                    pregunta.P_TIPO_DATO = item.TIPO_DATO;
                    pregunta.P_OPCIONES = [];
                    pregunta.P_CAMPO_OBLIGATORIO = item.REQUERIDO; 
                    pregunta.P_ESTADO = item.ESTADO; 
                    pregunta.P_MODO_EDICION = false;
                    pregunta.P_NUEVO = 0;
                    
                    
                    if (Number(item.CATALOGO_ID) > 0) {
                      pregunta.P_PREGUNTA_CATALAGO = this.PreguntaCatalogo(item.CATALOGO_ID);
                      pregunta.P_CATALOGO_ESTADO = true;
                    }
                    

                    agrup.P_PREGUNTAS.push(pregunta); 

                    let arrayopciones = new Array();
                    arrayopciones = item.OPCIONES; 

                    agrup.P_PREGUNTAS.forEach(pregunta=>{
                      //pregunta.P_OPCIONES.forEach(opc=>{
                        arrayopciones.forEach(op => {
                          if (pregunta.P_ID_PREGUNTA === op.ID_PREGUNTA) {
                            let opcion = new Opciones(0, 0, '', 0,0);
                            opcion.P_ID_PREGUNTA = op.ID_PREGUNTA;
                            opcion.P_ID_OPCION = op.ID_OPCION_RESPUESTA;
                            opcion.P_TITULO_OPCION = op.DESCRIPCION_OPCION; 
                            opcion.P_ESTADO = op.ESTADO;
                            opcion.P_NUEVO = 0;
                            
                            op.PREGUNTA_RELACION.forEach(preguntas=>{
                              let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
                              pregunta.P_ID_PREGUNTA = preguntas.ID_PREGUNTA;
                              pregunta.P_TITULO_P = preguntas.DESCRIPCION_PREGUNTA;
                              pregunta.P_TIPO_DATO = preguntas.TIPO_DATO;
                              pregunta.P_OPCIONES = [];
                              pregunta.P_CAMPO_OBLIGATORIO = preguntas.REQUERIDO;
                              pregunta.P_ESTADO = preguntas.ESTADO;
                              pregunta.P_MODO_EDICION = false;
                              pregunta.P_NUEVA_RELACION = 0;
                             
                              if (Number(preguntas.CATALOGO_ID)>0){
                                pregunta.P_PREGUNTA_CATALAGO = this.PreguntaCatalogo(preguntas.CATALOGO_ID) ;
                               // console.log(this.PreguntaCatalogo(preguntas.CATALOGO_ID));
                                
                                pregunta.P_CATALOGO_ESTADO=true;
                              }

                              let cont = 0;

                              preguntas.OPCIONES.forEach(opcionespregunta=>{
                                let opcion = new Opciones(0, 0, '', 0, 0);
                                opcion.P_ID_PREGUNTA = opcionespregunta.ID_PREGUNTA;
                                opcion.P_ID_OPCION = opcionespregunta.ID_OPCION_RESPUESTA;
                                opcion.P_TITULO_OPCION = opcionespregunta.DESCRIPCION_OPCION;
                                opcion.P_ESTADO = opcionespregunta.ESTADO;
                                opcion.P_OPCIONES = [];
                                opcion.P_NUEVO = 0;

                                opcionespregunta.OPCIONES_HIJO.forEach(opcioneshijo=>{
                                  let opcionhijo = new Opciones(0, 0, '', 0, 0);
                                  opcionhijo.P_ID_PREGUNTA = opcioneshijo.ID_PREGUNTA;
                                  opcionhijo.P_ID_OPCION = opcioneshijo.ID_OPCION_RESPUESTA;
                                  opcionhijo.P_TITULO_OPCION = opcioneshijo.DESCRIPCION_OPCION;
                                  opcionhijo.P_ESTADO = opcioneshijo.ESTADO;
                                  opcionhijo.P_ID_OPCION_PADRE = opcioneshijo.ID_OPCION_PADRE
                                  opcionhijo.P_NUEVO = 0;
                                  opcion.P_OPCIONES.push(opcionhijo);
                                  cont++;
                                })
                                pregunta.P_OPCIONES.push(opcion);
                              })

                              if(cont > 0){
                                pregunta.P_LISTA_DOBLE = true;
                              }
                              opcion.P_PREGUNTA_RELACION.push(pregunta); 
                            })
                            let cont = 0;
                            op.OPCIONES_HIJO.forEach(opcioneshijo => {
                              let opcionhijo = new Opciones(0, 0, '', 0, 0);
                              opcionhijo.P_ID_PREGUNTA = opcioneshijo.ID_PREGUNTA;
                              opcionhijo.P_ID_OPCION = opcioneshijo.ID_OPCION_RESPUESTA;
                              opcionhijo.P_TITULO_OPCION = opcioneshijo.DESCRIPCION_OPCION;
                              opcionhijo.P_ESTADO = opcioneshijo.ESTADO;
                              opcionhijo.P_ID_OPCION_PADRE = opcioneshijo.ID_OPCION_PADRE
                              opcionhijo.P_NUEVO = 0;
                              opcion.P_OPCIONES.push(opcionhijo);
                              cont++;
                            })

                            if (cont > 0) {
                              pregunta.P_LISTA_DOBLE = true;
                            }
                            
                            pregunta.P_OPCIONES.push(opcion);
                            //console.log(opcion); 
                          }
                        })  
                     // })

                    })

                  }
                })
              })

            
              
              
              
                      

            }); 
            this.Form.P_AGRUPACIONES = this.agrupaciones;

          });

         //console.log(this.agrupaciones);
         this.agrupacionesCopia = this.agrupaciones; 
        },
        err => {

        }
      )
    }
    this._formularioService.get_tipo_dato().subscribe(
      response => {
        this.tipo_dato = response;
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
    
    this.titulopregunta = null; 
    this.opcion = null;
  }

  mostrarSeleccion(tipo_dato) {
    if (tipo_dato === 'checkbox' || tipo_dato === 'radio') {
      return true
    } else {
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
  mostrarInput(tipo_dato) {
    if (tipo_dato === 'text' || tipo_dato === 'number' || tipo_dato === 'date') {
      return true
    } else {
      return false
    }
  }
  getObligatorio(e: any) {
    if (e.target.checked) {
      this.obligatorio = true;
    } else {
      this.obligatorio = false;
    }
  }
  eliminarAgrupacion(id_agrupacion){

  }
 
  handleClick(event, id_agrupacion) {
  
    if (event.view.getSelection()) {
         this.agrupaciones.forEach(item=>{
           if(item.P_ID_AGRUPACION === id_agrupacion){
             item.P_MOSTRAR_INPUT = true; 
             item.P_MOSTRAR_TITULO = false;
             item.P_TITULO_AC = item.P_TITULO_A;
           }
         })
      }
  }

  Deshacer(id_agrupacion){
    this.agrupaciones.forEach(item => {
      if (item.P_ID_AGRUPACION === id_agrupacion) {
        item.P_MOSTRAR_INPUT = false;
        item.P_MOSTRAR_TITULO = true;
        item.P_TITULO_AC = item.P_TITULO_A;
      }
    })
  }

  EditarAgrupacion(id_agrupacion){
    this.agrupaciones.forEach(item => {
      if (item.P_ID_AGRUPACION === id_agrupacion) {
        item.P_MOSTRAR_INPUT = false;
        item.P_MOSTRAR_TITULO = true;
        item.P_TITULO_A = item.P_TITULO_AC;
      }
    })
  }

  InactivarAgrupacion(id_agrupacion){
    let estado: boolean;
    let estadoanterio: boolean; 
    this.agrupaciones.forEach(item => {
      if (item.P_ID_AGRUPACION === id_agrupacion && item.P_NUEVO === 0) {
        item.P_ESTADO = 0;
        estado = true;
        estadoanterio = true;
      }

      if (!estadoanterio) {
        if (item.P_ID_AGRUPACION === id_agrupacion && item.P_NUEVO === 1) {
          estado = false;
        }
      }

    })
    if (estado === false ){
      this.agrupaciones.splice(this.agrupaciones.findIndex(item => item.P_ID_AGRUPACION === id_agrupacion), 1);  
    }
    
  }

  ActivarAgrupacion(id_agrupacion) {
    this.agrupaciones.forEach(item => {
      if (item.P_ID_AGRUPACION === id_agrupacion) {
        item.P_ESTADO = 1;
        
      }
    })
  }

  MostarActivar(estado) {
      if(estado === 0){
        return true;
      }
      else
      {
        return false; 
      }
  }

  MostrarDesactivar(estado) {
    if (estado === 1) {
      return true;
    }
    else {
      return false;
    }
  }

  agregarAgrupacion(titulo){
    
    if (this.posicion === 0 ){

      this.agrupaciones.forEach(item =>{
        this.posicion += Number(item.P_ID_AGRUPACION)+1; 
      })
    }
    else
    {
      this.posicion++;
    }

    if (titulo !== null && String(titulo).length > 5) {

      this;
      let agrupacion = new Agrupaciones(0, '', '', '', [], false, false, 0,0, 0);
      agrupacion.P_ID_AGRUPACION = this.posicion; 
      agrupacion.P_NUM_TAB = 'tab_' + this.posicion;
      agrupacion.P_TITULO_A = titulo;
      agrupacion.P_MOSTRAR_TITULO = true;
      agrupacion.P_PREGUNTAS = [];
      agrupacion.P_ESTADO = 1; 
      agrupacion.P_NUEVO = 1; 
      this.agrupaciones.push(agrupacion);
      this.titulo = null;
    } else {
      this.toastr.error("Ingrese el titulo de la agrupacion.");
    }

    //console.log(this.agrupaciones);
    
  }

  ActualizarPregunta(id_pregunta){
    this.id_preguntaedicion = id_pregunta;
    this.agrupaciones.forEach(element=>{
      element.P_PREGUNTAS.forEach(pregunta=>{
        if (pregunta.P_ID_PREGUNTA === id_pregunta){
          pregunta.P_MODO_EDICION = true;
          this.titulopregunta = pregunta.P_TITULO_P; 
          this.tipo_dato_texto = pregunta.P_TIPO_DATO;
          this.obligatorio = Boolean(pregunta.P_CAMPO_OBLIGATORIO);

          pregunta.P_OPCIONES.forEach(opciones=>{
            let opcion = new Opciones(0, 0, '', 0, 0);
            opcion.P_ID_OPCION = opciones.P_ID_OPCION;
            opcion.P_TITULO_OPCION = opciones.P_TITULO_OPCION;
            opcion.P_ESTADO = opciones.P_ESTADO;
            opcion.P_NUEVO = opciones.P_NUEVO

            opciones.P_PREGUNTA_RELACION.forEach(relacion=>{
              let preguntaselec = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
              preguntaselec.P_ID_PREGUNTA = relacion.P_ID_PREGUNTA
              preguntaselec.P_TITULO_P = relacion.P_TITULO_P
              preguntaselec.P_TIPO_DATO = relacion.P_TIPO_DATO
              preguntaselec.P_OPCIONES = relacion.P_OPCIONES
              preguntaselec.P_CAMPO_OBLIGATORIO = relacion.P_CAMPO_OBLIGATORIO
              preguntaselec.P_IDENTIFICADOR = relacion.P_IDENTIFICADOR
              preguntaselec.P_CATALOGO_ESTADO = relacion.P_CATALOGO_ESTADO
              preguntaselec.P_PREGUNTA_CATALAGO = relacion.P_PREGUNTA_CATALAGO

              if(relacion.P_NUEVA_RELACION === 1){
                preguntaselec.P_NUEVA_RELACION = relacion.P_NUEVA_RELACION;
              }else{
                preguntaselec.P_NUEVA_RELACION = 0;
              }
             
              preguntaselec.P_ESTADO = relacion.P_ESTADO

              opcion.P_PREGUNTA_RELACION.push(preguntaselec);
            })

            opciones.P_OPCIONES.forEach(opcionhijo=>{
              let op = new Opciones(0, 0, '', 0, 0);
              op.P_ID_OPCION = opcionhijo.P_ID_OPCION;
              op.P_TITULO_OPCION = opcionhijo.P_TITULO_OPCION;
              op.P_ESTADO = opcionhijo.P_ESTADO;
              op.P_NUEVO = opcionhijo.P_NUEVO
              opcion.P_OPCIONES.push(op);
            })

            
            if(opciones.P_PREGUNTA_RELACION.length > 0){
              opcion.P_HABILITAR_AGREGAR = true;
            }else if(opciones.P_OPCIONES.length > 0){
              opcion.P_HABILITAR_AGREGAR = true;
            }
            this.opciones.push(opcion);
          })
          
        }
      })
    })
    this.modoedicion = true;     
  }

  DeshacerCambios(){
    

    this.agrupaciones.forEach(element => {
      element.P_PREGUNTAS.forEach(pregunta => {
        if (pregunta.P_ID_PREGUNTA === this.id_preguntaedicion) {
          pregunta.P_MODO_EDICION = false;
          this.id_preguntaedicion = 0;
        }
      })
    })

    this.modoedicion = false;

    this.titulopregunta = '';
    this.tipo_dato_texto = '';
    this.obligatorio = false;
    this.opciones = [];
    this.id_preguntaedicion = 0;

  }

  InactivarOpcion(id_opcion, id_agrupacion) {
    let estado: boolean;
    let estadoanterio: boolean;
    this.opciones.forEach(item => {
      if (item.P_ID_OPCION === id_opcion && item.P_NUEVO === 0) {
        item.P_ESTADO = 0;
        estado = true;
        estadoanterio = true;
      }

      if (!estadoanterio) {
        if (item.P_ID_OPCION === id_opcion && item.P_NUEVO === 1) {
          estado = false;
        }
      }

    })
    if (estado === false) {
      
      this.agrupaciones.forEach(agru=>{
        if(agru.P_ID_AGRUPACION === id_agrupacion)
        {
          this.opciones.forEach(element => {

            if(element.P_ID_OPCION === id_opcion){
              element.P_PREGUNTA_RELACION.forEach(pregunta => {
                let preguntaselec = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
                preguntaselec.P_ID_PREGUNTA = pregunta.P_ID_PREGUNTA
                preguntaselec.P_TITULO_P = pregunta.P_TITULO_P
                preguntaselec.P_TIPO_DATO = pregunta.P_TIPO_DATO
                preguntaselec.P_OPCIONES = pregunta.P_OPCIONES
                preguntaselec.P_CAMPO_OBLIGATORIO = pregunta.P_CAMPO_OBLIGATORIO
                preguntaselec.P_IDENTIFICADOR = pregunta.P_IDENTIFICADOR
                preguntaselec.P_CATALOGO_ESTADO = pregunta.P_CATALOGO_ESTADO
                preguntaselec.P_PREGUNTA_CATALAGO = pregunta.P_PREGUNTA_CATALAGO
                preguntaselec.P_NUEVA_RELACION = 1
                preguntaselec.P_ESTADO = pregunta.P_ESTADO

                agru.P_PREGUNTAS.push(preguntaselec);
              })
            }
         
          })
        }
      })
    

      this.opciones.splice(this.opciones.findIndex(item => item.P_ID_OPCION === id_opcion), 1);
    }
    else{
      this.opciones.forEach(element=>{
        if (element.P_ID_OPCION === id_opcion){
          element.P_OPCIONES.forEach(opcion=>{
            opcion.P_ESTADO= 0;
          })
        }
      })
    }
  }
  ActivarOpcion(id_opcion) {
    this.opciones.forEach(opcion => {
      if (opcion.P_ID_OPCION === id_opcion) {
        opcion.P_ESTADO = 1;
      }
    })
  }

  AgregarOpcion(titulo) {

    if (this.idOpcion === 0) {
      this.opciones.forEach(item => {
        this.idOpcion += Number(item.P_ID_OPCION) + 1;
      })

      if (this.idOpcion ===0){
        this.idOpcion++; 
      }
    }
    else {
      this.idOpcion++;
    }

    if (titulo !== null && String(titulo).length > 5) {

      let opcion = new Opciones(0, 0, '', 0, 0);
      opcion.P_ID_OPCION = this.idOpcion;
      opcion.P_TITULO_OPCION = titulo;
      opcion.P_ESTADO = 1;
      opcion.P_NUEVO = 1;
      this.opciones.push(opcion);
      this.opcion = null;
    }
    else {
      this.toastr.error("Ingrese el titulo de la opcion.");
    }
  }

  GuardarCambios(){
    this.agrupaciones.forEach(element=>{
      element.P_PREGUNTAS.forEach(pregunta=>{
        if(pregunta.P_ID_PREGUNTA === this.id_preguntaedicion){
          pregunta.P_TITULO_P = this.titulopregunta;
          pregunta.P_TIPO_DATO = this.tipo_dato_texto;
          pregunta.P_CAMPO_OBLIGATORIO = Number(this.obligatorio);
          pregunta.P_OPCIONES = this.opciones; 
          pregunta.P_MODO_EDICION = false;
          pregunta.P_OPCIONES_SELECT = []
        }
      })
    })
  
    this.modoedicion = false;
    this.titulopregunta = '';
    this.tipo_dato_texto = '';
    this.obligatorio = false;
    this.opciones = [];
    this.idOpcion = 0;
    this.id_preguntaedicion = 0;
  }

  agregarPreguntas(Num_tab, titulo, tipo) {

    if (this.id_pregunta === 0) {
      this.agrupaciones.forEach(item => {

        if (item.P_ID_AGRUPACION === Num_tab ){
          item.P_PREGUNTAS.forEach(pregunta=>{
            this.id_pregunta += pregunta.P_ID_PREGUNTA + 1;
          })
        }
      })
    }
    else {
      this.id_pregunta++;
    }

    if (titulo !== null && String(titulo).length > 5) {

      let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
      let cont= 0;
      pregunta.P_ID_PREGUNTA = this.id_pregunta;
      pregunta.P_TITULO_P = titulo;
      pregunta.P_TIPO_DATO = this.tipo_dato_texto;
      pregunta.P_OPCIONES = this.opciones;
      pregunta.P_CAMPO_OBLIGATORIO = Number(this.obligatorio);
      pregunta.P_IDENTIFICADOR = String(this.identificador_texto).toUpperCase();
      pregunta.P_NUEVO = 1;
      pregunta.P_ESTADO = 1;

      if (Number(this.tipo_pregunta_predefinida) > 0) {

        this._formularioService.get_catalogo(Number(this.tipo_pregunta_predefinida)).subscribe(
          response => {
            response.forEach(item => {

              let catalogo = new Catalogo(0, 0, '', '', [], 0, 0);
              catalogo.P_ID_CATALOGO = item.ID_CATALOGO;
              catalogo.P_CATALOGO_TITULO = item.TITULO_CATALOGO;
              catalogo.P_CATALAGO_NOMBRE = item.TABLA;
              catalogo.P_ESTADO = item.ESTADO;
              catalogo.DATOS = [];

              item.ITEMS.forEach(items => {
                let item = new ItemsCatalogo(0, '', 0);
                item.P_ID_ITEM = items.ID_ITEM
                item.P_DISPLAY = items.DISPLAY
                item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                catalogo.DATOS.push(item);

              })

              item.CATALOGO_HIJO.forEach(hijo => {
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

                hijo.CATALOGO_HIJO.forEach(cathijo3 => {

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
        this.opciones.forEach(opcion=>{
          opcion.P_OPCIONES.forEach(opcioneshijo=>{
            cont++;
          })
        })
        if(cont>0){
          pregunta.P_LISTA_DOBLE = true;
        }
      }

      this.agrupaciones.forEach(item => {
        if (item.P_ID_AGRUPACION === Num_tab) {
          item.P_PREGUNTAS.push(pregunta)
        }
      })

      //console.log(pregunta);

      this.opciones = [];
      this.idOpcion = 0;
      this.titulopregunta = '';
      this.obligatorio = false;
      this.identificador_texto = '';
      this.tipo_pregunta_predefinida = '';
    } else {
      this.toastr.error("Ingrese el titulo de la pregunta y seleccione el tipo de dato.");
    }
  }

  EliminarPregunta(Num_tab, IdPregunta) {

  

    let estado: boolean;
    let estadoanterio: boolean;
    this.agrupaciones.forEach(item => {
      if (item.P_ID_AGRUPACION === Num_tab) {

        item.P_PREGUNTAS.forEach(pregunta=>{
          if (pregunta.P_ID_PREGUNTA === IdPregunta && pregunta.P_NUEVO === 0){
            pregunta.P_ESTADO = 0; 
            estado = true;
            estadoanterio = true;
          }
        })               
      }

      if (!estadoanterio) {
        if (item.P_ID_AGRUPACION === Num_tab ) {
          item.P_PREGUNTAS.forEach(pregunta=>{
            if (pregunta.P_ID_PREGUNTA === IdPregunta && pregunta.P_NUEVO === 1) {
              estado = false;
            }
          })
          
        }
      }

    })
    if (estado === false) {
      this.agrupaciones.forEach(element => {
        if (element.P_ID_AGRUPACION === Num_tab) {

          element.P_PREGUNTAS.forEach(pregunta => {
            if (pregunta.P_ID_PREGUNTA === this.id_pregunta) {
              pregunta.P_OPCIONES.forEach(opc => {
                opc.P_PREGUNTA_RELACION.forEach(preguntas => {

                  let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
                  pregunta.P_ID_PREGUNTA = preguntas.P_ID_PREGUNTA
                  pregunta.P_TITULO_P = preguntas.P_TITULO_P
                  pregunta.P_TIPO_DATO = preguntas.P_TIPO_DATO
                  pregunta.P_OPCIONES = preguntas.P_OPCIONES
                  pregunta.P_CAMPO_OBLIGATORIO = preguntas.P_CAMPO_OBLIGATORIO
                  pregunta.P_IDENTIFICADOR = preguntas.P_IDENTIFICADOR
                  pregunta.P_CATALOGO_ESTADO = preguntas.P_CATALOGO_ESTADO
                  pregunta.P_PREGUNTA_CATALAGO = preguntas.P_PREGUNTA_CATALAGO
                  pregunta.P_ESTADO = preguntas.P_ESTADO
                  pregunta.P_LISTA_DOBLE = preguntas.P_LISTA_DOBLE
                  pregunta.P_NUEVO = preguntas.P_NUEVO

                  element.P_PREGUNTAS.splice((preguntas.P_ID_PREGUNTA - 1), 0, pregunta);

                                    
                })
              })
            }
          })

          element.P_PREGUNTAS.splice(element.P_PREGUNTAS.findIndex(item => item.P_ID_PREGUNTA === IdPregunta), 1);
          element.P_PREGUNTAS.sort((a, b) => (a.P_ID_PREGUNTA - b.P_ID_PREGUNTA));
        }
      });
    }
  }

  ActivarPregunta(id_agrupacion, id_pregunta){
    this.agrupaciones.forEach(item=>{
      if(item.P_ID_AGRUPACION === id_agrupacion){
        item.P_PREGUNTAS.forEach(pregunta=>{
          if(pregunta.P_ID_PREGUNTA === id_pregunta){
            pregunta.P_ESTADO = 1; 
          }

        })
      }
    })
  }

  Actualizar() {

    if (this.Form.P_TITULO_F !== '' && String(this.Form.P_TITULO_F).length > 5 && this.Form.P_DESCRIPCION_F !== '' && String(this.Form.P_DESCRIPCION_F).length > 5) {

      this.Form.P_AGRUPACIONES = this.agrupaciones;
      //console.log(JSON.stringify(this.Form));
      this._formularioService.actualizar_formulario(this.Form).subscribe(
        response => {
          this.toastr.success(response.mensaje);
          this._router.navigate(['formularios']);
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

  MostrarTipoSeleccion(tipo_texto, valor) {
  
    if (tipo_texto === valor) {
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

  filterUser(opcion: Opciones) {
    return opcion.P_ESTADO = 1;
  }

  PreguntaCatalogo(idcatalogo): any {
    let catalogo = new Catalogo(0, 0, '', '', [], 0, 0);
    this._formularioService.get_catalogo(Number(idcatalogo)).subscribe(
      response => {
        response.forEach(item => {
          catalogo.P_ID_CATALOGO = item.ID_CATALOGO;
          catalogo.P_CATALOGO_TITULO = item.TITULO_CATALOGO;
          catalogo.P_CATALAGO_NOMBRE = item.TABLA;
          catalogo.P_ESTADO = item.ESTADO;
          catalogo.DATOS = [];

          item.ITEMS.forEach(items => {
            let item = new ItemsCatalogo(0, '', 0);
            item.P_ID_ITEM = items.ID_ITEM
            item.P_DISPLAY = items.DISPLAY
            item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

            catalogo.DATOS.push(item);

          })

          item.CATALOGO_HIJO.forEach(hijo => {
            let catalogohijo = new Catalogo(0, 0, '', '', [], 0, 0);
            catalogohijo.P_ID_CATALOGO = hijo.ID_CATALOGO;
            catalogohijo.P_CATALOGO_TITULO = hijo.TITULO_CATALOGO;
            catalogohijo.P_CATALAGO_NOMBRE = hijo.TABLA;
            catalogohijo.P_ESTADO = hijo.ESTADO;
            catalogohijo.DATOS = [];

            hijo.CATALOGO_HIJO.forEach(cathijo3 => {

              let catalogohijo3 = new Catalogo(0, 0, '', '', [], 0, 0);
              catalogohijo3.P_ID_CATALOGO = cathijo3.ID_CATALOGO;
              catalogohijo3.P_CATALOGO_TITULO = cathijo3.TITULO_CATALOGO;
              catalogohijo3.P_CATALAGO_NOMBRE = cathijo3.TABLA;
              catalogohijo3.P_ESTADO = cathijo3.ESTADO;
              catalogohijo3.DATOS = [];

              catalogohijo.P_CATALOOGO_HIJOS.push(catalogohijo3)
            })

            catalogo.P_CATALOOGO_HIJOS.push(catalogohijo);


          
          })

        })
      },
      err => {

      }
    )

    return catalogo;
  }

  SetearHijo(e: any, id_pregunta, id_agrupacion) {
    let tabla_hijo;
    this.agrupaciones.forEach(element => {
      if (element.P_ID_AGRUPACION === id_agrupacion) {
        element.P_PREGUNTAS.forEach(pregunta => {
          if (pregunta.P_ID_PREGUNTA === id_pregunta) {
            pregunta.P_PREGUNTA_CATALAGO.P_CATALOOGO_HIJOS.forEach(hijo => {
              hijo.DATOS = [];

              hijo.P_CATALOOGO_HIJOS.forEach(hijo2 => {
                hijo2.DATOS = []
              })

              this._formularioService.get_catalogo_hijo(hijo.P_CATALAGO_NOMBRE, e.target.value).subscribe(

                response => {

                  response.forEach(items => {
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


  SetearHijopcionrelacion(e: any, id_pregunta, id_opcion, id_agrupacion) {
    let tabla_hijo;
    this.agrupaciones.forEach(element => {
      if (element.P_ID_AGRUPACION === id_agrupacion) {
        element.P_PREGUNTAS.forEach(pregunta => {
          pregunta.P_OPCIONES.forEach(opcion=>{
            if(opcion.P_ID_OPCION === id_opcion){
              
              opcion.P_PREGUNTA_RELACION.forEach(pregunta=>{
                if (pregunta.P_ID_PREGUNTA === id_pregunta) {
                  pregunta.P_PREGUNTA_CATALAGO.P_CATALOOGO_HIJOS.forEach(hijo => {
                    hijo.DATOS = [];

                    hijo.P_CATALOOGO_HIJOS.forEach(hijo2 => {
                      hijo2.DATOS = []
                    })

                    this._formularioService.get_catalogo_hijo(hijo.P_CATALAGO_NOMBRE, e.target.value).subscribe(

                      response => {

                        response.forEach(items => {
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
        })
      }
    })

    //console.log(e.target.value, id_pregunta, id_agrupacion);

  }

  SetearHijo2seleccionrelacion(e: any, id_pregunta, id_opcion, id_agrupacion) {
    let tabla_hijo;
    this.agrupaciones.forEach(element => {
      if (element.P_ID_AGRUPACION === id_agrupacion) {
        element.P_PREGUNTAS.forEach(pregunta => {
          pregunta.P_OPCIONES.forEach(opcion => {
            if (opcion.P_ID_OPCION === id_opcion) {

              opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
                if (pregunta.P_ID_PREGUNTA === id_pregunta) {
                  pregunta.P_PREGUNTA_CATALAGO.P_CATALOOGO_HIJOS.forEach(hijo => {
                    hijo.P_CATALOOGO_HIJOS.forEach(hijo2 => {
                      hijo2.DATOS = [];

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
        })
      }
    })


    //console.log(e.target.value, id_pregunta, id_agrupacion);

  }

  SetOpcionesSelectRelacion(e: any, id_pregunta, id_agrupacion) {

 
   this.agrupaciones.forEach(agrup=>{
     if(agrup.P_ID_AGRUPACION === id_agrupacion){
       agrup.P_PREGUNTAS.forEach(pregu=>{
         pregu.P_OPCIONES.forEach(opcion=>{
          opcion.P_PREGUNTA_RELACION.forEach(relacion=>{
            if (relacion.P_ID_PREGUNTA === id_pregunta){
              relacion.P_OPCIONES_SELECT = [];
              relacion.P_OPCIONES.forEach(opcionrealacion=>{
                if(opcionrealacion.P_ID_OPCION === Number(e.target.value)){
                  opcionrealacion.P_OPCIONES.forEach(opcionhijo=>{
                    let opcion = new Opciones(0, 0, '', 0, 0);
                    opcion.P_ID_OPCION = opcionhijo.P_ID_OPCION;
                    opcion.P_TITULO_OPCION = opcionhijo.P_TITULO_OPCION;
                    opcion.P_ESTADO = opcionhijo.P_ESTADO;
                    opcion.P_NUEVO = opcionhijo.P_NUEVO
                    relacion.P_OPCIONES_SELECT.push(opcion); 
                  })
                }
              })
            }
           
            
          })        

         })
       })
     }
   })

  }

  HabilitarEnlazarPregunta(id_opcion) {

    this.opciones.forEach(element => {
      if (element.P_ID_OPCION === id_opcion) {
        element.P_HABILITAR_AGREGAR = true;
      }
    })
  }

  InactivarActivarPregunta(id_pregunta, id_opcion, estado){

    this.opciones.forEach(opcion=>{
      if(opcion.P_ID_OPCION === id_opcion){
        opcion.P_PREGUNTA_RELACION.forEach(pregunta=>{
          if(pregunta.P_ID_PREGUNTA === id_pregunta){
            pregunta.P_ESTADO = estado;
          }
         
        })
      }
    });     
  }

  InactivarPreguntaSeleccionada(id_pregunta, id_opcion, id_agrupacion){
    let estado: boolean;
    let estadoanterio: boolean;
    this.opciones.forEach(item => {
      if (item.P_ID_OPCION === id_opcion) {

        item.P_PREGUNTA_RELACION.forEach(pregunta => {
          if (pregunta.P_ID_PREGUNTA === id_pregunta && pregunta.P_NUEVA_RELACION === 0) {
            pregunta.P_ESTADO = 0;
            estado = true;
            estadoanterio = true;
          }

          if (!estadoanterio) {
            if (pregunta.P_ID_PREGUNTA === id_pregunta && pregunta.P_NUEVA_RELACION === 1) {
              estado = false;
            }
          }

        })
        if (estado === false) {
        
        this.opciones.forEach(opcion=>{
          opcion.P_PREGUNTA_RELACION.forEach(pregu=>{
            if(pregu.P_ID_PREGUNTA === id_pregunta){
              let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
              pregunta.P_ID_PREGUNTA = pregu.P_ID_PREGUNTA
              pregunta.P_TITULO_P = pregu.P_TITULO_P
              pregunta.P_TIPO_DATO = pregu.P_TIPO_DATO
              pregunta.P_OPCIONES = pregu.P_OPCIONES
              pregunta.P_CAMPO_OBLIGATORIO = pregu.P_CAMPO_OBLIGATORIO
              pregunta.P_IDENTIFICADOR = pregu.P_IDENTIFICADOR
              pregunta.P_CATALOGO_ESTADO = pregu.P_CATALOGO_ESTADO
              pregunta.P_PREGUNTA_CATALAGO = pregu.P_PREGUNTA_CATALAGO
              pregunta.P_ESTADO =  pregu.P_ESTADO
              pregunta.P_LISTA_DOBLE = pregu.P_LISTA_DOBLE
              pregunta.P_NUEVO = pregu.P_NUEVO
              
              this.agrupaciones.forEach(agru=>{
                if(agru.P_ID_AGRUPACION === id_agrupacion){
                  agru.P_PREGUNTAS.splice((pregu.P_ID_PREGUNTA - 1), 0, pregunta);
                  agru.P_PREGUNTAS.sort((a,b)=>(a.P_ID_PREGUNTA-b.P_ID_PREGUNTA));
                }
              })
            }
          })
        })
        
        item.P_PREGUNTA_RELACION.splice(item.P_PREGUNTA_RELACION.findIndex(item => item.P_ID_PREGUNTA === id_pregunta), 1);
        }

      }


    })
    

  }

  AsignarRelacion(id_opcion) {


    this.opciones.forEach(element => {
      //console.log(element);

      if (element.P_ID_OPCION === Number(id_opcion)) {
        this.agrupaciones.forEach(agru => {
          agru.P_PREGUNTAS.forEach(pregunta => {
            if (pregunta.P_ID_PREGUNTA === Number(element.P_PREGUNTA_SELECCIONADA)) {
              let preguntaselec = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
              preguntaselec.P_ID_PREGUNTA = pregunta.P_ID_PREGUNTA
              preguntaselec.P_TITULO_P = pregunta.P_TITULO_P
              preguntaselec.P_TIPO_DATO = pregunta.P_TIPO_DATO
              preguntaselec.P_OPCIONES = pregunta.P_OPCIONES
              preguntaselec.P_CAMPO_OBLIGATORIO = pregunta.P_CAMPO_OBLIGATORIO
              preguntaselec.P_IDENTIFICADOR = pregunta.P_IDENTIFICADOR
              preguntaselec.P_CATALOGO_ESTADO = pregunta.P_CATALOGO_ESTADO
              preguntaselec.P_PREGUNTA_CATALAGO = pregunta.P_PREGUNTA_CATALAGO
              preguntaselec.P_NUEVA_RELACION = 1
              preguntaselec.P_ESTADO = pregunta.P_ESTADO
              preguntaselec.P_NUEVO = pregunta.P_NUEVO
              
              let cont = 0;
              pregunta.P_OPCIONES.forEach(opcion=>{
                opcion.P_OPCIONES.forEach(opcioneshijo=>{
                  cont++;
                })
              })

              if(cont>0){
                preguntaselec.P_LISTA_DOBLE = true;
              }

              element.P_PREGUNTA_RELACION.push(preguntaselec);

              agru.P_PREGUNTAS.splice(agru.P_PREGUNTAS.findIndex(item => item.P_ID_PREGUNTA === Number(element.P_PREGUNTA_SELECCIONADA)), 1);
            }
          })
        })
      }
    })
  }

  EliminarOpcionesSelect(id_opcion) {
    this.opciones.forEach(element => {
      if (element.P_ID_OPCION === id_opcion) {
        element.P_OPCIONES = [];
        element.P_HABILITAR_AGREGAR = false;
      }
    })
  }
  AgregarOpcionSelect(id_opcion) {

    this.opciones.forEach(element => {
      if (element.P_ID_OPCION === id_opcion) {
        if (String(element.P_TLO_OPCION_SEC).length > 2) {

          this.idOpcionsecundario++;
          let opcion = new Opciones(0, 0, '', 0, 0);
          opcion.P_ID_OPCION = this.idOpcionsecundario;
          opcion.P_TITULO_OPCION = element.P_TLO_OPCION_SEC;
          opcion.P_ID_OPCION_PADRE = id_opcion;
          opcion.P_ESTADO = 1;
          opcion.P_NUEVO = 1;
          element.P_OPCIONES.push(opcion);

          element.P_TLO_OPCION_SEC = '';
        }
        else {
          this.toastr.error("Ingrese el titulo de la opcion.");
        }
      }
    })
  }


  EliminarOpcionSelect(id_opcion) {

   // console.log(id_opcion)
    this.opciones.forEach(element => {
      element.P_OPCIONES.splice(element.P_OPCIONES.findIndex(item => item.P_ID_OPCION === id_opcion), 1);
    })
  }

  SetOpcionesSelect(e: any, id_pregunta, id_agrupacion) {

    this.agrupaciones.forEach(agrup => {
        if (agrup.P_ID_AGRUPACION === id_agrupacion) {
          agrup.P_PREGUNTAS.forEach(pregu => {
            if (pregu.P_ID_PREGUNTA === id_pregunta){
              pregu.P_OPCIONES_SELECT = [];
              pregu.P_OPCIONES.forEach(opciones=>{
                if(opciones.P_ID_OPCION === Number(e.target.value)){
                  opciones.P_OPCIONES.forEach(opcionhijo=>{
                    let opcion = new Opciones(0, 0, '', 0, 0);
                    opcion.P_ID_OPCION = opcionhijo.P_ID_OPCION;
                    opcion.P_TITULO_OPCION = opcionhijo.P_TITULO_OPCION;
                    opcion.P_ESTADO = opcionhijo.P_ESTADO;
                    opcion.P_NUEVO = opcionhijo.P_NUEVO
                    pregu.P_OPCIONES_SELECT.push(opcion);
                  })
                }
              })
            }
           
        })
      }
    })


  }

  InactivarOpcionSeleccionada(id_opcion_padre, id_opcion, id_agrupacion) {
    let estado: boolean;
    let estadoanterio: boolean;
    this.opciones.forEach(item => {
      if (item.P_ID_OPCION === id_opcion_padre) {

        item.P_OPCIONES.forEach(opcionhijo=>{
          if(opcionhijo.P_ID_OPCION === id_opcion && opcionhijo.P_NUEVO === 0){
            opcionhijo.P_ESTADO = 0;
            estado = true;
            estadoanterio = true;
          }
          if (!estadoanterio) {
            if (opcionhijo.P_ID_OPCION === id_opcion && opcionhijo.P_NUEVO === 1) {
              estado = false;
            }
          }
        })


        if (estado === false) {
          item.P_OPCIONES.splice(item.P_OPCIONES.findIndex(item => item.P_ID_OPCION === id_opcion), 1);
        }

      }


    })


  }

  ActivarOpcionHijo(id_opcion_padre, id_opcion) {

    this.opciones.forEach(opcion => {
      if (opcion.P_ID_OPCION === id_opcion_padre) {
        opcion.P_OPCIONES.forEach(opcionhijo=>{
          if(opcionhijo.P_ID_OPCION === id_opcion){
            opcionhijo.P_ESTADO = 1;
          }
        })
      }
    });
  }
}
