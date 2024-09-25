import { IPurchaseDetail } from "@/pages/purchase/ViewPurchase";
import { create } from "zustand";
import { isInt, noLetters, TDetailErrors, TErrors } from "./purchase-state";

interface IArticleBox {
    purchasePrice: number;
    toysQuantity: number;
}
interface IPurchaseEditState {
    pass: boolean;
    costArticle: number;
    orgTotal: number;
    total: number;

    articleBox: IArticleBox
    totalToysDetail: number;
    orgTotalToysDetail: number;
    detail: IPurchaseDetail[];

    errorsDetail: TDetailErrors;
    errors: TErrors;

    setCostArticle: (costArticle: number) => void;
    setOrgTotal: (orgTotal: number) => void;
    setArticleBox: (articleBox: IArticleBox) => void;
    setOrgTotalToysDetail: (orgTotalToysDetail: number) => void;
    setDetail: (detail: IPurchaseDetail) => void;

    sumTotalToysDetail: () => void;
    checkErrors: () => boolean;
    exists: (id: string) => boolean;
    changeInput: (value: string, field: string, id?: string) => void;
    deleteDetail: (id: string) => void;
    calculations: () => void;
    parseJson: () => string;
    clear: () => void;
}

export const PurchaseEditState = create<IPurchaseEditState>((set, get) => ({
    pass: true,
    costArticle: 0,
    orgTotal: 0,
    total: 0,
    articleBox: {
        purchasePrice: 0,
        toysQuantity: 0
    },
    totalToysDetail: 0,
    orgTotalToysDetail: 0,
    detail: [],
    errorsDetail: [],
    errors: {},

    setOrgTotalToysDetail: (orgTotalToysDetail) => set({ orgTotalToysDetail }),
    setCostArticle: (costArticle) => set({ costArticle }),
    setOrgTotal: (orgTotal) => set({ orgTotal, total: orgTotal }),
    setArticleBox: (articleBox) => set({ articleBox }),
    setDetail: (detail) => {
        const { detail: oldDetail, checkErrors, sumTotalToysDetail } = get();
        oldDetail.unshift(detail);
        set({ detail: oldDetail });
        checkErrors();
        sumTotalToysDetail();
        get().calculations();
    },

    calculations: () => {

        set({
            detail: get().detail.map((d) => ({
                ...d,
                subtotal: (get().costArticle * d.quantity) || 0
            }))
        })
        const { detail, orgTotal, sumTotalToysDetail } = get();
        const total = detail.reduce((a, b) => a + b.subtotal, 0) + parseFloat(orgTotal + "");
        sumTotalToysDetail()
        set({
            total,
        })
    },
    sumTotalToysDetail: () => {
        const { detail, orgTotalToysDetail } = get();
        const totalToysDetail = detail.reduce((a, b) => a + (parseInt(b.quantity + "") || 0), 0)
        set({
            totalToysDetail: totalToysDetail + orgTotalToysDetail,
        })
    },
    changeInput: (value, field, id) => {
        const { detail } = get();
        set({
            detail: detail.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
        });
        set({ ...get(), [field]: value });
        get().calculations();
        get().checkErrors();
    },

    deleteDetail: (id) => {
        set({ detail: get().detail.filter((d) => d.id !== id) })
    },

    checkErrors: () => {
        let pass = true;
        const { detail, articleBox, totalToysDetail, costArticle } = get();
        const errors: TErrors = {};
        const errorsDetail: TDetailErrors = [];

        if (totalToysDetail > articleBox.toysQuantity) {
            errors["totalToysDetail"] = "Exede la cantidad de artículos de la caja";
            pass = false;
        }

        if (detail.length === 0) {
            errors["isEmpty"] = "--- No hay elementos nuevos ---";
            pass = false;
        }

        //Check errors detail purchase
        detail.map((d) => {
            if (d.quantity + "" == "") {
                errorsDetail.push({
                    id: d.id,
                    field: "quantity",
                    msj: "Campo requerido",
                });
                pass = false;
            } else if (d.quantity < 1) {
                errorsDetail.push({
                    id: d.id,
                    field: "quantity",
                    msj: "Debe ser mayor a 0",
                });
                pass = false;
            } else if (!isInt(d.quantity + "")) {
                errorsDetail.push({
                    id: d.id,
                    field: "quantity",
                    msj: "Solo enteros",
                });
                pass = false;
            }

            if (d.price + "" == "") {
                errorsDetail.push({
                    id: d.id,
                    field: "price",
                    msj: "Campo requerido",
                });
                pass = false;
            } else if (!noLetters(d.price + "")) {
                errorsDetail.push({
                    id: d.id,
                    field: "price",
                    msj: "Solo números",
                });
                pass = false;
            }

            if (d.price <= costArticle) {
                errorsDetail.push({
                    id: d.id,
                    field: "price",
                    msj: "Debe ser mayor a precio compra",
                });
                pass = false;
            }
        });
        set({ errorsDetail: errorsDetail, errors, pass });
        return pass;
    },

    exists: (id) => get().detail.some((d) => d.id === id),

    parseJson: () => {
        const { total, totalToysDetail, detail } = get();
        return JSON.stringify({
            total: total.toString(),
            totalToysDetail: totalToysDetail.toString(),
            detail: detail.map((d) => ({
                ...d,
                price: d.price.toString(),
                quantity: d.quantity.toString(),
                subtotal: d.subtotal.toString(),
            }))
        })
    },
    clear: () => {
        set({
            costArticle: 0,
            orgTotal: 0,
            total: 0,
            articleBox: {
                purchasePrice: 0,
                toysQuantity: 0
            },
            totalToysDetail: 0,
            orgTotalToysDetail: 0,
            detail: [],
        })
    }
}));