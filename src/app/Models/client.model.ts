import { TipoDocumento } from './tipoDocumento';

export class Client {
    public id: number;
    public tipoDocumento: TipoDocumento;
    public nroDocumento: string;
    public nombre: string;
    public apellidos: string;
    public email: string;
    public telefono: string;
    public celular: string;
    public direccion: string;
    public pais: string;
    public ciudad: string;
    public fechaIngreso: string;
    public estado: boolean;
}
