import { OpcionRespuesta } from './OpcionRespuesta';

export class Respuestas {
    constructor(
        public P_ID_RESPUESTA: number,
        public P_ID_PREGUNTA: number,
        public P_RESPUESTA: string, 
        public P_RESPUESTA_N2: string, 
        public P_RESPUESTA_N3: string, 
        public P_OPCION_RESPUESTA: OpcionRespuesta [] = [],
        public P_RESPUESTA_HIJO: Respuestas [] = []
    ) {

    }
} 