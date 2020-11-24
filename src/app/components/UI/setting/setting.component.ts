import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {

  public identity;
  public color: string; 
  public iniciales: string; 
  constructor(
    private _userService: UserService,
    private _router: Router, 
  ) 
  { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.iniciales = this.identity.PRIMER_NOMBRE.slice(0, 1) + this.identity.PRIMER_APELLIDO.slice(0, 1);
    this.color = localStorage.getItem('color');
  }

  CerrarSesion(id_usuario){
    var usuario: any = {};

    usuario = {
      ID_USUARIO: id_usuario
    }

    this._userService.logout(usuario).subscribe(
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
