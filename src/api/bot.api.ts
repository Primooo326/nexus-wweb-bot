import { IBot } from "@/models/app.model";
import { fetchApi } from "./instances";

export const getBots = async (): Promise<IBot[]> => {
    return fetchApi.get('/bots');
}

export const getBotsByUser = async (uuid: string): Promise<IBot[]> => {
    return fetchApi.get(`/bots/user/${uuid}`);
}

export const getBot = async (uuid: string): Promise<IBot> => {
    return fetchApi.get(`/bots/${uuid}`);
}

export const createBot = async (data: IBot): Promise<IBot> => {
    return fetchApi.post('/bots', data);
}

export const updateBot = async (uuid: string, data: IBot): Promise<IBot> => {
    return fetchApi.put(`/bots/${uuid}`, data);
}

export const deleteBot = async (uuid: string): Promise<void> => {
    return fetchApi.delete(`/bots/${uuid}`);
}