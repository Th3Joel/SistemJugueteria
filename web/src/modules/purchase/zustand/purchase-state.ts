import { create } from "zustand";

interface PurchaseState {
    cost: number;
    total: string;
    detail: PurchaseDetail[];
    setCost: (cost: number) => void;
    pushDetail: (detail: PurchaseDetail) => void;
    calTotal: () => void;
    deleteDetail: (id: string) => void;
    exists: (id: string) => boolean;
    changeInput: (id: string, value: string, field: string) => void;
}
interface PurchaseDetail {
    id: string;
    code: string;
    description: string;
    price: string;
    subtotal: string;
    quantity: string;
}

export const PurchaseState = create<PurchaseState>((set, get) => ({
    cost: 0,
    total: "",
    detail: [],
    setCost: (cost) => set({ cost: cost }),
    pushDetail: (detail) => {
        //Saca el subtotal de cada elemento
        //set({ detail: detail.map((d) => ({ ...d, subtotal: d.price * d.quantity })) })
        const newDetail = get().detail
        newDetail.push(detail)
        set({ detail: newDetail })
        //Calcula el total
        get().calTotal()
    },
    //Calcula el total con el estado anterior de los detalles
    calTotal: () => {
        set({
            detail: get().detail.map(d => {
                const calSubtotal = (parseFloat(d.price) * parseFloat(d.quantity))
                const subtotal = calSubtotal.toString() == "NaN" ? "" : calSubtotal.toString()
                return { ...d, subtotal }
            })
        })
        set(() => {
            const calTotal = get().detail.reduce((a, b) => a + (parseFloat(b.subtotal) || 0), 0);
            const total = calTotal == 0 ? "" : calTotal.toString()
            return { total }
        })
    },
    deleteDetail: (id) => {
        set({ detail: get().detail.filter(d => d.id !== id) })
        get().calTotal()
    },
    exists: (id) => get().detail.some(d => d.id === id),
    changeInput: (id, value, field) => {
        set({ detail: get().detail.map(d => d.id === id ? { ...d, [field]: value, } : d) })
        get().calTotal()
    },

}));