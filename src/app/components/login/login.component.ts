import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { JsonPipe } from '@angular/common';
import {ToastrService} from 'ngx-toastr'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public user
  public token
  public identity
  public data_user
  public colors: any = [
    '#F39C12',
    '#00A7D0',
    '#00A65A',
    '#DD4B39',
    '#3C8DBC',
    '#6DDADA',
    '#555299',
    '#D81B60',
    '#FF851B',
    '#001A35'
  ]; 

  constructor( 
  private _userService: UserService,
  private _router: Router, 
  private toastr: ToastrService
  )
  { 
    this.data_user = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.user = new User(0,0, '','','','','','','','','','','',0,0, [], [], [], '')
    if(this.data_user){
    //console.log(this.data_user)
     this._router.navigate([''])
    }

  }

  onSubmit(loginForm)
  {
    if(loginForm.valid)
    {
      this._userService.login(this.user).subscribe(
        response => {
          //console.log(response)
          if (response.estado == false) {
            this.toastr.error(response.mensaje);
          }
          else 
          {
            let i=  Math.floor(Math.random() * 10);
            this.toastr.success(response.mensaje);
            this.token = response.token
            this.identity = JSON.stringify(response.Usuario)
            localStorage.setItem('token', this.token)
            localStorage.setItem('identity', this.identity)
            localStorage.setItem('color', this.colors[i]); 
            this._router.navigate([''])

            /*this._userService.login(this.user, true).subscribe(
              response => {
                localStorage.setItem('identity', this.identity)
                this._router.navigate([''])
              },
              error => {

              }

            ) */

          }        
 
        },
        error => {

        }
      )
    }
    else
    {
      this.toastr.warning('Ingrese usuario y contraseña');
    }
  }

}

