import { Component, OnInit } from '@angular/core';

import { GLOBAL } from "../../services/GLOBAL";
import {UserService} from "../../services/user.service"; 
import {TweetService } from "../../services/tweet.service"; 
import {Router} from "@angular/router";

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  public identity;
  public url;
  public UsuarioId; 
  public datos_user : any = {};
  public datos_publicaciones : any = {}; 
  public datos_follow: any= {}; 
  public datos_mis_tweets: any = {}; 
  public datos_mis_seguidores: any = {}; 
  public count_seguidores; 
  public count_follow; 
  public texto;

  constructor(
    private _userService: UserService,
    private _tweetService: TweetService,
    private _router:Router, 
     
  ) {
    this.url = GLOBAL.url; 
    this.identity = this._userService.getIdentity();
   // this.UsuarioId = this.identity._id; 

   }

  ngOnInit(): void {
    if(this.identity)
    {
      console.log("Bienvenido");

    }else{
      this._router.navigate(['']); 
    }
  }

  GuardarPublicacion()
  {
     var datos_user: any = {};

     datos_user = {
       texto: this.texto , 
       user: this.UsuarioId
     }

    console.log(datos_user);

    this._tweetService.post_publicar(datos_user).subscribe(
      response => {
        console.log(response);
        if (response){
          this.datos_publicaciones.unshift(response.tweet);
          this.datos_mis_tweets.unshift(response.tweet);
          this.datos_mis_tweets.pop();
          
        }
        this.texto = "";
        console.log(this.datos_publicaciones);
      },
      error => {
        console.log(error);
      }
    )
  }

  


}
