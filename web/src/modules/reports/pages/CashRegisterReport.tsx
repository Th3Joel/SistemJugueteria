import { useForm } from "@/modules/core/hooks/useForm"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { CircularProgress } from "@mui/material"
import dayjs from "dayjs"
import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"

interface ICashRegisterReport {
    initialBalance: string
    totalSales: string
    totalExpenses: string
    totalCordobas: string
    missingInCordobas: string
    cordobasSurplus: string
    totalDollars: string
    missingInDollars: string
    dollarsSurplus: string
    createdAt: string
    closedAt: string
    user: {
        name: string
    }
}

const CashRegisterReport = () => {
    const { filter } = useParams<{ filter: string }>();
    const query = new URLSearchParams(useLocation().search)
    const startDate = query.get("startDate")
    const endDate = query.get("endDate")
    const { get, data, loading } = useForm<ICashRegisterReport[]>([]);
    const getData = async () => {
        if (startDate && endDate) {
            get("/reports/cashRegister?startDate=" + startDate + "&endDate=" + endDate)
        } else if (filter) {
            get("/reports/cashRegister?filter=" + filter)
        }
    }
    const msj: Record<string, string> = {
        day: `De este día`,
        week: `De esta semana`,
        month: `De este mes (${dayjs().locale("es").format("MMMM")})`,
        year: `De este año ${dayjs().format("YYYY")}`
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            {
                loading ? <CircularProgress />
                    :
                    <div className="w-auto">
                        <h1 className="text-center text-2xl mt-3">Reporte de arqueos de caja por periodo</h1>
                        <div className="mx-2">
                            <small className="font-bold">
                                Filtrar por: {startDate && endDate ? "De " + startDate + " a " + endDate : msj[(filter ?? "")]}
                            </small>
                            <table>
                                <thead className="sticky top-0">
                                    <tr>
                                        <th>Cajero</th>
                                        <th>Apertura</th>
                                        <th>Fondo inicial</th>
                                        <th>Total ventas</th>
                                        <th>Total egresos</th>
                                        <th>Total córdobas</th>
                                        <th>Sobrante C$</th>
                                        <th>Faltante C$</th>
                                        <th>Total dólares</th>
                                        <th>Sobrante $</th>
                                        <th>Faltante $</th>
                                        <th>Cierre</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((d, i) => (
                                        <tr key={i}>
                                            <td className="text-left">{d.user.name}</td>
                                            <td>{dayjs(d.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                            <td>C$ {formatNumber(d.initialBalance)}</td>
                                            <td>C$ {d.totalSales == "0" || d.totalSales == "" ? "0.00" : formatNumber(d.totalSales)}</td>

                                            <td>C$ {d.totalExpenses == "0" || d.totalExpenses == "" ? "0.00" : formatNumber(d.totalExpenses)}</td>

                                            <td>C$ {d.totalCordobas == "0" || d.totalCordobas == "" ? "0.00" : formatNumber(d.totalCordobas)}</td>
                                            <td>C$ {d.cordobasSurplus == "0" || d.cordobasSurplus == "" ? "0.00" : formatNumber(d.cordobasSurplus)}</td>

                                            <td>C$ {d.missingInCordobas == "0" || d.missingInCordobas == "" ? "0.00" : formatNumber(d.missingInCordobas)}</td>


                                            <td>$ {d.totalDollars == "0" || d.totalDollars == "" ? "0.00" : formatNumber(d.totalDollars)}</td>

                                            <td>$ {d.dollarsSurplus == "0" || d.dollarsSurplus == "" ? "0.00" : formatNumber(d.dollarsSurplus)}</td>

                                            <td>$ {d.missingInDollars == "0" || d.missingInDollars == "" ? "0.00" : formatNumber(d.missingInDollars)}</td>
                                            <td>{d.closedAt == "" ? "Por definir" : dayjs(d.closedAt).format("DD/MM/YYYY hh:mm A")}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}>Total</td>
                                        <td>C$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.totalSales), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.totalSales), 0) + "")}</td>

                                        <td> C$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.totalExpenses), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.totalExpenses), 0) + "")}</td>

                                        <td>C$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.totalCordobas), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.totalCordobas), 0) + "")}</td>

                                        <td>C$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.cordobasSurplus), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.cordobasSurplus), 0) + "")}</td>

                                        <td>C$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.missingInCordobas), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.missingInCordobas), 0) + "")}</td>

                                        <td>$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.totalDollars), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.totalDollars), 0) + "")}</td>

                                        <td>$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.dollarsSurplus), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.dollarsSurplus), 0) + "")}</td>

                                        <td>$ {formatNumber(data.reduce((a, b) => a + parseFloat(b.missingInDollars), 0) + "") == "" ? "0.00" : formatNumber(data.reduce((a, b) => a + parseFloat(b.missingInDollars), 0) + "")}</td>

                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CashRegisterReport