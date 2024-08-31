import { formatNumber } from "@/modules/core/utils/formatNumber";
import dayjs from "dayjs";
import { create } from "zustand";

export type TErrors = { [key: string]: string };
export type TDetailErrors = { [key: string]: string }[];

interface PurchaseState {
  code: string;
  supplierID: string;
  articleBoxID: string;
  date: string;
  quantityBox: string;
  costBox: string;
  costArticle: number;
  total: string;
  detail: PurchaseDetail[];
  errors: TErrors;
  quantityArticleDetail: number;
  detailErrors: TDetailErrors;
  setCode: (code: string) => void;
  validate: () => boolean;
  setCostArticle: (costArticle: number) => void;
  pushDetail: (detail: PurchaseDetail) => void;
  calculations: () => void;
  deleteDetail: (id: string) => void;
  exists: (id: string) => boolean;
  changeInput: (value: string, field: string, id?: string) => void;
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
  const dateNow = dayjs(Date.now()).format("YYYY-MM-DD");
  return {
    code: "",
    supplierID: "",
    articleBoxID: "",
    date: dateNow,
    quantityBox: "",
    costBox: "",
    costArticle: 0,
    total: "",
    detail: [],
    quantityArticleDetail: 0,
    errors: {},
    detailErrors: [],
    setCode: (code) => set({ code }),
    setCostArticle: (costArticle) => set({ costArticle }),
    pushDetail: (detail) => {
      //Saca el subtotal de cada elemento
      //set({ detail: detail.map((d) => ({ ...d, subtotal: d.price * d.quantity })) })
      const newDetail = get().detail;
      newDetail.push(detail);
      set({ detail: newDetail });
      //Calcula el total
      get().calculations();
    },

    /**
     * Calcula el total y subtotal de cada elemento
     */
    calculations: () => {
      //Calcula el coste de cada articulo en la caja
      const costArticle = parseFloat(get().costBox) / parseInt(get().quantityBox);
      set({costArticle});

      //Saca el subtotal de cada elemento
      const detail = get().detail.map((d) => {
        const calSubtotal = get().costArticle * parseInt(d.quantity);
        const subtotal =
          calSubtotal.toString() == "NaN" ||
            calSubtotal == 0 ||
            calSubtotal < 0
            ? ""
            : calSubtotal.toFixed(2);
        return { ...d, subtotal };
      })
      set({detail});

      //Calcula el total
      const calTotal = get().detail.reduce(
        (a, b) => a + (parseFloat(b.subtotal) || 0),
        0,
      );
      const total = calTotal == 0 ? "" : calTotal.toFixed(2);
      set({total});

      //calcula el total de articulos que hay en el detalle de compra
      const quantityArticleDetail = get().detail.reduce(
        (a, b) => a + parseInt(b.quantity),
        0,
      );
      set({quantityArticleDetail});
    },
    //delete a detail
    deleteDetail: (id) => {
      set({ detail: get().detail.filter((d) => d.id !== id) });
      get().calculations();
    },

    exists: (id) => get().detail.some((d) => d.id === id),

    changeInput: (value, field, id) => {
      const { detail, calculations } = get();
      set({
        detail: detail.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
      });
      set({ ...get(), [field]: value });
      calculations();
      //validate()
    },
    validate: () => {
      let valState = true;
      set({ errors: {}, detailErrors: [] });
      const {
        errors,
        detailErrors,
        detail,
        supplierID,
        articleBoxID,
        code,
        date,
        costBox,
        quantityBox,
        quantityArticleDetail
      } = get();
      const validationsErrors = errors;
      const validationsDetailErrors = detailErrors;
      const reqMsj = "Campo requerido";

      if (quantityArticleDetail > parseInt(quantityBox)) {
        validationsErrors["quantityArticleDetail"] = "Exede el total de articulos de la caja";
        valState = false;
      }
    

      if (detail.length === 0) {
        validationsErrors["empty"] = "No hay elementos";
        valState = false;
      }

      if (supplierID == "") {
        validationsErrors["supplierID"] = reqMsj;
        valState = false;
      }
      if (articleBoxID == "") {
        validationsErrors["articleBoxID"] = reqMsj;
        valState = false;
      }
      if (code == "") {
        validationsErrors["code"] = reqMsj;
        valState = false;
      }
      if (date == "") {
        validationsErrors["date"] = reqMsj;
        valState = false;
      } else if (date > dateNow) {
        validationsErrors["date"] = "La fecha no puede ser mayor a hoy";
        valState = false;
      }

      if (quantityBox == "") {
        validationsErrors["quantityBox"] = reqMsj;
        valState = false;
      } else if (!noLetters(quantityBox)) {
        validationsErrors["quantityBox"] = "Solo números";
        valState = false;
      } else if (parseInt(quantityBox) < 1) {
        validationsErrors["quantityBox"] = "Debe ser mayor a 1";
        valState = false;
      } else if (!isInt(quantityBox)) {
        validationsErrors["quantityBox"] = "No decimales";
        valState = false;
      }

      if (costBox == "") {
        validationsErrors["costBox"] = reqMsj;
        valState = false;
      } else if (!noLetters(costBox)) {
        validationsErrors["costBox"] = "Solo números";
        valState = false;
      }


      detail.map((d) => {
        if (d.quantity == "") {
          validationsDetailErrors.push({
            id: d.id,
            field: "quantity",
            msj: reqMsj,
          });
          valState = false;
        } else if (!noLetters(d.quantity)) {
          validationsDetailErrors.push({
            id: d.id,
            field: "quantity",
            msj: "Solo números",
          });
          valState = false;
        } else if (parseInt(d.quantity) < 1) {
          validationsDetailErrors.push({
            id: d.id,
            field: "quantity",
            msj: "Debe ser mayor a 1",
          });
          valState = false;
        } else if (!isInt(d.quantity)) {
          validationsDetailErrors.push({
            id: d.id,
            field: "quantity",
            msj: "No decimales",
          });
          valState = false;
        }

        if (d.price == "") {
          validationsDetailErrors.push({
            id: d.id,
            field: "price",
            msj: reqMsj,
          });
          valState = false;
        } else if (!noLetters(d.price)) {
          validationsDetailErrors.push({
            id: d.id,
            field: "price",
            msj: "Solo números",
          });
          valState = false;
        } else if (parseInt(d.price) < get().costArticle) {
          validationsDetailErrors.push({
            id: d.id,
            field: "price",
            msj: "Debe ser mayor a  C$ " + formatNumber(""+get().costArticle),
          });
          valState = false;
        }
      });
      //console.log(validationsErrors,validationsDetailErrors)
      set({ errors: validationsErrors, detailErrors: validationsDetailErrors });
      return valState;
    },
    clear() {
      set({
        detail: [],
        errors: {},
        detailErrors: [],
        articleBoxID: "",
        supplierID: "",
        code: "",
        quantityBox: "",
        date: dateNow,
        costBox: "",
        costArticle: 0,
        total: "",
      });
    },
    json() {
      const {
        code,
        supplierID,
        articleBoxID,
        date,
        total,
        detail,
        quantityBox,
        costBox,
      } = get();
      return JSON.stringify({
        code,
        supplierID,
        articleBoxID,
        quantityBox,
        costBox,
        date,
        total,
        detail,
      });
    },
  };
});

const noLetters = (d: string) => {
  // La expresión regular verifica si la cadena tiene solo números y opcionalmente un punto decimal y signo menos
  return /^-?\d+(\.\d+)?$/.test(d);
};

const isInt = (d: string) => {
  return /^\d+$/.test(d);
};
