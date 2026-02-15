import axios from 'axios'

export const api = axios.create({
    baseURL: "https://job-portal-11cs.onrender.com/api",
    withCredentials: true
});


