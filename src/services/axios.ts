import axios, { type AxiosInstance } from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
    },
});