import cashImage from "@/assets/cash.png";
import { Button } from "@mui/material";
import { useForm } from "../core/hooks/useForm";
import { useEffect, useState } from "react";
import { formatNumber } from "../core/utils/formatNumber";
import dayjs from "dayjs";
import { useModal } from "../core/components/Modal";
import { CloseCashRegsiter } from "./CloseCashRegsiter";
import { AuthState } from "../core/states/auth-state";
import { Expenses } from "./Expenses";

interface IOpenCash {
    initialBalance: string
    totalCashBalance: string
    cashCordobaTotal: string
    cashDollarTotal: string
    closedAt: string
    createdAt: string
}

export const OpenCash = () => {
    const { RenderModal, setModalShow } = useModal()
    const { company } = AuthState()
    const [dataView, setDataView] = useState<{ dollarToCordoba: number, cashTotal: number }>({
        dollarToCordoba: 0,
        cashTotal: 0,
    })
    const { get, data } = useForm<IOpenCash>({
        initialBalance: "",
        totalCashBalance: "",
        cashCordobaTotal: "",
        cashDollarTotal: "",
        closedAt: "",
        createdAt: "",
    });

    useEffect(() => {
        get("/cash-register/show")
    }, [])
    useEffect(() => {
        const cashDolllarTotal = parseFloat(data.cashDollarTotal)
        const priceDollar = parseFloat(company.PriceDollar)
        const cashCordobaTotal = parseFloat(data.cashCordobaTotal)
        const initialBalance = parseFloat(data.initialBalance)

        const dollarToCordoba = cashDolllarTotal * priceDollar
        const cashTotal = cashCordobaTotal + dollarToCordoba + initialBalance
        setDataView({
            dollarToCordoba,
            cashTotal,
        })
    }, [data])
    return (
        <div className="flex flex-col gap-10 items-center my-5">
            <div className="rounded-xl shadow-xl px-4 py-3 flex justify-between w-[700px] border">
                <div className="flex">
                    <img src={cashImage} alt="cashImage" width={90} />
                    <div className="flex flex-col justify-center ml-3">
                        <h1 className="font-bold text-xl">Caja</h1>
                        <h2 className="text-gray-500 font-bold">Juan Molina</h2>
                        <h3 className="text-green-700 mt-3">
                            {dayjs(data.createdAt).format("DD/MM/YYYY | hh:mm A")}
                        </h3>
                    </div>
                </div>

                <div className="flex flex-col justify-between ml-4">
                    <h1 className="text-green-700 text-center font-bold">Abierta</h1>
                    <CloseCashRegsiter RenderModal={RenderModal} setModalShow={setModalShow} />
                    <Button variant="contained" color="error" onClick={() => setModalShow(true)}>Cierre</Button>
                </div>
            </div>

            <div className="rounded-xl shadow-xl px-4 py-4 w-[700px] border">
                <div className="flex flex-col">
                    <span className="flex justify-evenly">
                        <h1 className="mr-2 font-bold text-gray-600">Saldo inicial:</h1>
                        <h2 className="text-gray-600 font-semilight">C$ {formatNumber(data.initialBalance)}</h2>
                    </span>
                    <span className="flex justify-evenly">
                        <h1 className="mr-2 font-bold text-gray-600">Efectivo en dolar:</h1>
                        <h2 className="text-gray-600 font-semilight">$ {formatNumber(data.cashDollarTotal)} ⤳ C$ {formatNumber(dataView.dollarToCordoba + "")}</h2>
                    </span>
                    {/* <span className="flex justify-evenly">
                        <h1 className="mr-2 font-bold text-gray-600">Efectivo en córdoba:</h1>
                        <h2 className="text-gray-600 font-semilight">C$ {formatNumber(data.cashCordobaTotal)}</h2>
                    </span> */}
                    <span className="flex justify-evenly">
                        <h1 className="mr-2 font-bold text-gray-600">Efectivo córdoba:</h1>
                        <h2 className="text-gray-600 font-semilight">C$ {
                            formatNumber(data.cashCordobaTotal + "")}</h2>
                    </span>
                    <span className="flex justify-evenly">
                        <h1 className="mr-2 font-bold text-gray-600">Total:</h1>
                        <h2 className="text-gray-600 font-semilight">C$ {
                            formatNumber(dataView.cashTotal + "")}</h2>
                    </span>
                </div>
            </div>
            <div className="rounded-xl shadow-xl px-4 py-4 w-[700px] border">
                <Expenses />
            </div>
        </div>
    )
}
