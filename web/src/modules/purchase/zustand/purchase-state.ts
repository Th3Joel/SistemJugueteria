import dayjs from "dayjs";
import { create } from "zustand";

export type TErrors = { [key: string]: string }
export type TDetailErrors = { [key: string]: string }[]

interface PurchaseState {
    code: string;
    supplierID: string;
    articleBoxID: string;
    date: string;
    quantityBox: number;
    costBox: number;
    cost: number;
    total: string;
    detail: PurchaseDetail[];
    errors: TErrors
    detailErrors: TDetailErrors
    validate: () => boolean;
    setQuantityBox: (quantityBox: number) => void;
    setCostBox: (costBox: number) => void;
    setCost: (cost: number) => void;
    pushDetail: (detail: PurchaseDetail) => void;
    calculations: () => void;
    deleteDetail: (id: string) => void;
    exists: (id: string) => boolean;
    changeInput: (value: string, field: string, id?: string,) => void;
    clear: () => void;
    json: () => string;
}
interface PurchaseDetail {
    id: string;
    code: string;
    description: string;
    price: string;
    subtotal: string;
    quantity: string;
}

export const PurchaseState = create<PurchaseState>((set, get) => {
    const dateNow = dayjs(Date.now()).format("YYYY-MM-DD")
    return {
        code: "",
        supplierID: "",
        articleBoxID: "",
        date: dateNow,
        quantityBox: 0,
        costBox: 0,
        cost: 0,
        total: "",
        detail: [],
        errors: {},
        detailErrors: [],

        setQuantityBox: (quantityBox) => set({ quantityBox }),

        setCostBox: (costBox) => set({ costBox }),
        setCost: (cost) => {
            set({ cost: cost })
            get().calculations()
        },

        pushDetail: (detail) => {
            //Saca el subtotal de cada elemento
            //set({ detail: detail.map((d) => ({ ...d, subtotal: d.price * d.quantity })) })
            const newDetail = get().detail
            newDetail.push(detail)
            set({ detail: newDetail })
            //Calcula el total
            get().calculations()
        },

        /**
         * Calcula el total y subtotal de cada elemento
         */
        calculations: () => {
            set({
                detail: get().detail.map(d => {
                    const calSubtotal = (get().cost * parseInt(d.quantity))
                    const subtotal = calSubtotal.toString() == "NaN"
                        || calSubtotal == 0
                        || calSubtotal < 0 ? ""
                        : calSubtotal.toFixed(2)
                    return { ...d, subtotal }
                })
            })
            set(() => {
                const calTotal = get().detail.reduce((a, b) => a + (parseFloat(b.subtotal) || 0), 0);
                const total = calTotal == 0 ? "" : calTotal.toFixed(2)
                return { total }
            })
        },
        //delete a detail
        deleteDetail: (id) => {
            set({ detail: get().detail.filter(d => d.id !== id) })
            get().calculations()
        },

        exists: (id) => get().detail.some(d => d.id === id),

        changeInput: (value, field, id) => {
            const { detail, calculations } = get()
            set({ ...get(), [field]: value })
            set({ detail: detail.map(d => d.id === id ? { ...d, [field]: value, } : d) })
            calculations()
            //validate()
        }
        ,
        validate: () => {
            let valState = true
            set({ errors: {}, detailErrors: [] })
            const { errors, detailErrors, detail, supplierID, articleBoxID, code, date } = get()
            const validationsErrors = errors
            const validationsDetailErrors = detailErrors
            const reqMsj = "Campo requerido"

            if(detail.length === 0){
                validationsErrors["empty"] = "No hay elementos"
                valState = false
            }

            if (supplierID == "") {
                validationsErrors["supplierID"] = reqMsj
                valState = false
            }
            if (articleBoxID == "") {
                validationsErrors["articleBoxID"] = reqMsj
                valState = false
            }
            if (code == "") {
                validationsErrors["code"] = reqMsj
                valState = false
            }
            if (date == "") {
                validationsErrors["date"] = reqMsj
                valState = false
            } else if (date > dateNow) {
                validationsErrors["date"] = "La fecha no puede ser mayor a hoy"
                valState = false
            }

            detail.map((d) => {

                if (d.quantity == "") {
                    validationsDetailErrors.push({ id: d.id, field: "quantity", msj: reqMsj })
                    valState = false
                } else if (!noLetters(d.quantity)) {
                    validationsDetailErrors.push({ id: d.id, field: "quantity", msj: "Solo números" })
                    valState = false
                }
                else if (parseInt(d.quantity) < 1) {
                    validationsDetailErrors.push({ id: d.id, field: "quantity", msj: "Debe ser mayor a 1" })
                    valState = false
                }
                else if (!isInt(d.quantity)) {
                    validationsDetailErrors.push({ id: d.id, field: "quantity", msj: "No decimales" })
                    valState = false
                }


                if (d.price == "") {
                    validationsDetailErrors.push({ id: d.id, field: "price", msj: reqMsj })
                    valState = false
                }
                else if (!noLetters(d.price)) {
                    validationsDetailErrors.push({ id: d.id, field: "price", msj: "Solo números" })
                    valState = false
                }
                else if (parseInt(d.price) < get().cost) {
                    validationsDetailErrors.push({ id: d.id, field: "price", msj: "Debe ser mayor a  C$ " + get().cost })
                    valState = false
                }
            })
            //console.log(validationsErrors,validationsDetailErrors)
            set({ errors: validationsErrors, detailErrors: validationsDetailErrors })
            return valState
        },
        clear() {
            set({
                detail: [],
                errors: {},
                detailErrors: [],
                articleBoxID: "",
                supplierID: "",
                code: "",
                date: dateNow,
                costBox: 0,
                cost: 0,
                total: ""
            })
        },
        json() {
            const {code, supplierID, articleBoxID, date,total, detail} = get()
            return JSON.stringify({
                code,
                supplierID,
                articleBoxID,
                date,
                total,
                detail
            })
        },
    }
});

const noLetters = (d: string) => {
    // La expresión regular verifica si la cadena tiene solo números y opcionalmente un punto decimal y signo menos
    return /^-?\d+(\.\d+)?$/.test(d);
}

const isInt = (d: string) => {
    return /^\d+$/.test(d);
}