import { Component, OnInit, Renderer2, ɵConsole } from '@angular/core';
import { User } from "../../models/User";   
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'; 
import { Permisos } from 'src/app/models/Permisos';
import { read } from 'fs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public user;
  public menu: any = {}; 
  public tipo_usuario: any = {}; 
  public IdTipoUsuario : number ;
  public selectedItem: string[]; 
  public identity;
  public setPermisos: boolean= false;
 

  constructor(
    private _userService: UserService,
    private _router: Router, 
    private toastr: ToastrService, 
 
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.user = new User(0, 0, '','', '', '', '', '', '', '', '', '','', 0, 0, [], [], [], '');
    this._userService.get_menu().subscribe(
      response => {
        this.menu = response;
        this.menu.forEach(opciones => {
          opciones.OPCIONES.forEach(element => {
            element.CHECKED = false;
          });

        });

        //console.log(this.menu);
      },
      err => {

      }
    )


    this._userService.get_tipo().subscribe(
      response => {
        this.tipo_usuario = response;
       
      },
      err => {

      }
    )

    this.selectedItem = new Array<string>();
    this.user.ID_USUARIO_REGISTRA = this.identity.ID_USUARIO;
    this.user.PERMISOS = new Array<Permisos>();
  
  }

  onSubmit(registroForm){
   
    
    if(registroForm.valid){
     
      if(this.user.ID_TIPO_USUARIO === 0){
        this.toastr.error("Seleccione el tipo de usuario que desea registrar");
      }
      else{
        this.user.FOTO = this.imageUrl; 
        this._userService.registrar(this.user).subscribe(
          response => {
            registroForm.reset();
            this._userService.get_menu().subscribe(
              response => {
                this.menu = response;
              },
              err => {

              });
              this.imageUrl = null;
               
            this.toastr.success(response.mensaje);
            
          },
          error => {
            this.toastr.error(error.error.mensaje);
          }

        );  
      }
      
    }else
    {
      this.toastr.error("Ingrese la informacion en los campos requeridos");
      
    }
   
   

  }

  getOpciones(e:any, id:string)
  {
 //   console.log(e);
    if(e.target.checked){
      this.user.PERMISOS.push(id)
    }
    else
    {
      this.user.PERMISOS = this.user.PERMISOS.filter(m=>m!=id)
    }

    //console.log(this.user.PERMISOS); 
    
  }

  onResetForm(){
  
  }

  getTipoUsuario(e: any){
    
    if ( Number(this.user.ID_TIPO_USUARIO) === 1)
    {
     
      this.menu.forEach(opciones => {
        opciones.OPCIONES.forEach(element => {
          element.CHECKED = true;
          this.user.PERMISOS.push(element.ID_OPCION);
        });

      });

    }
    else {
      this.menu.forEach(opciones => {
        opciones.OPCIONES.forEach(element => {
          element.CHECKED = false;
        });

      });
      this.user.PERMISOS = [];
    }
    
  }
  
  public fileToUpload: any;
  public imageUrl: any;

  SubirImagen(file: FileList){
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imageUrl = event.target.result;
    }
    
    reader.readAsDataURL(this.fileToUpload);
  }

  ImageReset(){
    this.imageUrl = null; 
  }

}
