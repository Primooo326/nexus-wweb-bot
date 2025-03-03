import { API_URL } from "@/config";
import axios, { type AxiosResponse, type ResponseType } from 'axios';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';


const instance = () => {

    let baseURL = API_URL;

    const instancia = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    instancia.interceptors.request.use(
        (config) => {
            let token = ""

            if (Cookies.get('token')) {
                token = String(Cookies.get('token'));
            }
            if (token) {
                config.headers.Authorization = token ? `Bearer ${token}` : null;
            }

            return config;
        },
        (error) => {
            console.error(error);
            return Promise.reject(error);
        }
    );

    instancia.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error("error response::::", error);
            if (error.code === 'ERR_NETWORK') {
                toast.error('Error de red, verifique su conexión a internet.');
                return Promise.reject(error);
            } else if (error.response.data.message) {

                toast.error(error.response.data.message);
            }
            else {
                console.error(error);
                toast.error('Error inesperado, por favor intente nuevamente.');
            }
            return Promise.reject(error);
        }
    );

    return instancia;
}




const responseBody = (response: AxiosResponse) =>
    response ? response.data : response;


export const fetchApi = {
    get: (url: string, params?: any, responseType?: ResponseType, body?: any) =>
        instance()
            .get(url, {
                params: { ...params, filterBy: params?.filterBy ? JSON.stringify(params.filterBy) : undefined },
                responseType,
                data: body
            })
            .then(responseBody),
    post: (url: string, body?: any, params?: any, headers?: any) =>
        instance().post(url, body, { params, headers }).then(responseBody),
    put: (url: string, body?: any) => instance().put(url, body).then(responseBody),
    patch: (url: string, body?: any) =>
        instance().patch(url, body).then(responseBody),
    delete: (url: string) => instance().delete(url).then(responseBody),
    downloadFile: (url: string, body: any, _instance: "base" | "web" | "i+c" | "clarita" | "drivers" = "base") => instance().post(url, body, { responseType: 'blob' }).then(responseBody),
};
