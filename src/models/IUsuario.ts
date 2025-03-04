export interface IUsuario {
    uuid: string; // Identificador único universal del usuario
    nombre: string;
    telefono: string;
    correo: string; // Ahora es obligatorio (ya no tiene el signo ?)
    status: 0 | 1; // Solo puede ser 0 o 1
    sessionId: string;
}
