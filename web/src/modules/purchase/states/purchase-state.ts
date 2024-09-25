import { formatNumber } from "@/modules/core/utils/formatNumber";
import dayjs from "dayjs";
import { create } from "zustand";

export type TErrors = { [key: string]: string };
export type TDetailErrors = { [key: string]: string }[];

interface PurchaseState {
  isSale: boolean;
  code: string;

  discountTotal: string;
  neto: string;
  costumerID: string;
  //Data of purchase
  supplierID: string;
  articleBoxID: string;
  quantityBox: string;
  costBox: string;
  valResto: string;
  //---------------

  //Data of payment record
  costDollar: string;
  cashDollar: string;
  cashCordoba: string;
  exchange: string;
  //---------------
  date: string;
  costArticle: number;
  total: string;
  detail: PurchaseDetail[];
  errors: TErrors;
  quantityArticleDetail: number;
  detailErrors: TDetailErrors;
  setCostDollar: (costDollar: string) => void;
  setIsSale: (isSale: boolean) => void;
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
  discount: string;
  quantity: string;
  stock: string;
}

export const PurchaseState = create<PurchaseState>((set, get) => {
  const dateNow = dayjs(Date.now()).format("YYYY-MM-DD");
  return {
    isSale: false,
    //Registro de pago
    costDollar: "",
    cashDollar: "",
    cashCordoba: "",
    valResto: "",
    exchange: "",
    //----------------
    code: "",
    costumerID: "",
    supplierID: "",
    articleBoxID: "",
    discountTotal: "",
    neto: "",
    date: dateNow,
    quantityBox: "",
    costBox: "",
    costArticle: 0,
    total: "",
    detail: [],
    quantityArticleDetail: 0,
    errors: {},
    detailErrors: [],
    setCostDollar: (costDollar) => set({ costDollar }),
    setIsSale: (isSale) => set({ isSale }),
    setCode: (code) => set({ code }),
    setCostArticle: (costArticle) => set({ costArticle }),
    pushDetail: (detail) => {
      //Saca el subtotal de cada elemento
      //set({ detail: detail.map((d) => ({ ...d, subtotal: d.price * d.quantity })) })
      const newDetail = get().detail;
      newDetail.unshift(detail);
      set({ detail: newDetail });
      //Calcula el total
      get().calculations();
    },

    /**
     * Calcula el total y subtotal de cada elemento
     */
    calculations: () => {
      function valNumberToString(d: number, showParam?: string) {
        const dStr = d.toString()

        return dStr == "NaN" || dStr == "" || dStr == "0" ? showParam ? showParam : "" : dStr
      }


      const { isSale, cashCordoba, cashDollar, costDollar } = get();
      if (!isSale) {
        //Calcula el coste de cada articulo en la caja
        const costArticle = parseFloat(get().costBox) / parseInt(get().quantityBox);
        set({ costArticle });

        //calcula el total de articulos que hay en el detalle de compra
        const quantityArticleDetail = get().detail.reduce(
          (a, b) => a + parseInt(b.quantity),
          0,
        );
        set({ quantityArticleDetail });
      }
      //Saca el subtotal de cada elemento
      const detail = get().detail.map((d) => {

        const calSubtotal = isSale ?
          parseFloat(d.price) * parseInt(d.quantity)
          : get().costArticle * parseInt(d.quantity);

        const subtotal = valNumberToString(calSubtotal);

        return { ...d, subtotal };
      })
      set({ detail });

      //Calcula el total
      const calNeto = get().detail.reduce(
        (a, b) => a + (parseFloat(b.subtotal) || 0),
        0,
      );

      const neto = valNumberToString(calNeto)//calNeto == 0 ? "" : "" + calNeto;
      const discountTotal = detail.reduce((a, b) => a + (parseFloat(b.discount) || 0), 0)

      const total = parseFloat(neto) - discountTotal
      //Si el total es NaN, significa que no hay descuento
      //const totalDisplay = "" + total == "NaN" ? neto : "" + total

      if (isSale) {
        const cashCordobaParse = parseFloat(cashCordoba) || 0;
        const cashDollarParse = parseFloat(cashDollar) || 0;
        const costDollarParse = parseFloat(costDollar) || 0;
        let cash = cashCordobaParse + (cashDollarParse * costDollarParse)
        const valResto = cash > total ? 0 : total - cash
        cash = cash < total ? 0 : (cash - total)
        set({
          valResto: valResto + "",
          exchange: cash.toFixed(2),
          neto,
          total: valNumberToString(total, neto),
          discountTotal: valNumberToString(discountTotal)
        });
      } else {
        set({ total: neto });
      }



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
        quantityArticleDetail,
        isSale,
        costumerID,
        cashCordoba,
        cashDollar,
        costDollar,
        total
      } = get();
      const validationsErrors = errors;
      const validationsDetailErrors = detailErrors;
      const reqMsj = "Campo requerido";
 
      //Validaciones generales
      const cashCordobaParse = parseFloat(cashCordoba) || 0;
      const cashDollarParse = parseFloat(cashDollar) || 0;
      const costDollarParse = parseFloat(costDollar) || 0;
      const cash = cashCordobaParse + (cashDollarParse * costDollarParse)
      if (cash < parseFloat(total) && get().isSale) {
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
      if (detail.length === 0) {
        validationsErrors["empty"] = "No hay elementos";
        valState = false;
      }
      //------------------------

      if (isSale) {
        if (costumerID == "") {
          validationsErrors["costumerID"] = reqMsj;
          valState = false;
        }

      } else {
        //Validations of purchase
        if (quantityArticleDetail > parseInt(quantityBox)) {
          validationsErrors["quantityArticleDetail"] = "Excede la cantidad de articulos de la caja." ;
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
        //-----------------------------------------

      }

      detail.map((d) => {
        const f = {
          subtotal: parseFloat(d.subtotal),
          discount: parseFloat(d.discount),
          quantity: parseInt(d.quantity),
          stock: parseInt(d.stock),
          price: parseFloat(d.price),
        }
        //console.log("Validadicon " + noLetters(d.discount))
        if (!noLetters(d.discount) && get().isSale) {
          validationsDetailErrors.push({
            id: d.id,
            field: "discount",
            msj: "Solo números",
          });
          valState = false;
        } else if (f.discount >= f.subtotal) {
          validationsDetailErrors.push({
            id: d.id,
            field: "discount",
            msj: "No puede ser mayor a subtotal",
          });
          valState = false;
        }

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
        } else if (f.quantity < 1) {
          validationsDetailErrors.push({
            id: d.id,
            field: "quantity",
            msj: "Debe ser mayor a 1",
          });
          valState = false;
        } else if (f.quantity > f.stock && get().isSale) {
          validationsDetailErrors.push({
            id: d.id,
            field: "quantity",
            msj: "Stock disponible " + f.stock,
          });
          valState = false;
        }

        else if (!isInt("" + f.quantity)) {
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
        } else if (f.price < get().costArticle && !isSale) {
          validationsDetailErrors.push({
            id: d.id,
            field: "price",
            msj: "Debe ser mayor a  C$ " + formatNumber("" + get().costArticle),
          });
          valState = false;
        }

      });
      set({ errors: validationsErrors, detailErrors: validationsDetailErrors });
      console.log(valState)
      return valState;
    },
    clear() {
      set({
        exchange: "",
        cashDollar: "",
        cashCordoba: "",
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
        discountTotal,
        neto,
        costumerID,
        isSale,
        cashCordoba,
        cashDollar,
        exchange
      } = get();
      let js;
      if (isSale) {
        js = {
          code,
          date,
          total,
          detail,
          discountTotal,
          neto,
          costumerID,
          cashCordoba,
          cashDollar,
          exchange
        };
      } else {
        js = {
          code,
          supplierID,
          articleBoxID,
          quantityBox,
          costBox,
          date,
          total,
          detail,
        }
      }
      return JSON.stringify(js);
    },
  };
});

export const noLetters = (d: string) => {
  // La expresión regular verifica si la cadena tiene solo números y opcionalmente un punto decimal y signo menos
  return d == "" || d == undefined ? true : /^-?\d+(\.\d+)?$/.test(d);
};

export const isInt = (d: string) => {
  return /^\d+$/.test(d);
};

