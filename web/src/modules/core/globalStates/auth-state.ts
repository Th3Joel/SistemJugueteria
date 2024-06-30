import { create } from "zustand";
import { useFetch } from "../hooks/useFetch";
interface IUser{
    name: string;
    email: string;
    picture: string;
    role: string;
}

interface IAuth {
  estado: boolean;
  loading: boolean;
  user:IUser;
  verify(): void;
}

export const AuthState = create<IAuth>((set) => ({
    user: {
      name: "",
      email: "",
      picture: "",
      role: "",
    },
  estado: false,
  loading: true,
  verify: async () => {
    
      const res = await useFetch<{status:boolean,find:IUser}>("/settings/users/user","GET");
      if (res.status) {
        set({estado: true });
        set({ user: res.find });
      } 
      if(!res.status) {
        set({estado:false})
      }
    
    set({ loading: false });

  }
}));
