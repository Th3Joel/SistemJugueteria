import { useForm } from "@/modules/core/hooks/useForm";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ISaleView } from "../../sale/pages/ViewSale";
import { CircularProgress } from "@mui/material";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import dayjs from "dayjs";
import "dayjs/locale/es"

interface ISalesReport extends ISaleView {
    user: {
        name: string
    }
}

const SalesReport = () => {
    const { filter } = useParams<{ filter: string }>();
    const query = new URLSearchParams(useLocation().search)
    const startDate = query.get("startDate")
    const endDate = query.get("endDate")
    const { get, data, loading } = useForm<ISalesReport[]>([]);
    const getData = async () => {
        if (startDate && endDate) {
            get("/reports/sales?startDate=" + startDate + "&endDate=" + endDate)
        } else if (filter) {
            get("/reports/sales?filter=" + filter)
        }
        console.log(data)
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
                    <div className="w-[800px]">
                        <h1 className="text-center text-2xl mt-3">Reporte de ventas por periodo</h1>
                        <div className="mx-2">
                            <div className="flex justify-between">
                                <small className="font-bold">
                                    Filtrar por: {startDate && endDate ? "De " + startDate + " a " + endDate : msj[(filter ?? "")]}
                                </small>
                                <small className="font-bold text-red-500">
                                    Marcadas en rojo (Ventas anuladas)
                                </small>
                            </div>
                            <table>
                                <thead className="sticky top-0">
                                    <tr>
                                        <th>N° Factura</th>
                                        <th>Fecha</th>
                                        <th>Cajero</th>
                                        <th>Cliente</th>
                                        <th>Neto</th>
                                        <th>Total (descuento)</th>
                                        <th>Descuento</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((d, i) => (
                                        <tr key={i} className={d.state == 0 ? "bg-red-300" : ""}>
                                            <td>{d.code.padStart(4, "0")}</td>
                                            <td>{dayjs(d.date).format("DD/MM/YYYY")}</td>
                                            <td className="text-left">{d.user.name}</td>
                                            <td className="text-left">{d.costumer.name}</td>
                                            <td className="text-nowrap">C$ {formatNumber(d.neto)}</td>
                                            <td>C$ {formatNumber(d.total)}</td>
                                            <td>C$ {formatNumber(Number(d.discountTotal) == 0 ? "0.00" : d.discountTotal)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={4}>Total</td>
                                        <td className="text-nowrap" >C$ {formatNumber(data.filter(d => d.state == 1).reduce((a, b) => a + Number(Number(b.neto).toFixed(2)), 0) + "")}</td>
                                        <td>C$ {formatNumber(data.filter(d => d.state == 1).reduce((a, b) => a + Number(Number(b.total).toFixed(2)), 0) + "")}</td>
                                        <td>C$ {

                                        formatNumber(data.filter(d => d.state == 1).reduce((a, b) => a + Number(Number(b.discountTotal).toFixed(2)), 0) + "") == "" ? "0.00" : 
                                        formatNumber(data.filter(d => d.state == 1).reduce((a, b) => a + Number(Number(b.discountTotal).toFixed(2)), 0) + "")
                                        
                                        }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    )
}

export default SalesReport