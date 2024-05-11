import { useState } from "react"
import { useFetch } from "./useFetch";
import Alert from "../utils/alert";

interface ITableResponse<T>{
  status: boolean;
  msj:string
  all: IAll<T>
}
interface IAll<T> {
    data:T[]
    count:number
    pages:number
    page:number
    pageSize:number
}


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
    const res = await useFetch<ITableResponse<T>>(url,"GET");
    setAll(res.all);
    setLoading(false)
  }

  const remove=async(url:string)=>{
    setLoading(true)
    const res = await useFetch<ITableResponse<T>>(url,"DELETE")
    if(res.status){
      Alert("success",res.msj)
    }
  }

  return{
    remove,
    all,
    loading,
    get,
  }
}
