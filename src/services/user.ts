import axios from "axios";
import api from "./api"
import apiInterceptor from "./apiInterceptor";
import formDataApi from "./multiPartFormData";

const auth = import.meta.env.VITE_AUTH_URL
export const loginService = async(data) =>{
const val = await api.post(`${auth}/login`,data);
return val.data
}
export const createAccountService = async(data) =>{
await api.post(`${auth}/register`,data)
}
export const getProfileService = async() =>{
const user = await apiInterceptor.get(`${auth}/me`);
return user.data
}

export const updateProfileService = async (formData) => {
    await formDataApi.put(`${auth}/update-profile`, formData);

}
export async function googleLoginService(data) {
    const response = await api.post(`${auth}/google-login`, data);
    return response.data;
}