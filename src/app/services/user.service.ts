import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { observable, from, Observable } from 'rxjs'
import { GLOBAL } from './GLOBAL'
import { User } from '../models/User'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url
  public token
  public identity

  constructor(
    private _http: HttpClient, 
    private _router: Router,
  ) { 
    this.url = GLOBAL.url
   }

   registrar (user):Observable<any>{
  
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })

    let x = this._http.post(this.url +'usuarios/registro', JSON.stringify(user),{headers: headers})
    return x
   }


  actualizar(user): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    
    let x = this._http.post(this.url + 'usuarios/actualizarusuario', JSON.stringify(user), { headers: headers })
    return x
  }

  actualizarestado(user): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })

    let x = this._http.post(this.url + 'usuarios/actualizarestado', JSON.stringify(user), { headers: headers })
    return x
  }

   login(user, gettoken = null):Observable<any> {
      let json = user
      if (gettoken!=null){
        user.gettoken = true
      } 

      let headers = new HttpHeaders().set('content-type','application/json')
      return this._http.post(this.url +'auth/login',json,{headers: headers})

   }

  logout(user): Observable<any> {       
    let headers = new HttpHeaders().set('content-type', 'application/json')
    return this._http.post(this.url + 'auth/logout', JSON.stringify(user), { headers: headers })
  }

  get_menu(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'usuarios/menu', { headers: headers })
  }

  get_menu_usuario(id_usuario): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })

    return this._http.get(this.url + 'usuarios/menu_opciones/' + id_usuario, { headers: headers })
  }

  get_tipo(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get(this.url + 'usuarios/tipo', { headers: headers })
  }

  get_usuarios(estado): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +localStorage.getItem('token')
    })

    //let headers = new HttpHeaders().set('content-type', 'application/json', 'Authorization')
    return this._http.get(this.url + 'usuarios/usuarios/'+estado, { headers: headers })
  }

  get_usuarios_byId(id_usuario): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    
    //let headers = new HttpHeaders().set('content-type', 'application/json', 'Authorization')
    return this._http.get(this.url + 'usuarios/actualizar/' + id_usuario, { headers: headers })
  }

   get_users():Observable<any>{
      let headers = new HttpHeaders().set('content-type','application/json')
     return this._http.get(this.url+'usuarios',{headers: headers})
   }

   get_user(id):Observable<any>{
    let headers = new HttpHeaders().set('content-type','application/json')
    return this._http.get(this.url+'usuario/'+id,{headers: headers})
   }

   get_messages(de,para):Observable<any>{
    let headers = new HttpHeaders().set('content-type','application/json')
    return this._http.get(this.url+'mensajes/'+de+'/'+para,{headers: headers})
   }

   get_send_msm(msm):Observable<any>{
    let headers = new HttpHeaders().set('content-type','application/json')
    return this._http.post(this.url+'mensaje/enviar/',msm,{headers: headers})
   }

   get_follow_user(data):Observable<any>{
    var obj = {
      follow : data.follow ,
      seguidores : data.seguidores
    }
    console.log(obj)
    let headers = new HttpHeaders().set('Content-Type','application/json')
    let x = this._http.post(this.url+'usuario/seguir/',obj,{headers: headers})
    return x
   }

   getToken () {
      let token = localStorage.getItem('token')
      if (token){
        this.token = token
      }else
      {
        this.token = null
      }
      return token
   }

   getIdentity():Observable<any>{
    let identity = JSON.parse( localStorage.getItem('identity'))
    if (identity){
      this.identity = identity
     /* this.get_usuarios_byId(this.identity.ID_USUARIO).subscribe(
        response => {
         
        },
        err => {
          if (err.status === 401) {

            this.logout(this.identity.ID_USUARIO).subscribe(
              response => {
                localStorage.removeItem('token')
                localStorage.removeItem('identity')
                localStorage.removeItem('color')
                this._router.navigate(['login'])
              },
              error => {
              }
            )
          }

        }
      )*/

    }else
    {
      this.identity = null
    }
    return identity
    
   }

  
   
   update_config (data):Observable<any>{
    console.log(data);
    
    const fd = new FormData();
    fd.append('nombre',data.nombre)
    fd.append('telefono',data.telefono)
    fd.append('imagen',data.imagen)
    if(data.password){
      fd.append('password',data.password)
    }
    fd.append('bio',data.bio)
    fd.append('facebook',data.facebook)
    fd.append('estado',data.estado)
    
    return this._http.put(this.url+'usuario/editar/'+data._id,fd)
   }

}
