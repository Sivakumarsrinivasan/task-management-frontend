import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useUserStore{
    detail:{id:string,token:string,name:string},
    setDetail:(action:any) =>void,
    logOut:()=>void
}

export  const useUserDetail = create<useUserStore>()(persist((set)=>({
    detail:{id:'',token:'',name:''},
    setDetail:(action)=>set((state)=>({
        detail:{
            ...state.detail,
            id:action.id,
            token:action.token,
            name:action.name
        }
    })),

    logOut:()=>set({
        detail:{
            id:'',
            token:'',
            name:''
        }
    })
}),{name:'userDetail'}))