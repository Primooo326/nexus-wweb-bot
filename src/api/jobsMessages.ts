import { fetchApi } from "./instances";
import { IJobEnvioMensaje } from "@/models/IJobEnvioMensaje";

export const getJobs = async (): Promise<IJobEnvioMensaje[]> => {
    return fetchApi.get('/jobs');
}

export const getJobById = async (id: string): Promise<IJobEnvioMensaje> => {
    return fetchApi.get(`/jobs/${id}`);
}

export const getJobsByBot = async (botId: string): Promise<IJobEnvioMensaje[]> => {
    return fetchApi.get(`/jobs/bot/${botId}`);
}

export const createJob = async (data: IJobEnvioMensaje): Promise<IJobEnvioMensaje> => {
    return fetchApi.post('/jobs', data);
}

export const updateJobStatus = async (id: string, data: IJobEnvioMensaje): Promise<IJobEnvioMensaje> => {
    return fetchApi.put(`/jobs/${id}/status`, data);
}

export const deleteJob = async (id: string): Promise<void> => {
    return fetchApi.delete(`/jobs/${id}`);
}