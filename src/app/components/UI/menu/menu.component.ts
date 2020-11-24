import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public identity;
  public menu: any = {}; 
  public iniciales: string;
  public color: string; 

  constructor(
    private _userService: UserService,
    private _router: Router, 
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    this._userService.get_menu_usuario(this.identity.ID_USUARIO).subscribe(
      response => {
        this.menu = response;
      },
      err => {
        if(err.status === 401){
 
          this._userService.logout(this.identity.ID_USUARIO).subscribe(
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
    )
    
    
    this.iniciales = this.identity.PRIMER_NOMBRE.slice(0, 1) + this.identity.PRIMER_APELLIDO.slice(0, 1);
    this.color = localStorage.getItem('color');
 
  }

}
