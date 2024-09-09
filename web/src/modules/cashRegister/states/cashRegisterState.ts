import { useFetch } from "@/modules/core/hooks/useFetch"
import { create } from "zustand"

interface cahsRegisterState {
    state: boolean
    loading: boolean
    verify: () => void
}

const CashRegisterState = create<cahsRegisterState>((set) => ({
    loading: true,
    state: false,
    verify: async () => {
        set({ loading: true })
        const res = await useFetch<{ status: boolean, msj: string }>("/cash-register/verify", "GET");
        if (res.status) {
            set({ state: true })
        } else {
            set({ state: false })
        }
        set({ loading: false })
    },
}))

export default CashRegisterState