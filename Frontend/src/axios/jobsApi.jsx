import { api } from "./axiosConfig";

export async function createJobPost(data){
    return await api.post('/jobs/create' , data , {withCredentials : true})
}

export async function deleteJobPost(postId){
    return await api.get(`/jobs/delete/${postId}` , {withCredentials : true})
}

export async function updateJobPost(data , jobId){
    return await api.post(`/jobs/update/${jobId}` , data , {withCredentials : true})
}

export async function fetchHomeJobs(pageNumber = 1 , limit = 15){
    return await api.get(`/jobs/home?page=${pageNumber}&limit=${limit}` ,  {withCredentials : true})
}

export async function searchJobs(query,pageNumber = 1 , limit = 15){
    return await api.get(`/jobs/search?search=${query}&page=${pageNumber}&limit=${limit}` ,  {withCredentials : true})
}

export async function fetchSpecificJob(jobId){
    return await api.get(`/jobs/job/${jobId}` ,  {withCredentials : true})
}


