import { EdificioCampus } from "./edificioCampus.model";

export interface Comercio {
    id: number;
    IdCreador: number;
    NombreComercial: string;
    Activo: boolean;
    Edificio: EdificioCampus
}