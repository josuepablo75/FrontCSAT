import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { exit } from 'process';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizarusuario',
  templateUrl: './actualizarusuario.component.html',
  styleUrls: ['./actualizarusuario.component.css']
})
export class ActualizarusuarioComponent implements OnInit {

  id_usuario: number;
  public identity
  private sub: any;
  public user;
  public menu: any = {};
  public tipo_usuario: any = {};
  public habilitar: boolean; 

  constructor(
    private route: ActivatedRoute,
    private _router: Router,  
    private _userService: UserService, 
    private toastr: ToastrService, ) { 
    this.identity = this._userService.getIdentity()
    }

  ngOnInit(): void {
    this.user = new User(0, 0, '', '', '', '', '', '', '', '', '', '', '', 0, 0, [], [], [] , '');

    this.sub = this.route.params.subscribe(params => {
      this.id_usuario = +params['id_usuario'];
      
    });

        this._userService.get_menu().subscribe(
      response => {
        this.menu = response;
      
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
    
    if (this.id_usuario !== 0 ){
      this._userService.get_usuarios_byId(this.id_usuario).subscribe(
        response => {

          response.forEach(item => {

            this.menu.forEach(opciones => {
              opciones.OPCIONES.forEach(element => {

                item.PERMISOS.forEach(permiso => {

                  if (Number(permiso.ID_OPCION) === Number(element.ID_OPCION)) {
                    element.CHECKED = true;
                  }

                });

              });

            });
            
            this.user.ID_USUARIO = item.ID_USUARIO;
            this.user.ID_TIPO_USUARIO = item.ID_TIPO_USUARIO;
            this.user.CUI = item.CUI;
            this.user.PRIMER_NOMBRE = item.PRIMER_NOMBRE;
            this.user.SEGUNDO_NOMBRE = item.SEGUNDO_NOMBRE;
            this.user.PRIMER_APELLIDO = item.PRIMER_APELLIDO;
            this.user.SEGUNDO_APELLIDO = item.SEGUNDO_APELLIDO;
            this.user.FECHA_NACIMIENTO = item.FECHA_NACIMIENTO;
            this.user.GENERO = item.GENERO;
            this.user.USERNAME = item.USERNAME;
            this.user.PASSWORD = 'default';
            this.user.EMAIL = item.EMAIL;
            this.user.PWS = item.PWS;
            this.imageUrl = item.FOTO;

            item.PERMISOS.forEach(permisos =>{
              this.user.PERMISOS.push(permisos.ID_OPCION); 
            });


            

          });
        },
        err => {

        }
      )
    }

    

 
  }

  onSubmit(registroForm) {

    if (registroForm.valid) {

      if (this.user.ID_TIPO_USUARIO === 0) {
        this.toastr.error("Seleccione el tipo de usuario que desea registrar");
      }
      else {
        this.user.FOTO = this.imageUrl;
        this._userService.actualizar(this.user).subscribe(
          response => {
            this.toastr.success(response.mensaje);
            this._router.navigate(['usuarios'])
          },
          error => {
            this.toastr.error(error.error.mensaje);
          }

        );  
      }

    } else {
      this.toastr.error("Ingrese la informacion en los campos requeridos");
    }

  }

  getOpciones(e: any, id: string) {
    //   console.log(e);
    let estado : boolean;
    let estadoanterio : boolean;
    let count: number = 0;  
    if (e.target.checked) {
      this.user.PERMISOS.forEach(opcion => {

        if (opcion === id ){
          estado = true; 
          estadoanterio = true;  
        }
        if(!estadoanterio){
          if (opcion !== id) {
            estado = false;
          }
        }
        count++; 
      });

      if(estado === false || count === 0 ){
        this.user.NUEVOS_PERMISOS.push(id); 
      }

      this.user.DESHABILITAR_PERMISOS = this.user.DESHABILITAR_PERMISOS.filter(m => m != id)
      
    }
    else { 

      this.user.PERMISOS.forEach(opcion => {

        if(!estado){
          if (opcion === id) {
            estado = true;
          }
        }

      });

      if (estado === true) {
        this.user.DESHABILITAR_PERMISOS.push(id); 
      }   
      this.user.NUEVOS_PERMISOS = this.user.NUEVOS_PERMISOS.filter(m => m != id)
    }

  }

  public fileToUpload: any;
  public imageUrl: any;

  SubirImagen(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }

  ImageReset() {
    this.imageUrl = null;
  }

}
