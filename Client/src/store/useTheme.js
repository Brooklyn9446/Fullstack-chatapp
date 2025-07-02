import { create } from "zustand";

export const useThemeStore=create((set)=>({
    chatTheme:"light",
    setTheme:()=>{
        const theme=localStorage.getItem("Theme")
        if(theme){
            set({chatTheme:theme})
        }
    },

}))