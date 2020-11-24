import { Preguntas } from './Preguntas';
import { ItemsCatalogo } from './ItemsCatalogo';

export class Catalogo {
    constructor(
        public P_ID_CATALOGO: number,
        public P_ID_NIVEL: number,
        public P_CATALOGO_TITULO: string,
        public P_CATALAGO_NOMBRE: string,
        public P_CATALOOGO_HIJOS: Catalogo [], 
        public P_ID_USUARIO_REGISTRA: number = 0, 
        public P_ESTADO: number =  0, 
        public P_FECHA_REGISTRO: string = '', 
        public DATOS: ItemsCatalogo [] = [], 
        public P_CATALOGO_DISPLAY: string = ''
    ) {

    }
}