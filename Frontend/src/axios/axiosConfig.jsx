import axios from 'axios'

export const api = axios.create({
    baseURL: "https://job-portal-production-c3b7.up.railway.app/api",
    withCredentials: true
});


