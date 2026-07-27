import api from "./api"
import apiInterceptor from "./apiInterceptor";

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