import { create } from "zustand";



export const userProfileDetail = create((set)=>({
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