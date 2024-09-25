import { useForm } from "@/modules/core/hooks/useForm";
import { IParams } from "@/types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ISaleView } from "../sale/ViewSale";
import { CircularProgress } from "@mui/material";
import { InputText } from "@/modules/core/components/Input";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import { FaCalendarDays, FaFileInvoice, FaPeopleCarryBox } from "react-icons/fa6";
import dayjs from "dayjs";
import { AuthState } from "@/modules/core/states/auth-state";

const SpecificSale = () => {
    const { id } = useParams<IParams>();
    const { company } = AuthState();
    const { get, data, loading } = useForm<ISaleView>({
        code: "",
        total: "",
        neto: "",
        cashDollar: "",
        cashCordoba: "",
        discountTotal: "",
        exchange: "",
        state: 0,
        date: "",
        costumer: {
            name: ""
        },
        detail: []
    });
    useEffect(() => {
        get("/reports/sale/" + id)
    }, [])
    return (
        <div>
            {
                loading ? <CircularProgress />
                    :
                    <div className="w-[800px]">
                        <div className="print-container">

                            <h1 className="text-center text-2xl mt-3">Reporte de venta</h1>
                            <div className="mt-5">
                                <div className="w-full">
                                    <div className="flex flex-col items-center border rounded-md p-3 mx-3 my-5 shadow-lg">
                                        <header className="text-gray-700 mb-2">
                                            ---- Datos de venta ----
                                        </header>
                                        <section className="flex flex-row justify-center flex-wrap gap-4">
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="N° Factura"
                                                    value={data.code.padStart(4, "0")}
                                                    icon={<FaFileInvoice />}
                                                />
                                            </span>
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Fecha"
                                                    value={dayjs(data.date).format("DD/MM/YYYY")}
                                                    icon={<FaCalendarDays />}
                                                />
                                            </span>
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Cliente"
                                                    value={data.costumer.name}
                                                    icon={<FaPeopleCarryBox />}
                                                />
                                            </span>
                                        </section>

                                    </div>

                                    <div className="flex flex-col items-center border rounded-md p-3 mx-3 my-5 shadow-lg">
                                        <header className="text-gray-700 mb-2">
                                            ---- Detalle de venta ----
                                        </header>

                                        <div className="overflow-y-auto max-h-[300px] w-full">
                                            <table>
                                                <thead className="sticky top-0">
                                                    <tr>
                                                        <th>Código</th>
                                                        <th>Artículo</th>
                                                        <th>Precio</th>
                                                        <th>Cantidad</th>
                                                        <th>Subtotal</th>
                                                        <th>Descuento</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {data.detail.map((d, i) => (
                                                        <tr key={i}>
                                                            <td>{d.article.code}</td>
                                                            <td>{d.article.description}</td>
                                                            <td>C$ {formatNumber(d.article.price)}</td>
                                                            <td>{d.quantity}</td>
                                                            <td>C$ {formatNumber(d.subtotal)}</td>
                                                            <td>{d.discount == "0" ? "---" : "C$ " + formatNumber(d.discount)}</td>
                                                        </tr>
                                                    ))}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center border rounded-md p-3 mx-3 my-5 shadow-lg">
                                        <header className="text-gray-700 mb-2">
                                            ---- Totales ----
                                        </header>
                                        <section className="flex flex-row justify-center flex-wrap gap-4">
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Descuento"
                                                    value={data.discountTotal == "0" ? "---" : formatNumber(data.discountTotal)}
                                                    icon={<p>C$</p>}
                                                />
                                            </span>
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Neto"
                                                    value={formatNumber(data.neto)}
                                                    icon={<p>C$</p>}
                                                />
                                            </span>
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Total"
                                                    value={formatNumber(data.total)}
                                                    icon={<p>C$</p>}
                                                />
                                            </span>
                                        </section>
                                    </div>

                                    <div className="flex flex-col items-center border rounded-md p-3 mx-3 my-5 shadow-lg">
                                        <header className="text-gray-700 mb-2">
                                            ---- Pago del cliente ----
                                        </header>
                                        <section className="flex flex-row justify-center flex-wrap gap-4">
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Efectivo en dólares"
                                                    value={data.cashDollar == "0" ? "---" : formatNumber(data.cashDollar)}
                                                    icon={<p>$</p>}
                                                />
                                            </span>
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Efectivo en córdobas"
                                                    value={data.cashCordoba == "0" ? "---" : formatNumber(data.cashCordoba)}
                                                    icon={<p>C$</p>}
                                                />
                                            </span>
                                            <span className="w-[200px]">
                                                <InputText
                                                    label="Cambio"
                                                    value={formatNumber(data.exchange)}
                                                    icon={<p>C$</p>}
                                                />
                                            </span>
                                        </section>
                                        <small className="mt-1">Precio dolar: C$ {formatNumber(company.PriceDollar)}</small>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default SpecificSale