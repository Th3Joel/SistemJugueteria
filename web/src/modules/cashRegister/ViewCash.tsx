import cashImage from "@/assets/cash.png";
import { Raya } from "../core/components/Raya";
import { IconButton } from "@mui/material";
import { FaPrint } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useForm } from "../core/hooks/useForm";
import { useEffect } from "react";
import { IDenomination } from "./CloseCashRegsiter";
import { formatNumber } from "../core/utils/formatNumber";
import dayjs from "dayjs";
import { AuthState } from "../core/states/auth-state";
interface IParams {
    [key: string]: string
    id: string
}
interface IViewCash {
    //expenses: ExpensesData[]
    denomination: IDenomination
    initialBalance: string
    cashCordobaTotal: string
    cashDollarTotal: string
    totalSales: string
    state: string
    closedAt: string
    createdAt: string
    user: {
        name: string
    }
}


const ViewCash = () => {
    const { id } = useParams<IParams>()
    const {user} = AuthState();
    const { get, data } = useForm<IViewCash>({
        //expenses: [],
        denomination: {
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
        initialBalance: "",
        cashCordobaTotal: "",
        cashDollarTotal: "",
        totalSales: "",
        state: "",
        closedAt: "",
        createdAt: "",
        user: {
            name: "",
        }
    })
    //const totalSales = ((parseFloat(data.cashDollarTotal) * parseFloat(company.PriceDollar)) + parseFloat(data.totalSales))
    const totalSales =  parseFloat(data.totalSales)
    //const totalRegisterDenomination = ((parseFloat(company.PriceDollar) * parseFloat(data.denomination.TotalDollar)) + parseFloat(data.denomination.TotalCordoba))
    const totalRegisterDenomination = parseFloat(data.denomination.TotalCordoba)
    //const totalExpenses = data.expenses ? data.expenses.reduce((a, b) => a + parseFloat(b.Amount), 0) : 0
    const totalArqueado = totalSales + parseFloat(data.initialBalance);
    const sobrante = totalRegisterDenomination > totalArqueado
    const sobroNum = sobrante ? totalRegisterDenomination - totalArqueado : totalArqueado - totalRegisterDenomination

    useEffect(() => {
        get(user.Role == "admin" ? `/cash-register/show/${id}` : `/cash-register/show/my/${id}`)
    }, [])
    return (
        <>
            <h1 className="text-center text-gray-600 font-bold text-xl mt-2">
                Visualizar caja
            </h1>
            <div className="flex flex-col gap-7 items-center my-5">
                <div className="rounded-xl shadow-xl px-4 py-3 flex justify-between w-[700px] border">
                    <div className="flex">
                        <img src={cashImage} alt="cashImage" width={90} />
                        <div className="flex flex-col justify-center ml-3">
                            <h1 className="font-bold text-xl">Caja</h1>
                            <h2 className="text-gray-500 font-bold">{data.user.name}</h2>
                            <h3 className="text-red-700 mt-3">
                                {dayjs(data.closedAt).format("DD/MM/YYYY")}
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between ml-4">
                        <h1 className="text-red-700 text-end font-bold">
                            Cerrada |
                            <IconButton color="success">
                                <FaPrint className="text-md" />
                            </IconButton>
                        </h1>
                        <div className="flex flex-col text-lg">
                            <span>
                                Saldo inicial: C$ {formatNumber(data.initialBalance)}
                            </span>
                            <span>
                                Total ventas: C$ {formatNumber(totalSales + "")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl shadow-xl  py-6 flex justify-evenly w-[700px] border">
                    <div>
                        <h1 className="text-gray-600 font-bold text-center mb-2">
                            Apertura
                        </h1>
                        <span className="font-bold text-xl text-green-700">
                            {dayjs(data.createdAt).format("hh:mm A")}
                        </span>
                    </div>
                    <Raya />
                    <div className="text-gray-600 font-bold">
                        <h1 className="text-gray-600 font-bold text-center mb-2">
                            Cierre
                        </h1>

                        <span className="font-bold text-xl text-red-700">
                            {dayjs(data.closedAt).format("hh:mm A")}
                        </span>
                    </div>
                </div>

                {/* <div className="rounded-xl shadow-xl px-4 py-3 w-[700px] border">
                    <Expenses expenses={data.expenses} isView />
                </div> */}
                <div className="rounded-xl shadow-xl px-4 py-3 w-[700px] border">
                    <h1 className="font-bold text-xl text-gray-600 text-center mb-2">
                        Denominación de dinero
                    </h1>

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Tipo de billete
                                </th>
                                <th>
                                    Cantidad
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Monedas de 1
                                </td>
                                <td>
                                    {data.denomination.One}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Monedas de 5
                                </td>
                                <td>
                                    {data.denomination.Five}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Billetes de 10
                                </td>
                                <td>
                                    {data.denomination.Ten}
                                </td>
                            </tr><tr>
                                <td>
                                    Billetes de 20
                                </td>
                                <td>
                                    {data.denomination.Twenty}
                                </td>
                            </tr><tr>
                                <td>
                                    Billetes de 50
                                </td>
                                <td>
                                    {data.denomination.Fyfty}
                                </td>
                            </tr><tr>
                                <td>
                                    Billetes de 100
                                </td>
                                <td>
                                    {data.denomination.OneHundred}
                                </td>
                            </tr><tr>
                                <td>
                                    Billetes de 200
                                </td>
                                <td>
                                    {data.denomination.TwoHundred}
                                </td>
                            </tr><tr>
                                <td>
                                    Billetes de 500
                                </td>
                                <td>
                                    {data.denomination.FiveHundred}
                                </td>
                            </tr><tr>
                                <td>
                                    billetes de 1000
                                </td>
                                <td>
                                    {data.denomination.OneThousand}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-2">
                        <div className="flex justify-evenly">
                            <h1 className="text-lg font-bold">
                                Efectivo córdobas:
                            </h1>
                            <h1 className="text-gray-600 font-bold">
                                C$ {formatNumber(data.denomination.TotalCordoba)}
                            </h1>
                        </div>
                        <div className="flex justify-evenly">
                            <h1 className="text-lg font-bold">
                                Efectivo dólares:
                            </h1>
                            <h1 className="text-gray-600 font-bold">
                                $ {formatNumber(data.denomination.TotalDollar)}
                            </h1>
                        </div>

                    </div>
                </div>
                <div className="rounded-xl shadow-xl px-4 py-6 w-[700px] border">

                    <div className="flex justify-evenly">
                        <h1 className="text-xl font-bold">Total efectivo córdobas: </h1>
                        <h2 className="text-xl text-gray-600 font-bold">
                            C$ {
                                formatNumber(totalRegisterDenomination + "")
                            }
                        </h2>
                    </div>
                    <div className="flex justify-evenly">
                        <h1 className="text-xl font-bold">Total arqueado: </h1>
                        <h2 className="text-xl text-gray-600 font-bold">
                            C$ {formatNumber(totalArqueado + "")}
                        </h2>
                    </div>
                    <div className={`flex justify-evenly font-bold ${sobrante || totalRegisterDenomination === totalArqueado ? "text-green-700" : "text-red-700"}`}>
                        {
                            totalRegisterDenomination.toFixed(2) === totalArqueado.toFixed(2) ?
                                <h1>
                                    Igualado
                                </h1>
                                :
                                <>
                                    <h1 className="text-lg">{sobrante ? "Sobrante" : "Faltante"}: </h1>
                                    <h2 className="text-md">
                                        {sobrante ? "+" : "-"} C$ {formatNumber(sobroNum + "")}
                                    </h2>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewCash