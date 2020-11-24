import { Opciones } from './Opciones';
import { Catalogo } from './Catalogos';

export class Preguntas {
    constructor(
        public P_ID_PREGUNTA: number, 
        public P_TITULO_P: string,
        public P_TIPO_DATO: string,
        public P_CAMPO_OBLIGATORIO: number, 
        public P_OPCIONES: Opciones [],
        public P_ESTADO: number,  
        public P_MODO_EDICION: boolean, 
        public P_NUEVO: number,
        public P_RESPUESTA: string,
        public P_OPCIONES_RESPUESTA: number[], 
        public P_PATH_RESPUESTA: string, 
        public P_REQUERIDO: boolean, 
        public P_RESPUESTA_NUMBER: number =0,
        public P_EXTENSION_ARCHIVO: string = '', 
        public P_IDENTIFICADOR: string = '', 
        public P_PREGUNTA_CATALAGO: Catalogo = null, 
        public P_CATALOGO_ESTADO: boolean = false, 
        public P_OPCIONES_SELECT: Opciones [] =[], 
        public P_LISTA_DOBLE: boolean = false, 
        public P_NUEVA_RELACION: number = 0, 
        public P_RESPUESTA_HIJO_N2: string ='' ,
        public P_RESPUESTA_HIJO_N3: string = '' 
        ) {

    }
}