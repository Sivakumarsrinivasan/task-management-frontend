import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useTheme = create(persist((set)=>({
    theme:'light',
    setTheme:(action)=>set({
      theme:action 
    })

}),{name:'theme'}))