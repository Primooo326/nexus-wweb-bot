import { fetchApi } from "./instances";

export const login = (data: { correo: string, contraseña: string }) => {
    return fetchApi.post('/auth/login', data);
}

export const registerApi = (data: { correo: string, contraseña: string, nombre: string, telefono: string }) => {
    return fetchApi.post('/auth/register', data);
}