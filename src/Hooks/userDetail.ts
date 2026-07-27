import { create } from "zustand";
import { persist } from "zustand/middleware";


export  const useUserDetail = create(persist((set)=>({
    detail:{id:'',token:''},
    setDetail:(action)=>set((state)=>({
        detail:{
            ...state.detail,
            id:action.id,
            token:action.token
        }
    }))
}),{name:'userDetail'}))