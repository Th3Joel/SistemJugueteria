import { useFetch } from "@/modules/core/hooks/useFetch"
import { create } from "zustand"

interface cahsRegisterState {
    state: boolean
    verify: () => Promise<void>
}

const CashRegisterState = create<cahsRegisterState>((set) => ({
    state: false,
    verify: async () => {
        const res = await useFetch<{ status: boolean, msj: string }>("/cash-register/verify", "GET");
        if (res.status) {
            set({ state: true })
        } else {
            set({ state: false })
        }
    },
}))

export default CashRegisterState