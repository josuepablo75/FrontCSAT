import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { observable, from, Observable } from 'rxjs'
import { GLOBAL } from './GLOBAL' 
import { Formularios} from '../models/Formulario'

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  public url
  public token
  public identity

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  get_tipo_dato(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'formulario/tipodato', { headers: headers })
  }

  get_formularios(estado): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'formulario/formularios/'+estado, { headers: headers })
  }

  registrar_formulario(Formularios): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    let x = this._http.post(this.url + 'formulario/registar', JSON.stringify(Formularios), { headers: headers })
    return x
  }

  asignarFormulario(Asignacion): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    let x = this._http.post(this.url + 'formulario/asignarformulario', JSON.stringify(Asignacion), { headers: headers })
    return x
  }

  desasignarFormulario(Asignacion): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    let x = this._http.post(this.url + 'formulario/desasignarformulario', JSON.stringify(Asignacion), { headers: headers })
    return x
  }

  actualizar_formulario(Formularios): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    let x = this._http.post(this.url + 'formulario/actualizarformulario', JSON.stringify(Formularios), { headers: headers })
    return x
  }

  get_formulario(id_formulario): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })

    //let headers = new HttpHeaders().set('content-type', 'application/json', 'Authorization')
    return this._http.get(this.url + 'formulario/formulario/' + id_formulario, { headers: headers })
  }

  get_formulario_respuesta(id_formulario): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })

    //let headers = new HttpHeaders().set('content-type', 'application/json', 'Authorization')
    return this._http.get(this.url + 'formulario/formulariorespuesta/' + id_formulario, { headers: headers })
  }

  actualizarestado(formulario): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })

    let x = this._http.post(this.url + 'formulario/actualizarestado', JSON.stringify(formulario), { headers: headers })
    return x
  }


  get_usuarios_disponibles(formularioid): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'formulario/usuarios/' + formularioid, { headers: headers })
  }

  get_usuarios_asignados(formularioid): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'formulario/usuariosasignados/' + formularioid, { headers: headers })
  }

  get_formularios_asignados(idUsuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'formulario/formulariosasignados/' + idUsuario, { headers: headers })
  }

  registrar_catalogo(catalogo): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    let x = this._http.post(this.url + 'formulario/registrarcatalogo', JSON.stringify(catalogo), { headers: headers })
    return x
  }


  get_catalogos(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'formulario/catalogos', { headers: headers })
  }

  actualizarestado_catalogo(catalogo): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })

    let x = this._http.post(this.url + 'formulario/catalogos/actualizarestado', JSON.stringify(catalogo), { headers: headers })
    return x
  }

  get_catalogo(id_catalogo): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'catalogos/catalogo/' + id_catalogo, { headers: headers })
  }

  get_catalogo_hijo(tabla, id_padre): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'catalogos/catalogohijo/' + tabla + '/' + id_padre, { headers: headers })
  }



}
