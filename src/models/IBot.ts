export interface IBot {
    uuid: string; // Identificador único universal del bot
    usuarioId: string; // UUID del usuario propietario del bot
    nombre: string; // Nombre del bot
    descripcion: string; // Descripción del bot
    status: "activo" | "inactivo" | "suspendido"; // Estado del bot
}