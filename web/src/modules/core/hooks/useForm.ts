import React, { useState } from "react";
import { useFetch } from "./useFetch";
import { toast } from "sonner";
import { CheckAuth } from "../utils/response";
import { IData, IErrors, IResponseFetch, ResTypeMessages } from "@/types.d";

function removeWhitespaceFromFormData(formData:FormData) {
  const newFormData = new FormData();

  for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
          // Eliminar espacios en blanco al inicio y al final del valor
          const trimmedValue = value.trim();
          // Añadir al nuevo FormData si el valor no está vacío después de quitar espacios
          if (trimmedValue !== '') {
              newFormData.append(key, trimmedValue);
          }
      } else {
          // Para otros tipos de valores, agregar directamente al nuevo FormData
          newFormData.append(key, value);
      }
  }

  return newFormData;
}

export const useForm = <T>(object: IData<T>) => {
  const [errors, setErrors] = useState<IErrors<T>>();
  const [data, setData] = useState<IData<T>>(object);
  const [loading, setLoading] = useState<boolean>(false);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value});
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
    if(res.type == ResTypeMessages.VALIDATION) setErrors(res.errors);
    CheckAuth<T>(res);
    if(res.type != ResTypeMessages.VALIDATION) toast.error(res.msj);
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
