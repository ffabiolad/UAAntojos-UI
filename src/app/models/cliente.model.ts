export interface Cliente {
    id: number;
    Nombres: string;
    ApPaterno: string;
    ApMaterno: string;
    Correo: string;
    Contrasena: string;
    Activo: boolean;
    token: string;
}
export interface usuarioLogin {
    id: number;
    Nombres: string;
    ApPaterno: string;
    ApMaterno: string;
    tipo: number;
    Activo: boolean;
    token: string;
}