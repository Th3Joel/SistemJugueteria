import { useFetch } from "@/modules/core/hooks/useFetch"
import { IResponseFetch } from "@/types"
import { toast } from "sonner"
import { create } from "zustand"

interface IDataState {
    InitialBalance: number
    balance: number
    Limit: number

    fetchData: () => void
}

export const pettyCashState = create<IDataState>((set) => ({
    InitialBalance: 0,
    balance: 0,
    Limit: 0,
    fetchData: async () => {
        const res = await useFetch<IResponseFetch<Omit<IDataState, "fetchData">>>("/pettyCash", "GET")
        if (!res.status) {
            toast.error(res.msj)
            return
        }
        set(res.find)
    },
}))