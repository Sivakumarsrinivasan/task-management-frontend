import axios from "axios";
import { useUserDetail } from "../Hooks/userDetail";


const apiInterceptor = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

apiInterceptor.interceptors.request.use((config)=>{
    const token = useUserDetail.getState().detail.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
export default apiInterceptor;