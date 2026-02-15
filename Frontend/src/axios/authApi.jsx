import { api } from "./axiosConfig";


export async function registerUser(data){
    return await api.post('/user/register' , data , {withCredentials : true})
}

export async function signInUser(data){
    return await api.post('/user/login' , data , {withCredentials : true})
}

export async function logOutUser(){
    return await api.get('/user/logout' , {withCredentials : true})
}

export async function loadUser(){
    return await api.get('/user/me' , {withCredentials : true})
}