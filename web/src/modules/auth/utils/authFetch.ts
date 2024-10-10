import { useFetch } from "@/modules/core/hooks/useFetch";
import alertBox from "@/modules/core/utils/alertBox";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export interface IErrors {
    Email?: string;
    Password?: string;
    loading?: boolean
}

interface IUseFetch {
    status: boolean;
    msj?: string;
    token?: string;
    errors?: IErrors;
}

export const loginFetch = async (form: FormData, setErrors: Dispatch<SetStateAction<IErrors>>) => {

    //Limpiar formdata
    const cleanedForm = new FormData();
    form.forEach((value, key) => {
        if (typeof value === 'string') {
            cleanedForm.append(key, value.trim())
        } else {
            cleanedForm.append(key, value)
        }
    });

    setErrors({ loading: true })
    const res = await useFetch<IUseFetch>("/auth/login", "POST", cleanedForm, true);
    console.log(res)
    if (res.status) {
        //useStorage().set(res.token ?? "")
        window.location.reload();
        return;
    }
    //useStorage().remove();
    setErrors({ ...res.errors });
    setErrors(ante => ({ ...ante, loading: false }))
    res.msj && toast.error(res.msj)
};


const l = async () => {
    const res = await useFetch<IUseFetch>("/auth/logout", "GET");
    if (res.status) {
        //useStorage().remove();
        window.location.reload();
        return;
    }
    //useStorage().remove();
    toast.error(res.msj)
}
export const logoutFetch = async (role: string) => {
    if (role == "admin") {
        alertBox(
            "warning",
            "¿Respaldo?",
            "Desea realizar un copia de seguridad de la base de datos?",
            "Aceptar",
            async () => {
                const res = await useFetch<IUseFetch>("/backup/gen", "GET");
                if (res.status) {
                    l()
                    return
                }
                toast.error(res.msj)
            },
            () => {
                l()
            }
        )
    }else{
        l()
    }


}