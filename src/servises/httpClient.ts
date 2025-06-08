/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    AxiosError,
} from 'axios';

const baseURL = "https://www.thecocktaildb.com/api/json/v1"

const axiosConfig: AxiosRequestConfig = {
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
};


const instance: AxiosInstance = axios.create(axiosConfig);


const handleError = (error: AxiosError): Promise<never> => {
    if (error.response) {
        console.error('Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
        console.error('Request Error:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    return Promise.reject(error);
};


instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => handleError(error)
);


const httpClient = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.get<T>(url, config).catch(handleError);
    },

    post: <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return instance.post<T>(url, data, config).catch(handleError);
    },

    put: <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return instance.put<T>(url, data, config).catch(handleError);
    },

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.delete<T>(url, config).catch(handleError);
    },
};

export default httpClient;