import { InputText } from "@/modules/core/components/Input"
import { useForm } from "@/modules/core/hooks/useForm"
import { IParams } from "@/types"
import dayjs from "dayjs"
import { useEffect } from "react"
import { FaFileInvoice, FaCalendarDays, FaPeopleCarryBox, FaBoxOpen, FaDatabase } from "react-icons/fa6"
import { useParams } from "react-router-dom"
import { IPurchase } from "../../purchase/pages/ViewPurchase"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { CircularProgress } from "@mui/material"

const SpecificPurchase = () => {
    const { id } = useParams<IParams>()
    const { get, data, loading } = useForm<IPurchase>({
        code: "",
        total: 0,
        date: "",
        purchase_price: 0,
        toys_quantity: 0,
        state: 0,
        supplier: {
            name: ""
        },
        articleBox: {
            description: "",
            purchasePrice: 0,
            toysQuantity: 0
        },
        detail: []
    })

    useEffect(() => {
        get("/reports/purchase/" + id)
    }, [])
    return (
        <div>
            {
                loading ?
                    <CircularProgress />
                    :
                    <div className="w-[800px]">
                        <h1 className="text-center text-2xl mt-3">Reporte de compra</h1>
                            <div className="flex flex-col items-center border rounded-md p-3 mx-3 my-5 shadow-lg">
                                <header className="text-gray-700 mb-2">
                                    ---- Datos de compra ----
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
                                            label="Proveedor"
                                            value={data.supplier.name}
                                            icon={<FaPeopleCarryBox />}
                                        />
                                    </span>
                                </section>
                            </div>

                            <div className="flex flex-col items-center border rounded-md p-3 mx-3 shadow-lg">
                                <header className="text-gray-700 mb-2">
                                    ---- Caja de artículos ----
                                </header>
                                <section className="flex flex-row justify-center flex-wrap gap-4">
                                    <span className="w-[200px]">
                                        <InputText
                                            label="Caja de artículos"
                                            value={data.articleBox.description}
                                            icon={<FaBoxOpen />}
                                        />
                                    </span>
                                    <span className="w-[200px]">
                                        <InputText
                                            label="Costo de caja"
                                            value={formatNumber(data.purchase_price+"")}
                                            icon={<p>C$</p>}
                                        />
                                    </span>
                                    <span className="w-[200px]">
                                        <InputText
                                            label="Cantidad"
                                            value={data.toys_quantity+""}
                                            icon={<FaDatabase />}
                                        />
                                    </span>
                                </section>
                            </div>
                            <div className="flex flex-col items-center border rounded-md p-3 mx-3 my-5 shadow-lg">
                                <header className="text-gray-700 mb-2">
                                    ---- Detalle de compra ----
                                </header>
                                <div className="overflow-y-auto max-h-[300px] w-full">

                                    <table>
                                        <thead className="sticky top-0">
                                            <tr>
                                                <th>Código</th>
                                                <th>Artículo</th>
                                                <th>Precio compra</th>
                                                <th>Precio venta</th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.detail.map((d, i) => (
                                                <tr key={i}>
                                                    <td>{d.article.code}</td>
                                                    <td>{d.article.description}</td>
                                                    <td>C$ {formatNumber((Number(data.purchase_price) / Number(data.toys_quantity)) + "")}</td>
                                                    <td>C$ {formatNumber(d.article.price+"")}</td>
                                                    <td>{d.quantity}</td>
                                                    <td className="text-nowrap">C$ {formatNumber(d.subtotal+"")}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan={5}>Total</td>
                                                <td className="text-nowrap">C$ {formatNumber(data.total+"")}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default SpecificPurchase