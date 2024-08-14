import React, { useState } from "react";
import { useFetch } from "./useFetch";
import { toast } from "sonner";
import { CheckAuth } from "../utils/response";
import { IData, IErrors, IResponseFetch, ResTypeMessages } from "@/types.d";

const removeWhitespaceFromFormData = (formData: FormData) => {
  const newFormData = new FormData();
  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      const trimmedValue = value.trim();
      newFormData.append(key, trimmedValue);
    } else {
      newFormData.append(key, value);
    }
  });
  return newFormData;
}

export const useForm = <T>(object: IData<T>) => {
  const [errors, setErrors] = useState<IErrors<T>>();
  const [data, setData] = useState<IData<T>>(object);
  const [loading, setLoading] = useState<boolean>(false);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  
  const post = async (url: string, f: React.FormEvent<HTMLFormElement>, isEdit?: boolean): Promise<boolean> => {
    const form = removeWhitespaceFromFormData(new FormData(f.target as HTMLFormElement));
    setLoading(true);
    const res = await useFetch<IResponseFetch<T>>(url, isEdit ? "PUT" : "POST", form, true);
    setLoading(false);
    if (res.status) {
      toast.success(res.msj);
      setErrors(undefined);
      return true;
    }
    if (res.type == ResTypeMessages.VALIDATION) setErrors(res.errors);
    CheckAuth<T>(res);
    if (res.type != ResTypeMessages.VALIDATION) toast.error(res.msj);
    return false;
  };

  const get = async (url: string) => {
    setLoading(true);
    let res = await useFetch<IResponseFetch<T>>(url, "GET");
    setLoading(false);
    if (res.status) {
      setData(res.find);
      return;
    }
    toast.error(res.msj);
    CheckAuth<T>(res);
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
