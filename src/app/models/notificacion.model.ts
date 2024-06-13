export interface Notificacion {
    id: number;
    IdPedido: number;
    IdTipoNotificacion: number;
    Estado: boolean;
    insertion_time: Date;
    FechaAct: Date;
    Texto: string;
}
