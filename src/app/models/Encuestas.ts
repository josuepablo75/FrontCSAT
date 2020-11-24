export class Encuestas {
    constructor(
        public P_ID_ENCUESTA: number,
        public P_ID_FORMULARIO: number,
        public P_FORMULARIO_NOMBRE: string, 
        public P_FECHA_REGISTRO: string, 
        public P_CONFIRMAR_REGISTRO: number, 
        public P_ESTADO: number, 
        public P_USUARIO_NOMBRE: string = ''
    ) {

    }
}