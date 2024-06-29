import { useState } from "react";
import { useFetch } from "./useFetch";
import { toast } from "sonner";

type IErrors<T> = T;
type IData<T> = T;

interface IUseForm<T> {
  status: boolean;
  msj: string;
  errors?: IErrors<T>;
  find:IData<T>
}

export const useForm = <T>(object:IData<T>) => {
  const [errors, setErrors] = useState<IErrors<T>>();
  const [data, setData] = useState<IData<T>>(object);
  const [loading, setLoading] = useState<boolean>(false);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({...data, [name]: value });
  };

  const post = async (url: string, f: React.FormEvent<HTMLFormElement>,isEdit?:boolean): Promise<boolean> => {
    const form = new FormData(f.target as HTMLFormElement);
    setLoading(true);
    const res = await useFetch<IUseForm<T>>(url,isEdit ? "PUT" : "POST", form, true);
    setLoading(false);
    if (res.status) {
      toast.success(res.msj);
      return true;
    }
    setErrors(res.errors);
    return false;
  };

  const get = async (url:string) => {
    setLoading(true);
    const res = await useFetch<IUseForm<T>>(url,"GET");
    setLoading(false);
    if (res.status) {
      setData(res.find);
      return;
    }
    toast.error(res.msj);
  };

  return {
    post,
    get,
    loading,
    errors,
    data,
    inputChange
  };
};
