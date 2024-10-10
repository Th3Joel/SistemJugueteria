import { useFetch } from "@/modules/core/hooks/useFetch"
import { noLetters, TErrors } from "@/modules/purchase/states/purchase-state"
import { ICashRegister, IResponseFetch } from "@/types"
import { create } from "zustand"

interface Denomination {
    ZeroPointFive: string
    One: string
    Five: string
    Ten: string
    Twenty: string
    Fyfty: string
    OneHundred: string
    TwoHundred: string
    FiveHundred: string
    OneThousand: string

    TotalDollar: string
    TotalCordoba: string
}


interface cahsRegisterState {
    //Status validation open/close
    state: boolean
    verify: () => Promise<void>

    valState: boolean
    errors: TErrors
    //Cash Register data
    expenses: IExpenses[]
    createdAt: string
    PriceDollar: string
    //Box details
    InitialBalance: string
    TotalSales: string
    TotalExpenses: string

    TotalCordobas: string
    MissingInCordobas: string
    CordobasSurplus: string

    TotalDollars: string
    MissingInDollars: string
    DollarsSurplus: string

    //Denomination details
    Denomination: Denomination

    //Functions
    cleanErrors: () => void
    cleanDeno: () => void
    cleanData: () => void
    fetchData: () => Promise<void>
    inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    calculations: () => void
    setPriceDollar: (PriceDollar: string) => void
    jsonParse: () => string
    validations: (submit: boolean) => boolean
}


export interface IExpenses {
    id: string
    NumInvoice: string
    Detail: string
    Amount: string
}
const valores: Record<string, number> = {
    ZeroPointFive: 0.5,
    One: 1,
    Five: 5,
    Ten: 10,
    Twenty: 20,
    Fyfty: 50,
    OneHundred: 100,
    TwoHundred: 200,
    FiveHundred: 500,
    OneThousand: 1000,
}

