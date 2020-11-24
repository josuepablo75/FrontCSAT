import { Preguntas } from './Preguntas';

export class Agrupaciones {
    constructor(
        public P_ID_AGRUPACION: number,
        public P_NUM_TAB: string,
        public P_TITULO_A: string,
        public P_TITULO_AC: string, 
        public P_PREGUNTAS: Preguntas [], 
        public P_MOSTRAR_TITULO: boolean, 
        public P_MOSTRAR_INPUT: boolean, 
        public P_ESTADO: number, 
        public P_NUEVO: number, 
        public P_ORDEN: number

    ) {

    }
}