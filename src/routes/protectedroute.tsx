import { useEffect, useState } from "react"
import PageLoader from "../components/pageLoader";
import { Navigate, Outlet } from "react-router-dom";
import { getProfileService } from "../services/user";
export const Protectedroute = () =>{
    const[isAuthenticate, setIsAuthenticate] = useState(false);
    const[isLoader, setIsLoader] = useState(true)
useEffect(()=>{
checkAuthenticate();
},[])

    const checkAuthenticate = async () => {

        try {
            const val = await getProfileService();
            if (val.success) {
                setIsAuthenticate(true);
            } else {
                setIsAuthenticate(false);

            }
        } catch (e) {
            throw e
        } finally {
            setIsLoader(false)
        }
    }

if(isLoader) return <PageLoader/>

return isAuthenticate ? <Outlet/> :<Navigate to='/'/>
}