import { useForm } from "@/modules/core/hooks/useForm";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ISaleView } from "../sale/ViewSale";
import { CircularProgress } from "@mui/material";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import dayjs from "dayjs";
import "dayjs/locale/es"

const SalesReport = () => {
    const { filter } = useParams<{ filter: string }>();
    const query = new URLSearchParams(useLocation().search)
    const startDate = query.get("startDate")
    const endDate = query.get("endDate")
    const { get, data, loading } = useForm<ISaleView[]>([]);
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
                        <div className="print-container">
                            <h1 className="text-center text-2xl mt-3">Reporte de ventas por periodo</h1>
                            <div className="mx-2">
                                <small className="font-bold">
                                    Filtrar por: {startDate && endDate ? "De " + startDate + " a " + endDate : msj[(filter ?? "")]}
                                </small>
                                <div className="overflow-y-auto max-h-[300px] w-full">
                                    <table>
                                        <thead className="sticky top-0">
                                            <tr>
                                                <th>N° Factura</th>
                                                <th>Cliente</th>
                                                <th>Neto</th>
                                                <th>Total</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {data.map((d, i) => (
                                                <tr key={i}>
                                                    <td>{d.code.padStart(4, "0")}</td>
                                                    <td>{d.costumer.name}</td>
                                                    <td>C$ {formatNumber(d.neto)}</td>
                                                    <td>C$ {formatNumber(d.total)}</td>
                                                    <td>{dayjs(d.date).format("DD/MM/YYYY")}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default SalesReport