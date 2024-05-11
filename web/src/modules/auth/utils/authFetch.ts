import { useFetch } from "@/modules/core/hooks/useFetch";
import { useStorage } from "@/modules/core/hooks/useStorage";
import { Dispatch, SetStateAction } from "react";
import Alert from "../../core/utils/alert";

export interface IErrors{
  email?: string;
  password?: string;
  loading?:boolean
}

interface IUseFetch {
  status: boolean;
  msj?: string;
  token?:string;
  errors?:IErrors;
}

export const loginFetch = async (form: FormData,setErrors:Dispatch<SetStateAction<IErrors>>) => {
  setErrors({loading:true})
  const res = await useFetch<IUseFetch>("/auth/login", "POST", form,true);
  console.log(res)
  if (res.status) {
    useStorage().set(res.token ?? "")
    window.location.reload();
    return;
  }
  useStorage().remove();
  setErrors({...res.errors});
  setErrors(ante => ({...ante,loading:false}))
  res.msj && Alert("error",res.msj)
};

export const logoutFetch = async()=>{
  const res = await useFetch<IUseFetch>("/auth/logout", "GET");
  if (res.status) {
    useStorage().remove();
    window.location.reload();
    return;
  }
  //useStorage().remove();
  console.log(res.msj)
}