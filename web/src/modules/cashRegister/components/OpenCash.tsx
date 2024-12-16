import cashImage from "@/assets/cash.png";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import dayjs from "dayjs";
import { Denomination } from "./Denomination";
import { AuthState } from "@/modules/core/states/auth-state";
import { Expenses } from "./Expenses";
import { InputText } from "@/modules/core/components/Input";
import CashRegisterState from "@/modules/cashRegister/states/cashRegisterState";
import { useFetch } from "@/modules/core/hooks/useFetch";
import { IResponseFetch } from "@/types";
import { toast } from "sonner";
import alertBox from "@/modules/core/utils/alertBox";


export const OpenCash = () => {
    const { company,user } = AuthState()
    const {

        createdAt,
        InitialBalance,
        TotalExpenses,
        TotalSales,

        TotalCordobas,
        MissingInCordobas,
        CordobasSurplus,

        TotalDollars,
        MissingInDollars,
        DollarsSurplus,

        verify,
        fetchData,
        setPriceDollar,
        jsonParse, 
        cleanData,
        validations,
        cleanErrors
    } = CashRegisterState();

    const handleClose = async () => {
        if (!validations(true)){
            toast.error("Tienes errores")
            return
        }
        alertBox(
            "warning",
            "¿Confirmación?",
            "Cerrar caja",
            "Aceptar",
            async () => {
                const res = await useFetch<IResponseFetch<unknown>>("/cash-register/close", "DELETE", jsonParse());
                if (res.status) {
                    toast.success(res.msj)
                    verify()
                }
            }
        )

    }
    useEffect(() => {
        setPriceDollar(company.PriceDollar)
        fetchData()
        return () =>{
            cleanData()
            cleanErrors()
        }
    }, [])

    return (
        <div className="flex flex-col gap-4 my-3 max-w-[700px] mx-auto">
            <div className="rounded-xl shadow-lg px-4 py-3 flex w-full justify-between  border cashRegisterGen">
                <div className="flex">
                    <img src={cashImage} alt="cashImage" width={90} />
                    <div className="flex flex-col justify-center ml-3">
                        <h1 className="font-bold text-xl">Caja de:</h1>
                        <h2 className="text-gray-500 font-bold">{user.Name}</h2>
                        <h3 className="text-green-700 mt-3">
                            {dayjs(createdAt).format("DD/MM/YYYY | hh:mm A")}
                        </h3>
                    </div>
                </div>

                <div className="flex flex-col justify-between ml-4">
                    <h1 className="text-green-700 text-center font-bold">Abierta</h1>
                    <Button variant="contained" color="error" onClick={handleClose}>Cierre</Button>
                </div>
            </div>

            <div className="w-full flex justify-evenly gap-6">

                <div className="rounded-xl shadow-lg w-full px-4 pb-4 border cashRegisterDetails">
                    <h1 className="my-2 font-bold">Detalle de caja</h1>
                    <div className="flex flex-col gap-4">
                        {/* <span className="flex justify-evenly">
                            <h1 className="mr-2 font-bold text-gray-600">Saldo inicial:</h1>
                            <h2 className="text-gray-600 font-semilight">C$ {formatNumber(data.initialBalance)}</h2>
                        </span> */}
                        <InputText
                            label="Saldo inicial"
                            value={formatNumber(InitialBalance)}
                            icon={<p>C$</p>}
                        />

                        <InputText
                            label="Total ventas"
                            value={formatNumber(TotalSales)}
                            icon={<p>C$</p>}
                        />
                        <InputText
                            label="Egresos totales"
                            value={formatNumber(TotalExpenses)}
                            icon={<p>C$</p>}
                        />

                        <InputText
                            label="Total córdobas"
                            value={formatNumber(TotalCordobas)}
                            icon={<p>C$</p>}
                        />

                        <InputText
                            label="Faltante en córdobas"
                            value={formatNumber(MissingInCordobas)}
                            icon={<p>C$</p>}
                        />
                        <InputText
                            label="Sobrante en córdobas"
                            value={formatNumber(CordobasSurplus)}
                            icon={<p>C$</p>}
                        />
                        <hr />

                        <InputText
                            label="Total dólares"
                            value={formatNumber(TotalDollars)}
                            icon={<p>$</p>}
                        />

                        <InputText
                            label="Faltante en dólares"
                            value={formatNumber(MissingInDollars)}
                            icon={<p>$</p>}
                        />

                        <InputText
                            label="Sobrante en dólares"
                            value={formatNumber(DollarsSurplus)}
                            icon={<p>$</p>}
                        />

                        {/* <span className="flex justify-evenly">
                            <h1 className="mr-2 font-bold text-gray-600">Efectivo en dolar:</h1>
                            <h2 className="text-gray-600 font-semilight">$ {formatNumber(data.cashDollarTotal)} ⤳ C$ {formatNumber(dataView.dollarToCordoba + "")}</h2>
                        </span> */}
                        {/* <span className="flex justify-evenly">
                        <h1 className="mr-2 font-bold text-gray-600">Efectivo en córdoba:</h1>
                        <h2 className="text-gray-600 font-semilight">C$ {formatNumber(data.cashCordobaTotal)}</h2>
                        </span> */}
                        {/* <span className="flex justify-evenly">
                            <h1 className="mr-2 font-bold text-gray-600">Efectivo córdoba:</h1>
                            <h2 className="text-gray-600 font-semilight">C$ {
                                formatNumber(data.cashCordobaTotal + "")}</h2>
                        </span>
                        <span className="flex justify-evenly">
                            <h1 className="mr-2 font-bold text-gray-600">Total:</h1>
                            <h2 className="text-gray-600 font-semilight">C$ {
                                formatNumber(dataView.cashTotal + "")}</h2>
                        </span> */}
                    </div>
                </div>
                <div className="rounded-xl shadow-xl px-4 border w-full cashRegisterDenomination">
                    <h1 className="my-2 font-bold">Denominación de dinero</h1>
                    <Denomination />
                </div>
            </div>
            <div className="rounded-xl shadow-xl px-4 py-4 w-full border cashRegisterExpenses">
                <Expenses />
            </div>
        </div>
    )
} 
