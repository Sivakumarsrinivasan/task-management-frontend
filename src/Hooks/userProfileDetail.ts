import { create } from "zustand";

interface userProfileStore{
    userDetail:{name:string,email:string,image:string,phone:string},
    setUserDetail:(payload:any)=>void
}

export const userProfileDetail = create<userProfileStore>((set)=>({
    userDetail:{
        name:'',
        email:'',
        image:'',
        phone:''
    },
    setUserDetail:(payload:any) => set((state)=>({
        userDetail:{
         ...state.userDetail,
         name:payload?.name ?? '',
         email:payload?.email ?? '',
         image:payload?.profile_image ?? '',
         phone:payload?.phone ?? ''
        }
    }))
}))