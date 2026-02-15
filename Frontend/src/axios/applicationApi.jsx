import { api } from "./axiosConfig";

export async function createApplication(jobId){
    return await api.get(`/application/create/${jobId}` , {withCredentials:true})
}

export async function applicationCandidates(jobId){
    return await api.get(`/jobs/applicants/${jobId}` , {withCredentials:true})
}

export async function updateApplicationStatus(applicationId , data){
    return await api.post(`/application/update/status/${applicationId}` ,data, {withCredentials:true})
}