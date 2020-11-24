import { Component, OnInit } from '@angular/core';
import { GLOBAL } from "../../services/GLOBAL";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-c-satlayout',
  templateUrl: './c-satlayout.component.html',
})
export class CSATLayoutComponent implements OnInit {

  public identity;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router, 
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    // this.UsuarioId = this.identity._id; 
  }

  ngOnInit(): void {
    if (this.identity) {
      console.log("Bienvenido");

    } else {
      this._router.navigate(['login']);
    }
  }

}
