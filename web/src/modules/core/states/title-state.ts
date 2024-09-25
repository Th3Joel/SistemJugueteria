import { create } from "zustand";

interface TitleState {
  title: string;
  setTitle: (titulo: string) => void;
}


export const TitleState = create<TitleState>((set) => ({
  title: "",
  setTitle: (titulo) => {
    window.document.title = titulo;
    set({ title: titulo })
  },
}));    
