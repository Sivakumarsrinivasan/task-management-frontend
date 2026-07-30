import axios from "axios";
import { useUserDetail } from "../Hooks/userDetail";

const formDataApi = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    
});
formDataApi.interceptors.request.use((config)=>{
    const token = useUserDetail.getState().detail.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
export default formDataApi

