export interface IJobEnvioMensaje {
    id: string; // Identificador único del job
    botId: string; // UUID del bot que crea el job
    destinatarios: ICanalEnvio[]; // Lista de canales de envío (email o teléfono)
    mensaje: string; // Cuerpo del mensaje
    archivosAdjuntos?: IArchivoAdjunto[]; // Lista de archivos adjuntos (opcional)
    programacionEnvio?: IProgramacionEnvio; // Fecha y hora programada para el envío (opcional)
    creadoEn: Date; // Fecha y hora en que se creó el job
    status: "pendiente" | "enviado" | "fallido"; // Estado del job
}

export interface ICanalEnvio {
    tipo: "email" | "telefono"; // Tipo de canal: email o teléfono
    direccion: string; // Dirección del canal: correo electrónico o número de teléfono
}

export interface IArchivoAdjunto {
    tipo: "imagen" | "pdf" | "word" | "video"; // Tipo de archivo
    nombre: string; // Nombre del archivo
    url: string; // URL o ruta del archivo
}

export interface IProgramacionEnvio {
    tipo: "recurrente" | "unaVez"; // Fecha programada en formato ISO (YYYY-MM-DD)
    scheduledDate: string; // Hora programada en formato 24 horas (HH:mm)
}