const CashRegisterState = create<cahsRegisterState>((set, get) => ({
    //Status validation open/close
    state: false,
    verify: async () => {
        const res = await useFetch<{ status: boolean, msj: string }>("/cash-register/verify", "GET");
        if (res.status) {
            set({ state: true })
        } else {
            set({ state: false })
        }
    },

    valState: false,
    errors: {},
    //Cash Register data
    expenses: [],
    createdAt: "",
    PriceDollar: "",
    InitialBalance: "",
    TotalSales: "",
    TotalExpenses: "",

    TotalCordobas: "",
    MissingInCordobas: "",
    CordobasSurplus: "",

    TotalDollars: "",
    MissingInDollars: "",
    DollarsSurplus: "",

    Denomination: {
        ZeroPointFive: "",
        One: "",
        Five: "",
        Ten: "",
        Twenty: "",
        Fyfty: "",
        OneHundred: "",
        TwoHundred: "",
        FiveHundred: "",
        OneThousand: "",

        TotalDollar: "",
        TotalCordoba: "",
    },
    setPriceDollar: (PriceDollar: string) => {
        set({ PriceDollar })
    },
    fetchData: async () => {

 
        const res = await useFetch<IResponseFetch<ICashRegister>>("/cash-register/show", "GET");
        if (res.status) {
            const { PriceDollar } = get()
            const initialBalance = Number(res.find.initialBalance)
            const totalDollars = Number(res.find.totalDollars)
            const totalSales = Number(res.find.totalSales)

            const totalExpenses = Number(res.find.expenses.map(x => x.Amount).reduce((a, b) => a + parseFloat(b), 0))

            const totalCordobas = ((initialBalance + totalSales) - Number(totalExpenses)) - (Number(PriceDollar) * totalDollars)
            set({
                TotalExpenses:  totalExpenses+ "",
                createdAt: res.find.createdAt,
                InitialBalance: res.find.initialBalance,
                TotalSales: res.find.totalSales,
                TotalDollars: res.find.totalDollars,
                TotalCordobas: totalCordobas + "",
                expenses: res.find.expenses,
            })
            get().calculations()
        }
    }
    ,
    //Functions
    inputChange: (e) => {
        const { name, value } = e.currentTarget;
        set((prev) => ({
            Denomination: {
                ...prev.Denomination,
                [name]: value
            }
        }))
        if (get().validations(false)) {
            get().calculations()
        }
    },
    calculations() {
        //Calculate the total of the domanination
        let sum = 0;
        Object.entries(get().Denomination).forEach(([key, value]) => {
            sum += (parseInt(value) || 0) * (valores[key] || 0)
        })

        set(prev => ({
            Denomination: {
                ...prev.Denomination,
                TotalCordoba: sum + ""
            }
        }));

        //Calculate details of the cash register
        const { Denomination, TotalDollars, TotalCordobas } = get();
        //Cordobas
        const totalCordobaDenamination = Number(Denomination.TotalCordoba);
        const totalCordobas = Number(TotalCordobas);
        let MissingInCordobas = totalCordobaDenamination < totalCordobas ? totalCordobas - totalCordobaDenamination : 0;
        let CordobasSurplus = totalCordobaDenamination > totalCordobas ? totalCordobaDenamination - totalCordobas : 0;
        if (totalCordobaDenamination == 0) {
            MissingInCordobas = 0
            CordobasSurplus = 0
        }
        //Dollars
        const totalDollarDenamination = Number(Denomination.TotalDollar);
        const totalDollars = Number(TotalDollars);
        let DollarsSurplus = totalDollarDenamination > totalDollars ? totalDollarDenamination - totalDollars : 0;
        let MissingInDollars = totalDollarDenamination < totalDollars ? totalDollars - totalDollarDenamination : 0;
        if (totalDollarDenamination == 0) {
            MissingInDollars = 0
            DollarsSurplus = 0
        }

        set({
            DollarsSurplus: DollarsSurplus + "",
            MissingInDollars: MissingInDollars + "",
            MissingInCordobas: MissingInCordobas + "",
            CordobasSurplus: CordobasSurplus + "",
        })
    },
    validations: (submit) => {
        let val = true;
        const { Denomination } = get()
        const err: TErrors = {}

        const msjOnlyNum = "Solo números"
        const msjGreaterThan0 = "Debe ser mayor a 0"

        if (submit) {
            if (Number(get().Denomination.TotalCordoba) < 1) {
                err["DTotalCordoba"] = "Campo requerido"
                val = false
            }
        }



        if (!noLetters(Denomination.TotalDollar)) {
            err["DTotalDollar"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.TotalDollar) < 0) {
            err["DTotalDollar"] = msjGreaterThan0
            val = false
        }

        //Denomination
        if (!noLetters(Denomination.ZeroPointFive)) {
            err["ZeroPointFive"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.ZeroPointFive) < 0) {
            err["ZeroPointFive"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.One)) {
            err["One"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.One) < 0) {
            err["One"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.Five)) {
            err["Five"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.Five) < 0) {
            err["Five"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.Ten)) {
            err["Ten"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.Ten) < 0) {
            err["Ten"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.Twenty)) {
            err["Twenty"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.Twenty) < 0) {
            err["Twenty"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.Fyfty)) {
            err["Fyfty"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.Fyfty) < 0) {
            err["Fyfty"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.OneHundred)) {
            err["OneHundred"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.OneHundred) < 0) {
            err["OneHundred"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.TwoHundred)) {
            err["TwoHundred"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.TwoHundred) < 0) {
            err["TwoHundred"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.FiveHundred)) {
            err["FiveHundred"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.FiveHundred) < 0) {
            err["FiveHundred"] = msjGreaterThan0
            val = false
        }

        if (!noLetters(Denomination.OneThousand)) {
            err["OneThousand"] = msjOnlyNum
            val = false
        } else if (Number(Denomination.OneThousand) < 0) {
            err["OneThousand"] = msjGreaterThan0
            val = false
        }

        set({
            valState: val,
            errors: err
        })
        return val
    },
    jsonParse: () => {
        const {
            TotalExpenses,
            InitialBalance,
            TotalSales,
            TotalDollars,
            TotalCordobas,
            expenses,
            Denomination,
            MissingInCordobas,
            MissingInDollars,
            DollarsSurplus,
            CordobasSurplus
        } = get()
        return JSON.stringify({
            TotalExpenses,
            InitialBalance,
            TotalSales,
            TotalDollars,
            TotalCordobas,
            expenses,
            Denomination,
            MissingInCordobas,
            MissingInDollars,
            DollarsSurplus,
            CordobasSurplus,
        })
    },
    cleanData: () => {
        set({
            InitialBalance: "",
            TotalSales: "",
            TotalExpenses: "",

            TotalCordobas: "",
            MissingInCordobas: "",
            CordobasSurplus: "",

            TotalDollars: "",
            MissingInDollars: "",
            DollarsSurplus: "",
        })
    },
    cleanDeno: () => {
        set({
            Denomination: {
                ZeroPointFive: "",
                One: "",
                Five: "",
                Ten: "",
                Twenty: "",
                Fyfty: "",
                OneHundred: "",
                TwoHundred: "",
                FiveHundred: "",
                OneThousand: "",

                TotalDollar: "",
                TotalCordoba: "",
            },
        })
        get().calculations()
    },
    cleanErrors: () => {
        set({
            errors: {}
        })
    }

}))

export default CashRegisterState