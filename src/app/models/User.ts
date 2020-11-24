import { Permisos } from './Permisos';

export class User{
    constructor(
        public ID_USUARIO: number,
        public ID_TIPO_USUARIO: number,
        public CUI: string, 
        public PRIMER_NOMBRE: string, 
        public SEGUNDO_NOMBRE: string, 
        public PRIMER_APELLIDO: string, 
        public SEGUNDO_APELLIDO: string, 
        public FECHA_NACIMIENTO: string, 
        public GENERO: string, 
        public USERNAME: string, 
        public PASSWORD: string, 
        public EMAIL: string, 
        public FOTO: string,
        public ID_USUARIO_REGISTRA: number, 
        public ESTADO: number,
        public PERMISOS: Permisos [], 
        public NUEVOS_PERMISOS: Permisos[], 
        public DESHABILITAR_PERMISOS: Permisos[], 
        public PWS: string 
    ){

    }
}