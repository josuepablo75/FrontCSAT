import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL' 
import { observable, from, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  public url
  public token
  public identity

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  get_encuestas(id_formulario, id_usuario): Observable<any> {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'encuesta/encuestas/' + id_formulario+'/'+id_usuario, { headers: headers })
  }

  get_encuestas_all(id_formulario): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'encuesta/encuestasrespondidas/' + id_formulario , { headers: headers })
  }

  get_respuesta(id_encuesta): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'encuesta/respuestas/' + id_encuesta , { headers: headers })
  }

  registrar_respuestas(Formularios): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    let x = this._http.post(this.url + 'encuesta/registar', JSON.stringify(Formularios), { headers: headers })
    return x
  }

  actualizar_respuestas(Formularios): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    let x = this._http.post(this.url + 'encuesta/actualizar', JSON.stringify(Formularios), { headers: headers })
    return x
  }
  
  subir_archivo(Formularios) {
    let x = this._http.post<any> (this.url + 'usuarios/uploadperfil', Formularios)
    return x
  }

  eliminar_archivo(path): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'archivos/eliminar/' + path, { headers: headers })
  }

  descargar_archivo(path): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'usuarios/ver/' + path,  { responseType: 'blob', headers: headers })
  }

}
