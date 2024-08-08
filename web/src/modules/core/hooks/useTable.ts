import { useState } from "react"
import { useFetch } from "./useFetch";
import { toast } from "sonner";
import { IAll, IResponseFetch } from "@/types";
import { CheckAuth } from "../utils/response";




export interface IUseTable<T>{
  all:IAll<T> | undefined
  remove(url:string):Promise<void>
  loading:boolean
  get(url:string):Promise<void>
}

export const useTable = <T>() => {
  const [all,setAll] = useState<IAll<T>>();
  const [loading,setLoading] = useState(true);
  
  const get=async(url:string)=>{
    setLoading(true)
    const res = await useFetch<IResponseFetch<T>>(url,"GET");
    setAll(res.all);
    CheckAuth<T>(res);
    setLoading(false)
  }

  const remove=async(url:string)=>{
    setLoading(true)
    const res = await useFetch<IResponseFetch<T>>(url,"DELETE")
    if(res.status){
      toast.success(res.msj)
    }
    CheckAuth<T>(res);
  }

  return{
    remove,
    all,
    loading,
    get,
  }
}
