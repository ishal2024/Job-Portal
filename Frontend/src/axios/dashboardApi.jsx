import { api } from "./axiosConfig";

export async function recruiterDashboard(){
    return await api.get('/dashboard/recruiter' , {withCredentials : true })
}

export async function applicantDashboard(){
    return await api.get('/dashboard/applicant' , {withCredentials : true })
}