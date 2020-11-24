import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { Agrupaciones } from 'src/app/models/Agrupaciones';
import { Formularios } from 'src/app/models/Formulario';
import { Preguntas } from 'src/app/models/Preguntas';
import { Opciones } from 'src/app/models/Opciones';
import { element } from 'protractor';
import { LocationService } from 'src/app/services/location.service';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { saveAs } from 'file-saver';
import { Catalogo } from 'src/app/models/Catalogos';
import { ItemsCatalogo } from 'src/app/models/ItemsCatalogo';
import { Respuestas } from 'src/app/models/Respuestas';
import { OpcionRespuesta } from 'src/app/models/OpcionRespuesta';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-actualizarrespuestas',
  templateUrl: './actualizarrespuestas.component.html',
  styleUrls: ['./actualizarrespuestas.component.css']
})
export class ActualizarrespuestasComponent implements OnInit {

  public identity;
  private sub: any;
  id_formulario: number;
  id_encuesta: number;
  public Form;
  public Agrupaciones;
  public agrupaciones: Array<Agrupaciones> = [];
  public latitude;
  public longitude;
  public respuestasarray: Array<Respuestas> = []; 

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _formularioService: FormularioService,
    private _encuestasSevice: EncuestasService,
    private toastr: ToastrService
  ) {

    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {

    this.Form = new Formularios(0, '', '', 0, [], 0, 0);

    this.sub = this.route.params.subscribe(params => {
      this.id_formulario = +params['id_formulario'];
      this.id_encuesta = +params['id_encuesta'];
      //console.log(this.id_formulario, this.id_encuesta);
      
    });

    if (this.id_encuesta !== 0) {
      this._encuestasSevice.get_respuesta(this.id_encuesta).subscribe(
        response => {
          response.forEach(item => {
            let Respuesta = new Respuestas(0, 0, '', '', '', [], []);

            Respuesta.P_ID_RESPUESTA = item.ID_RESPUESTA
            Respuesta.P_ID_PREGUNTA = item.ID_PREGUNTA
            Respuesta.P_RESPUESTA = item.RESPUESTA
            Respuesta.P_RESPUESTA_N2 = item.RESPUESTA_N2
            Respuesta.P_RESPUESTA_N3 = item.RESPUESTA_N3

            item.OPCION_RESPUESTA.forEach(opcion => {
              let OpcionResp = new OpcionRespuesta(0, 0, 0, 0);
              OpcionResp.P_ID_RESPUESTA_OPCION = opcion.ID_RESPUESTA_OPCION
              OpcionResp.P_ID_RESPUESTA = opcion.ID_RESPUESTA
              OpcionResp.P_ID_OPCION = opcion.ID_OPCION
              OpcionResp.P_ESTADO = opcion.ESTADO
              Respuesta.P_OPCION_RESPUESTA.push(OpcionResp);
            })

            item.RESPUESTA_HIJO.forEach(respuestahijos => {
              let respuestahijo = new Respuestas(0, 0, '', '', '', [], []);
              respuestahijo.P_ID_RESPUESTA = respuestahijos.ID_RESPUESTA
              respuestahijo.P_ID_PREGUNTA = respuestahijos.ID_PREGUNTA
              respuestahijo.P_RESPUESTA = respuestahijos.RESPUESTA
              respuestahijo.P_RESPUESTA_N2 = respuestahijos.RESPUESTA_N2
              respuestahijo.P_RESPUESTA_N3 = respuestahijos.RESPUESTA_N3

              respuestahijos.OPCION_RESPUESTA.forEach(opcionhijoresp => {
                let OpcionResp = new OpcionRespuesta(0, 0, 0, 0);
                OpcionResp.P_ID_RESPUESTA_OPCION = opcionhijoresp.ID_RESPUESTA_OPCION
                OpcionResp.P_ID_RESPUESTA = opcionhijoresp.ID_RESPUESTA
                OpcionResp.P_ID_OPCION = opcionhijoresp.ID_OPCION
                OpcionResp.P_ESTADO = opcionhijoresp.ESTADO
                respuestahijo.P_OPCION_RESPUESTA.push(OpcionResp)
              })

              Respuesta.P_RESPUESTA_HIJO.push(respuestahijo);
            })

            this.respuestasarray.push(Respuesta);

          })
        },
        err => {

        }
      )

    }

    if (this.id_formulario !== 0) {
      this._formularioService.get_formulario_respuesta(this.id_formulario).subscribe(
        response => {
          response.forEach(item => {
            this.Form.P_ID_FORMULARIO = item.ID_FORMULARIO;
            this.Form.P_TITULO_F = item.NOMBRE;
            this.Form.P_DESCRIPCION_F = item.DESCRIPCION;
            this.Form.P_ID_USUARIO_REGISTRA = item.ID_USUARIO_REGISTRA;
            let cont = 0;
            item.AGRUPACIONES.forEach(agrupaciones => {
              cont++;
              let agrupacion = new Agrupaciones(0, '', '', '', [], false, false, 0, 0, 0);
              agrupacion.P_ID_AGRUPACION = agrupaciones.ID_AGRUPACION;
              agrupacion.P_NUM_TAB = 'tab_' + agrupaciones.ID_AGRUPACION;
              agrupacion.P_TITULO_A = agrupaciones.NOMBRE;
              agrupacion.P_TITULO_AC = agrupaciones.NOMBRE;
              agrupacion.P_MOSTRAR_INPUT = false;
              agrupacion.P_MOSTRAR_TITULO = true;
              agrupacion.P_PREGUNTAS = [];
              agrupacion.P_ESTADO = agrupaciones.ESTADO;
              agrupacion.P_NUEVO = 0;
              agrupacion.P_ORDEN = cont;

              this.agrupaciones.push(agrupacion);

              let arraypregunta = new Array();
              arraypregunta = agrupaciones.PREGUNTAS;

              this.agrupaciones.forEach(agrup => {
                arraypregunta.forEach(item => {
                  if (agrup.P_ID_AGRUPACION === item.ID_FASE) {

                    let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
                    pregunta.P_ID_PREGUNTA = item.ID_PREGUNTA;
                    pregunta.P_TITULO_P = item.DESCRIPCION_PREGUNTA;
                    pregunta.P_TIPO_DATO = item.TIPO_DATO;
                    pregunta.P_OPCIONES = [];
                    pregunta.P_CAMPO_OBLIGATORIO = item.REQUERIDO;
                    pregunta.P_ESTADO = item.ESTADO;
                    pregunta.P_MODO_EDICION = false;
                    pregunta.P_NUEVO = 0;
                    pregunta.P_RESPUESTA = '';
                    pregunta.P_OPCIONES_RESPUESTA;
                    pregunta.P_PATH_RESPUESTA = '';
                    pregunta.P_REQUERIDO = Boolean(item.REQUERIDO);
                    pregunta.P_RESPUESTA_HIJO_N2 = '';
                    pregunta.P_RESPUESTA_HIJO_N3 = '';
                    
                    this.respuestasarray.forEach(respuesta => {
                      if (Number(respuesta.P_ID_PREGUNTA === item.ID_PREGUNTA)) {
                       
                        pregunta.P_RESPUESTA = respuesta.P_RESPUESTA
                        pregunta.P_RESPUESTA_HIJO_N2 = respuesta.P_RESPUESTA_N2
                        pregunta.P_RESPUESTA_HIJO_N3 = respuesta.P_RESPUESTA_N3
                        pregunta.P_RESPUESTA_NUMBER = Number(respuesta.P_RESPUESTA);

                        if(pregunta.P_TIPO_DATO === 'file'){
                          if (String(pregunta.P_RESPUESTA).length > 0) {
                          let extension = '';
                          switch (respuesta.P_RESPUESTA.split('.').pop().toUpperCase()) {
                            case 'PDF': {
                              extension = 'PDF';
                              break;
                            }
                            case 'DOCX': {
                              extension = 'DOCX';
                              break;
                            }
                            case 'DOC': {
                              extension = 'DOCX';
                              break;
                            }

                            case 'XLS': {
                              extension = 'XLSX';
                              break;
                            }

                            case 'XLSX': {
                              extension = 'XLSX';
                              break;
                            }

                            case 'JPG': {
                              extension = 'IMAGE';
                              break;
                            }
                            case 'JPGE': {
                              extension = 'IMAGE';
                              break;
                            }
                            case 'PNG': {
                              extension = 'IMAGE';
                              break;
                            }
                            default: {
                              extension = 'OTRO';
                            }
                          }
                          pregunta.P_EXTENSION_ARCHIVO = extension;
                          }
                        }
                      }
                    })

                    if (Number(item.CATALOGO_ID) > 0) {
                      pregunta.P_PREGUNTA_CATALAGO = this.PreguntaCatalogo(item.CATALOGO_ID, item.ID_PREGUNTA);
                      pregunta.P_CATALOGO_ESTADO = true;
                      this.respuestasarray.forEach(respuesta => {
                        if (respuesta.P_ID_PREGUNTA === Number(pregunta.P_ID_PREGUNTA)) {
                          respuesta.P_OPCION_RESPUESTA.forEach(opcselect => {
                            if (opcselect.P_ESTADO === 1) {
                            
                              pregunta.P_OPCIONES_RESPUESTA.push(opcselect.P_ID_OPCION)
                            }


                          })

                        }
                      })
                    }

                  

                    agrup.P_PREGUNTAS.push(pregunta);

                    let arrayopciones = new Array();
                    arrayopciones = item.OPCIONES;

                    agrup.P_PREGUNTAS.forEach(pregunta => {
                      arrayopciones.forEach(op => {
                        if (pregunta.P_ID_PREGUNTA === op.ID_PREGUNTA) {
                          let opcion = new Opciones(0, 0, '', 0, 0);
                          opcion.P_ID_PREGUNTA = op.ID_PREGUNTA;
                          opcion.P_ID_OPCION = op.ID_OPCION_RESPUESTA;
                          opcion.P_TITULO_OPCION = op.DESCRIPCION_OPCION;
                          opcion.P_ESTADO = op.ESTADO;
                          opcion.P_NUEVO = 0;
                          opcion.P_OPCIONES = [];
                         
                          
                          if( Number(opcion.P_ID_OPCION) === Number(pregunta.P_RESPUESTA)){
                            opcion.P_VER_PR_RELACION = true;
                          }

                          this.respuestasarray.forEach(respuesta=>{
                            if (respuesta.P_ID_PREGUNTA === Number(op.ID_PREGUNTA)){
                              respuesta.P_OPCION_RESPUESTA.forEach(opcselect=>{
                                if (opcion.P_ID_OPCION === opcselect.P_ID_OPCION && opcselect.P_ESTADO === 1) {
                                  opcion.P_CHEKED = true;
                                  pregunta.P_OPCIONES_RESPUESTA.push(opcselect.P_ID_OPCION)
                                }

                                
                              })
                             
                            }
                          })

                          // logica de preguntas relacionadas
                          op.PREGUNTA_RELACION.forEach(preguntas => {
                            let pregunta = new Preguntas(0, '', '', 0, [], 0, false, 0, '', [], '', false);
                            pregunta.P_ID_PREGUNTA = preguntas.ID_PREGUNTA;
                            pregunta.P_TITULO_P = preguntas.DESCRIPCION_PREGUNTA;
                            pregunta.P_TIPO_DATO = preguntas.TIPO_DATO;
                            pregunta.P_OPCIONES = [];
                            pregunta.P_CAMPO_OBLIGATORIO = preguntas.REQUERIDO;
                            pregunta.P_ESTADO = preguntas.ESTADO;
                            pregunta.P_MODO_EDICION = false;
                            pregunta.P_NUEVO = 0;
                            pregunta.P_OPCIONES_RESPUESTA;
                            pregunta.P_PATH_RESPUESTA = '';
                            pregunta.P_REQUERIDO = Boolean(preguntas.REQUERIDO);


                            this.respuestasarray.forEach(respuestapadre => {
                              respuestapadre.P_RESPUESTA_HIJO.forEach(respuesta=>{
                                if (Number(respuesta.P_ID_PREGUNTA === preguntas.ID_PREGUNTA)) {

                                  pregunta.P_RESPUESTA = respuesta.P_RESPUESTA
                                  pregunta.P_RESPUESTA_HIJO_N2 = respuesta.P_RESPUESTA_N2
                                  pregunta.P_RESPUESTA_HIJO_N3 = respuesta.P_RESPUESTA_N3
                                  pregunta.P_RESPUESTA_NUMBER = Number(respuesta.P_RESPUESTA);

                                    if (pregunta.P_TIPO_DATO === 'file') {
                                      if (String(pregunta.P_RESPUESTA).length > 0) {
                                    let extension = '';
                                    switch (respuesta.P_RESPUESTA.split('.').pop().toUpperCase()) {
                                      case 'PDF': {
                                        extension = 'PDF';
                                        break;
                                      }
                                      case 'DOCX': {
                                        extension = 'DOCX';
                                        break;
                                      }
                                      case 'DOC': {
                                        extension = 'DOCX';
                                        break;
                                      }

                                      case 'XLS': {
                                        extension = 'XLSX';
                                        break;
                                      }

                                      case 'XLSX': {
                                        extension = 'XLSX';
                                        break;
                                      }

                                      case 'JPG': {
                                        extension = 'IMAGE';
                                        break;
                                      }
                                      case 'JPGE': {
                                        extension = 'IMAGE';
                                        break;
                                      }
                                      case 'PNG': {
                                        extension = 'IMAGE';
                                        break;
                                      }
                                      default: {
                                        extension = 'OTRO';
                                      }
                                    }
                                    pregunta.P_EXTENSION_ARCHIVO = extension;
                                  }
                                 }
                                }
                              })
                            })

                            if (Number(preguntas.CATALOGO_ID) > 0) {
                              pregunta.P_PREGUNTA_CATALAGO = this.PreguntaCatalogoHijo(preguntas.CATALOGO_ID, preguntas.ID_PREGUNTA);
                              // console.log(this.PreguntaCatalogo(preguntas.CATALOGO_ID));
                              pregunta.P_CATALOGO_ESTADO = true;

                              this.respuestasarray.forEach(respuestahijo => {
                                respuestahijo.P_RESPUESTA_HIJO.forEach(respuesta=>{
                                  if (respuesta.P_ID_PREGUNTA === Number(pregunta.P_ID_PREGUNTA)) {
                                    respuesta.P_OPCION_RESPUESTA.forEach(opcselect => {
                                      if (opcselect.P_ESTADO === 1) {

                                        pregunta.P_OPCIONES_RESPUESTA.push(opcselect.P_ID_OPCION)
                                      }

                                    })

                                  }
                                })
                              })
                            }

                            let cont = 0;

                            preguntas.OPCIONES.forEach(opcionespregunta => {
                              let opcion = new Opciones(0, 0, '', 0, 0);
                              opcion.P_ID_PREGUNTA = opcionespregunta.ID_PREGUNTA;
                              opcion.P_ID_OPCION = opcionespregunta.ID_OPCION_RESPUESTA;
                              opcion.P_TITULO_OPCION = opcionespregunta.DESCRIPCION_OPCION;
                              opcion.P_ESTADO = opcionespregunta.ESTADO;
                              opcion.P_OPCIONES = [];
                              opcion.P_NUEVO = 0;
                              //console.log(opcionespregunta);
                              
                              this.respuestasarray.forEach(respuestahijo => {
                                respuestahijo.P_RESPUESTA_HIJO.forEach(respuesta=>{
                                 // console.log(respuesta);
                                  if (respuesta.P_ID_PREGUNTA === Number(opcion.P_ID_PREGUNTA)) {
                                  
                                    respuesta.P_OPCION_RESPUESTA.forEach(opcselect => {
                                      if (opcion.P_ID_OPCION === opcselect.P_ID_OPCION && opcselect.P_ESTADO === 1) {
                                        opcion.P_CHEKED = true;
                                        pregunta.P_OPCIONES_RESPUESTA.push(opcselect.P_ID_OPCION)
                                      }
                                      
                                      
                                      

                                    })

                                  }
                                })
                              })

                              opcionespregunta.OPCIONES_HIJO.forEach(opcioneshijo => {
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

                            if (cont > 0) {
                              pregunta.P_LISTA_DOBLE = true;
                              pregunta.P_OPCIONES_SELECT = [];
                              pregunta.P_OPCIONES.forEach(opciones => {
                                if (opciones.P_ID_OPCION === Number(pregunta.P_RESPUESTA)) {
                                  opciones.P_OPCIONES.forEach(opcionhijo => {
                                    let opcion = new Opciones(0, 0, '', 0, 0);
                                    opcion.P_ID_OPCION = opcionhijo.P_ID_OPCION;
                                    opcion.P_TITULO_OPCION = opcionhijo.P_TITULO_OPCION;
                                    opcion.P_ESTADO = opcionhijo.P_ESTADO;
                                    opcion.P_NUEVO = opcionhijo.P_NUEVO
                                    pregunta.P_OPCIONES_SELECT.push(opcion);
                                  })
                                }
                              })
                            }
                            opcion.P_PREGUNTA_RELACION.push(pregunta);
                          })
                          // FIN

                          let contt = 0;
                          op.OPCIONES_HIJO.forEach(opcioneshijo => {
                            let opcionhijo = new Opciones(0, 0, '', 0, 0);
                            opcionhijo.P_ID_PREGUNTA = opcioneshijo.ID_PREGUNTA;
                            opcionhijo.P_ID_OPCION = opcioneshijo.ID_OPCION_RESPUESTA;
                            opcionhijo.P_TITULO_OPCION = opcioneshijo.DESCRIPCION_OPCION;
                            opcionhijo.P_ESTADO = opcioneshijo.ESTADO;
                            opcionhijo.P_ID_OPCION_PADRE = opcioneshijo.ID_OPCION_PADRE
                            opcionhijo.P_NUEVO = 0;
                            opcion.P_OPCIONES.push(opcionhijo);
                            contt++;
                          })

                          if (contt > 0) {
                            pregunta.P_LISTA_DOBLE = true;

                            pregunta.P_OPCIONES_SELECT = [];
                            pregunta.P_OPCIONES.forEach(opciones => {
                              if (opciones.P_ID_OPCION === Number(pregunta.P_RESPUESTA)) {
                                opciones.P_OPCIONES.forEach(opcionhijo => {
                                  let opcion = new Opciones(0, 0, '', 0, 0);
                                  opcion.P_ID_OPCION = opcionhijo.P_ID_OPCION;
                                  opcion.P_TITULO_OPCION = opcionhijo.P_TITULO_OPCION;
                                  opcion.P_ESTADO = opcionhijo.P_ESTADO;
                                  opcion.P_NUEVO = opcionhijo.P_NUEVO
                                  pregunta.P_OPCIONES_SELECT.push(opcion);
                                })
                              }
                            })
                          }

                          pregunta.P_OPCIONES.push(opcion);
                          //console.log(opcion); 
                          
                          //  
                        }
                      })
                    })

                  }
                })
              })
            });
            this.Form.P_AGRUPACIONES = this.agrupaciones;

          });

         // console.log(this.agrupaciones);

        },
        err => {

        }
      )
    }

    
     
    
  }

  mostrarSeleccion(tipo_dato) {
    if (tipo_dato === 'checkbox' || tipo_dato === 'radio' || tipo_dato === 'select') {
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

  Registrar() {
    this.Form.P_ID_USUARIO_REGISTRA = this.identity.ID_USUARIO;

    this.agrupaciones.forEach(element => {
      element.P_PREGUNTAS.forEach(preguntas => {
        preguntas.P_PREGUNTA_CATALAGO = null;
        //preguntas.P_OPCIONES_SELECT = [];
        preguntas.P_OPCIONES.forEach(opcion => {
          opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
            pregunta.P_PREGUNTA_CATALAGO = null;
           //pregunta.P_OPCIONES_SELECT = [];
          })
        })
      })
    })

    this.Form.P_AGRUPACIONES = this.agrupaciones;
    this.Form.P_ID_ENCUESTA = this.id_encuesta;
    this.Form.P_CONFIRMAR = 0;
    //console.log(JSON.stringify(this.Form))
 
    this._encuestasSevice.actualizar_respuestas(this.Form).subscribe(
      response => {
        this.toastr.success(response.mensaje);
        this._router.navigate(['formulariosasignados']);
      },
      error => {
        this.toastr.error(error.error.mensaje);
      }

    );  

  }

  setRadioOpcion(e: any, idOpcion, idPregunta) {
  
    
    this.agrupaciones.forEach(elemen => {
      elemen.P_PREGUNTAS.forEach(item => {
        if (item.P_ID_PREGUNTA === idPregunta) {

          item.P_OPCIONES.forEach(opcion => {
            opcion.P_VER_PR_RELACION = false;


              opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
                pregunta.P_RESPUESTA = '';
                pregunta.P_RESPUESTA_NUMBER = 0;
                pregunta.P_RESPUESTA_HIJO_N2 = '';
                pregunta.P_RESPUESTA_HIJO_N3 = '';
                pregunta.P_EXTENSION_ARCHIVO = '';
                pregunta.P_OPCIONES_RESPUESTA = []; 

                if(pregunta.P_TIPO_DATO === 'checkbox')
                {
                
                  if(pregunta.P_PREGUNTA_CATALAGO !== null){
                      if (pregunta.P_PREGUNTA_CATALAGO.DATOS.length > 0){
                    pregunta.P_PREGUNTA_CATALAGO.DATOS.forEach(Datos => {
                      Datos.P_CHECKED = false;
                    })
                  }
                  }

                  pregunta.P_OPCIONES.forEach(element=>{
                    element.P_CHEKED = false;
                  })
                                  
                  
                } 
                
              })
            
          })
        }
      })
    })

    this.agrupaciones.forEach(elemen => {
      elemen.P_PREGUNTAS.forEach(item => {
        if (item.P_ID_PREGUNTA === idPregunta) {
          item.P_RESPUESTA = idOpcion;
          item.P_OPCIONES.forEach(opcion => {

            if (opcion.P_ID_OPCION === idOpcion) {
              opcion.P_VER_PR_RELACION = true;
            }
          })

          
        }
      })
    })
  }

  getOpciones(e: any, idOpcion, idPregunta) {

    if (e.target.checked) {

      this.agrupaciones.forEach(elemen => {
        elemen.P_PREGUNTAS.forEach(item => {
          if (item.P_ID_PREGUNTA === idPregunta) {
            item.P_OPCIONES_RESPUESTA.push(idOpcion);
          }
        })
      })
    }
    else {
      this.agrupaciones.forEach(elemen => {
        elemen.P_PREGUNTAS.forEach(item => {
          if (item.P_ID_PREGUNTA === idPregunta) {
            item.P_OPCIONES_RESPUESTA.push(idOpcion);
            item.P_OPCIONES_RESPUESTA = item.P_OPCIONES_RESPUESTA.filter(m => m != idOpcion)
          }
        })
      })
    }
  }



  onSubmit(registroForm) {
    if (registroForm.valid) {
      this.Form.P_ID_USUARIO_REGISTRA = this.identity.ID_USUARIO;

      this.agrupaciones.forEach(element => {
        element.P_PREGUNTAS.forEach(preguntas => {
          preguntas.P_PREGUNTA_CATALAGO = null;
          //preguntas.P_OPCIONES_SELECT = [];
          preguntas.P_OPCIONES.forEach(opcion => {
            opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
              pregunta.P_PREGUNTA_CATALAGO = null;
              //pregunta.P_OPCIONES_SELECT = [];
            })
          })
        })
      })
      
      this.Form.P_AGRUPACIONES = this.agrupaciones;
      this.Form.P_ID_ENCUESTA = this.id_encuesta;
      this.Form.P_CONFIRMAR = 1;

      this._encuestasSevice.actualizar_respuestas(this.Form).subscribe(
        response => {
          this.toastr.success(response.mensaje);
          this._router.navigate(['formulariosasignados']);
        },
        error => {
          this.toastr.error(error.error.mensaje);
        }

      );

    }
    else {
      this.toastr.error("Ingrese la informacion en los campos requeridos * ");
    }
  }

  MostrarTipoArchivo(tipo_dato, valor) {

    if (tipo_dato === valor) {
      return true;
    }
    else {
      return false;
    }
  }




  onFileSelect(event, idpregunta) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this._encuestasSevice.subir_archivo(formData).subscribe(
        response => {
          let extension = '';

          switch (response.P_EXTENSION) {
            case 'PDF': {
              extension = 'PDF';
              break;
            }
            case 'DOCX': {
              extension = 'DOCX';
              break;
            }
            case 'DOC': {
              extension = 'DOCX';
              break;
            }

            case 'XLS': {
              extension = 'XLSX';
              break;
            }

            case 'XLSX': {
              extension = 'XLSX';
              break;
            }

            case 'JPG': {
              extension = 'IMAGE';
              break;
            }
            case 'JPGE': {
              extension = 'IMAGE';
              break;
            }
            case 'PNG': {
              extension = 'IMAGE';
              break;
            }
            default: {
              extension = 'OTRO';
            }
          }

          this.agrupaciones.forEach(element => {
            element.P_PREGUNTAS.forEach(pregunta => {
              if (pregunta.P_ID_PREGUNTA === idpregunta) {
                pregunta.P_EXTENSION_ARCHIVO = extension;
                pregunta.P_RESPUESTA = response.P_ARCHIVO;
              }
            })
          });

        },
        error => {

        }
      );
    }
  }
  DescargarArchivo(path) {
    this._encuestasSevice.descargar_archivo(path).subscribe(
      response => {
        saveAs(response, path);
      },
      error => {

      });
  }


  EliminarArchivo(idpregunta, respuesta) {

    this._encuestasSevice.eliminar_archivo(respuesta).subscribe(
      response => {
        if (response.estado) {
          this.agrupaciones.forEach(element => {
            element.P_PREGUNTAS.forEach(pregunta => {
              if (pregunta.P_ID_PREGUNTA === idpregunta) {
                pregunta.P_EXTENSION_ARCHIVO = '';
                pregunta.P_RESPUESTA = null;
                pregunta.P_REQUERIDO = true;
              }
            })
          })
        }

      },
      error => {

      });

  }

  PreguntaCatalogo(idcatalogo, id_pregunta): any {
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
          let P_N1, P_N2, P_N3; 

          this.respuestasarray.forEach(repsuestas => {
            if (repsuestas.P_ID_PREGUNTA === Number(id_pregunta)) {
              P_N1 = repsuestas.P_RESPUESTA ; 
              P_N2 = repsuestas.P_RESPUESTA_N2 ;
              P_N3 = repsuestas.P_RESPUESTA_N3; 

              repsuestas.P_OPCION_RESPUESTA.forEach(opciones => {
                catalogo.DATOS.forEach(datos=>{
                 if(datos.P_ID_ITEM === opciones.P_ID_OPCION && opciones.P_ESTADO === 1){
                   datos.P_CHECKED = true 
                 }
                 
                })

              })
            }
          })

          item.CATALOGO_HIJO.forEach(hijo => {
            let catalogohijo = new Catalogo(0, 0, '', '', [], 0, 0);
            catalogohijo.P_ID_CATALOGO = hijo.ID_CATALOGO;
            catalogohijo.P_CATALOGO_TITULO = hijo.TITULO_CATALOGO;
            catalogohijo.P_CATALAGO_NOMBRE = hijo.TABLA;
            catalogohijo.P_ESTADO = hijo.ESTADO;
            catalogohijo.DATOS = [];

            if(Number(P_N1) > 0 && Number (P_N2) > 0){

              this._formularioService.get_catalogo_hijo(catalogohijo.P_CATALAGO_NOMBRE, Number(P_N1)).subscribe(

                response => {

                  response.forEach(items => {
                    let item = new ItemsCatalogo(0, '', 0);
                    item.P_ID_ITEM = items.ID_ITEM
                    item.P_DISPLAY = items.DISPLAY
                    item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                    catalogohijo.DATOS.push(item);
                  })
                },
                err => {

                }

              )
            }

            hijo.CATALOGO_HIJO.forEach(cathijo3 => {

              let catalogohijo3 = new Catalogo(0, 0, '', '', [], 0, 0);
              catalogohijo3.P_ID_CATALOGO = cathijo3.ID_CATALOGO;
              catalogohijo3.P_CATALOGO_TITULO = cathijo3.TITULO_CATALOGO;
              catalogohijo3.P_CATALAGO_NOMBRE = cathijo3.TABLA;
              catalogohijo3.P_ESTADO = cathijo3.ESTADO;
              catalogohijo3.DATOS = [];

              if (Number(P_N2) > 0 && Number(P_N3) > 0) {
                this._formularioService.get_catalogo_hijo(catalogohijo3.P_CATALAGO_NOMBRE, Number(P_N2)).subscribe(

                  response => {

                    response.forEach(items => {
                      let item = new ItemsCatalogo(0, '', 0);
                      item.P_ID_ITEM = items.ID_ITEM
                      item.P_DISPLAY = items.DISPLAY
                      item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                      catalogohijo3.DATOS.push(item);
                    })
                  },
                  err => {

                  }

                )
              }

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

  PreguntaCatalogoHijo(idcatalogo, id_pregunta): any {
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
          let P_N1, P_N2, P_N3;

          this.respuestasarray.forEach(repsuestaspadre => {
            repsuestaspadre.P_RESPUESTA_HIJO.forEach(respuesta=>{
              if (respuesta.P_ID_PREGUNTA === Number(id_pregunta)) {
                P_N1 = respuesta.P_RESPUESTA;
                P_N2 = respuesta.P_RESPUESTA_N2;
                P_N3 = respuesta.P_RESPUESTA_N3;

                respuesta.P_OPCION_RESPUESTA.forEach(opciones => {
                  catalogo.DATOS.forEach(datos => {
                    if (datos.P_ID_ITEM === opciones.P_ID_OPCION && opciones.P_ESTADO === 1 ) {
                      datos.P_CHECKED = true
                    }

                  })

                })
              }
            })
          })

          item.CATALOGO_HIJO.forEach(hijo => {
            let catalogohijo = new Catalogo(0, 0, '', '', [], 0, 0);
            catalogohijo.P_ID_CATALOGO = hijo.ID_CATALOGO;
            catalogohijo.P_CATALOGO_TITULO = hijo.TITULO_CATALOGO;
            catalogohijo.P_CATALAGO_NOMBRE = hijo.TABLA;
            catalogohijo.P_ESTADO = hijo.ESTADO;
            catalogohijo.DATOS = [];

            if (Number(P_N1) > 0 && Number(P_N2) > 0) {

              this._formularioService.get_catalogo_hijo(catalogohijo.P_CATALAGO_NOMBRE, Number(P_N1)).subscribe(

                response => {

                  response.forEach(items => {
                    let item = new ItemsCatalogo(0, '', 0);
                    item.P_ID_ITEM = items.ID_ITEM
                    item.P_DISPLAY = items.DISPLAY
                    item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                    catalogohijo.DATOS.push(item);
                  })
                },
                err => {

                }

              )
            }

            hijo.CATALOGO_HIJO.forEach(cathijo3 => {

              let catalogohijo3 = new Catalogo(0, 0, '', '', [], 0, 0);
              catalogohijo3.P_ID_CATALOGO = cathijo3.ID_CATALOGO;
              catalogohijo3.P_CATALOGO_TITULO = cathijo3.TITULO_CATALOGO;
              catalogohijo3.P_CATALAGO_NOMBRE = cathijo3.TABLA;
              catalogohijo3.P_ESTADO = cathijo3.ESTADO;
              catalogohijo3.DATOS = [];

              if (Number(P_N2) > 0 && Number(P_N3) > 0) {
                this._formularioService.get_catalogo_hijo(catalogohijo3.P_CATALAGO_NOMBRE, Number(P_N2)).subscribe(

                  response => {

                    response.forEach(items => {
                      let item = new ItemsCatalogo(0, '', 0);
                      item.P_ID_ITEM = items.ID_ITEM
                      item.P_DISPLAY = items.DISPLAY
                      item.P_ID_ITEM_PADRE = items.ID_ITEM_PADRE

                      catalogohijo3.DATOS.push(item);
                    })
                  },
                  err => {

                  }

                )
              }

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
            pregunta.P_RESPUESTA_HIJO_N2 = '';
            pregunta.P_RESPUESTA_HIJO_N3 = '';
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
            pregunta.P_RESPUESTA_HIJO_N3 = '';
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

    //console.log(e.target.value, id_pregunta, id_agrupacion);

  }

  SetOpcionesSelect(e: any, id_pregunta, id_agrupacion) {

    this.agrupaciones.forEach(agrup => {
      if (agrup.P_ID_AGRUPACION === id_agrupacion) {
        agrup.P_PREGUNTAS.forEach(pregu => {
          if (pregu.P_ID_PREGUNTA === id_pregunta) {
            pregu.P_RESPUESTA_HIJO_N2 = ''; 
            pregu.P_RESPUESTA_HIJO_N3 = '';
            pregu.P_OPCIONES_SELECT = [];
            pregu.P_OPCIONES.forEach(opciones => {
              if (opciones.P_ID_OPCION === Number(e.target.value)) {
                opciones.P_OPCIONES.forEach(opcionhijo => {
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

  onFileSelectRelacion(event, idpregunta, id_opcion) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this._encuestasSevice.subir_archivo(formData).subscribe(
        response => {
          let extension = '';

          switch (response.P_EXTENSION) {
            case 'PDF': {
              extension = 'PDF';
              break;
            }
            case 'DOCX': {
              extension = 'DOCX';
              break;
            }
            case 'DOC': {
              extension = 'DOCX';
              break;
            }

            case 'XLS': {
              extension = 'XLSX';
              break;
            }

            case 'XLSX': {
              extension = 'XLSX';
              break;
            }

            case 'JPG': {
              extension = 'IMAGE';
              break;
            }
            case 'JPGE': {
              extension = 'IMAGE';
              break;
            }
            case 'PNG': {
              extension = 'IMAGE';
              break;
            }
            default: {
              extension = 'OTRO';
            }
          }

          this.agrupaciones.forEach(element => {
            element.P_PREGUNTAS.forEach(pregunta => {

              pregunta.P_OPCIONES.forEach(opcion => {
                if (opcion.P_ID_OPCION === id_opcion) {
                  opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
                    if (pregunta.P_ID_PREGUNTA === idpregunta) {
                      pregunta.P_EXTENSION_ARCHIVO = extension;
                      pregunta.P_RESPUESTA = response.P_ARCHIVO;
                    }
                  })
                }
              })

            })
          });

        },
        error => {

        }
      );
    }
  }

  EliminarArchivoRelacion(idopcion, idpregunta, respuesta) {

    this._encuestasSevice.eliminar_archivo(respuesta).subscribe(
      response => {
        if (response.estado) {
          this.agrupaciones.forEach(element => {
            element.P_PREGUNTAS.forEach(pregunta => {

              pregunta.P_OPCIONES.forEach(opcion => {
                opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
                  if (pregunta.P_ID_PREGUNTA === idpregunta) {
                    pregunta.P_EXTENSION_ARCHIVO = '';
                    pregunta.P_RESPUESTA = null;
                  }
                })
              })

            })
          })
        }

      },
      error => {

      });

  }

  getOpcionesRelacion(e: any, idOpcion, idPregunta) {

    if (e.target.checked) {

      this.agrupaciones.forEach(elemen => {
        elemen.P_PREGUNTAS.forEach(item => {
          item.P_OPCIONES.forEach(opcion => {
            opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
              if (pregunta.P_ID_PREGUNTA === idPregunta) {
                pregunta.P_OPCIONES_RESPUESTA.push(idOpcion);
              }
            })
          })

        })
      })
    }
    else {
      this.agrupaciones.forEach(elemen => {
        elemen.P_PREGUNTAS.forEach(item => {

          item.P_OPCIONES.forEach(opcion => {
            opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
              if (pregunta.P_ID_PREGUNTA === idPregunta) {
                pregunta.P_OPCIONES_RESPUESTA.push(idOpcion);
                pregunta.P_OPCIONES_RESPUESTA = pregunta.P_OPCIONES_RESPUESTA.filter(m => m != idOpcion)
              }
            })
          })

        })
      })
    }
  }

  SetearHijopcionrelacion(e: any, id_pregunta, id_opcion, id_agrupacion) {
    let tabla_hijo;
    this.agrupaciones.forEach(element => {
      if (element.P_ID_AGRUPACION === id_agrupacion) {
        element.P_PREGUNTAS.forEach(pregunta => {
          pregunta.P_OPCIONES.forEach(opcion => {
            if (opcion.P_ID_OPCION === id_opcion) {

              opcion.P_PREGUNTA_RELACION.forEach(pregunta => {
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

}
