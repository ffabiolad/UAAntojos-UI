export interface Producto {
    id: number;
    IdComercio: number;
    Categoria_idCategoria: number;
    Nombre: string;
    Precio: number;
    Descripcion: string;
    Activo: boolean;
    Disponible: number;
    modification_time: Date;
    insertion_time: Date;
    cantidad:number;
}
