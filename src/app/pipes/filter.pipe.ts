import { Pipe, PipeTransform } from '@angular/core';
import { Opciones } from '../models/Opciones';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
  
  const opcionesarray = [];

    for(const opcion of value){
      if (opcion.P_ESTADO === 1) {
        opcionesarray.push(opcion);
      }
    }

    
    return opcionesarray;
   
  }

}
