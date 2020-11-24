import { Agrupaciones } from './Agrupaciones';

export class Formularios {
    constructor(
        public P_ID_FORMULARIO: number, 
        public P_TITULO_F: string, 
        public P_DESCRIPCION_F: string,
        public P_ID_USUARIO_REGISTRA: number, 
        public P_AGRUPACIONES: Agrupaciones[], 
        public P_LATITUD: number, 
        public P_LONGITUD: number, 
        public P_CONFIRMAR: number=0,
        public P_ID_ENCUESTA: number = 0
    ) {

    }
}