import { create } from "zustand";
import { useFetch } from "../hooks/useFetch";
import { useStorage } from "../hooks/useStorage";
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
  verify(): Promise<void>;
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
    if (useStorage().get()) {
      const res = await useFetch<{status:boolean,user:IUser}>("/users/profile","GET");
      if (res.status) {
        set({estado: true });
        set({ user: res.user });
      } 
      if(!res.status) {
        set({estado:false})
      }
    }else{
      set({ estado: false });
    }
    set({ loading: false });

  }
}));
