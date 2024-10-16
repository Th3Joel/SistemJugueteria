import { useForm } from "@/modules/core/hooks/useForm"
import { CircularProgress } from "@mui/material"
import dayjs from "dayjs"
import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"

interface IOtherInventoryOutputs {
    Quantity: string
    Reason: string
    Article: {
        Description: string
        Category: {
            Name: string
        }
    }
    createdAt: string
}

const OtherInventoryOutputs = () => {
    const { filter } = useParams<{ filter: string }>();
    const query = new URLSearchParams(useLocation().search)
    const startDate = query.get("startDate")
    const endDate = query.get("endDate")
    const { get, data, loading } = useForm<IOtherInventoryOutputs[]>([]);
    const getData = async () => {
        if (startDate && endDate) {
            get("/reports/othersInventoryOutputs?startDate=" + startDate + "&endDate=" + endDate)
        } else if (filter) {
            get("/reports/othersInventoryOutputs?filter=" + filter)
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
                    <div className="w-[800px]">
                        <h1 className="text-center text-2xl mt-3">Reporte de salidas de inventario</h1>
                        <div className="mx-2">
                            <small className="font-bold">
                                Filtrar por: {startDate && endDate ? "De " + startDate + " a " + endDate : msj[(filter ?? "")]}
                            </small>

                            <table>
                                <thead className="sticky top-0">
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Artículo</th>
                                        <th>Motivo</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data.map((d, i) => (
                                        <tr key={i}>
                                            <td>{dayjs(d.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                            <td className="text-left">{d.Article.Category.Name + " | " + d.Article.Description}</td>
                                            <td className="text-left">{d.Reason}</td>
                                            <td>{d.Quantity}</td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colSpan={3}>Total</td>
                                        <td>{data.reduce((a, b) => a + Number(b.Quantity), 0)}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    )
}

export default OtherInventoryOutputs