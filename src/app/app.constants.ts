export class Constants {
    public static API_ENDPOINT = 'http://localhost:8090/EAapp-Back/api';
    public static PATH_USUARIOS = 'usuarios';
    public static PATH_LOGIN = 'login';
    public static PATH_RECUPERAR = 'recuperar';
    public static PATH_CARGOS = 'roles';
    public static IMAGES = 'assets/images';

    public static 0 = 'Servidor Inaccesible';
    public static 401 = 'El usuario se encuentra inactivo';
    public static 402 = 'Email o Contraseña inválida';
    public static 403 = 'Su sesión ha expirado';

    public static CREATE_USER_SUCCES = 'Se guardo el usuario correctamente';
    public static UPDATE_USER_SUCCES = 'Se actualizo el usuario correctamente';
    public static DELETE_USER_SUCCES = 'Se elimino el usuario correctamente';
    public static SEND_MAIL_SUCCES = 'Se envio un correo de recuperacion a su cuenta';
    public static BTN_OK = 'Entendido';
}
