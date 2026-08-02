import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeSetting{
  theme:string;
  setTheme:(action:string) => void;
}

export const useTheme = create<ThemeSetting>()(persist((set)=>({
    theme:'light',
    setTheme:(action:string)=>set({
      theme:action 
    })

}),{name:'theme'}))