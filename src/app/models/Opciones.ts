import { Preguntas } from './Preguntas';

export class Opciones {
    constructor(
        public P_ID_PREGUNTA: number, 
        public P_ID_OPCION: number, 
        public P_TITULO_OPCION: string, 
        public P_ESTADO: number, 
        public P_NUEVO: number,
        public P_CHEKED: boolean=false,
        public P_HABILITAR_AGREGAR: boolean = false,
        public P_PREGUNTA_SELECCIONADA: number= 0,
        public P_PREGUNTA_RELACION: Preguntas[] = [], 
        public P_OPCIONES: Opciones [] = [], 
        public P_ID_OPCION_PADRE: number = 0, 
        public P_TLO_OPCION_SEC: string ='', 
        public P_VER_PR_RELACION: boolean = false
    ) {

    }
}