import { Button, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa6"
import { useFetch } from "../core/hooks/useFetch"
import { formatNumber } from "../core/utils/formatNumber"
import { useModal } from "../core/components/Modal"
import alertBox from "../core/utils/alertBox"
import { AddExpenses } from "./AddExpenses"

interface ExpensesProps {
    isView?: boolean
}


export interface ExpensesData {
    id: string
    cashRegisterID: string
    numInvoice: string
    detail: string
    amount: string
}

export const Expenses: React.FC<ExpensesProps> = ({ isView }) => {
    const [data, setData] = useState<ExpensesData[]>([])
    const { RenderModal, setModalShow } = useModal()
 
    const getData = async () => {
        const res = await useFetch<{ status: boolean, find: ExpensesData[] }>("/expenses", "GET")
        if (res.status) {
            setData(res.find)
        }
    }
    
    const deleteItem = async (id: string, detail: string) => {
        alertBox(
            "warning",
            "¿Estás seguro?",
            "Eliminar egreso: " + detail,
            "Aceptar",
            async () => {
                const res = await useFetch<{ status: boolean }>(`/expenses/${id}`, "DELETE");
                if (res.status) {
                    getData()
                }
            }
        )

    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <AddExpenses getData={getData} RenderModal={RenderModal} setModalShow={setModalShow} />
            <div className={`flex items-center ${isView ? 'justify-center' : 'justify-between'}`}>
                <span className="font-bold text-xl text-gray-600">
                    {
                        isView ? 'Historial de egresos' : 'Egresos'
                    }
                </span>
                {
                    !isView &&
                    <Button variant="contained" onClick={() => setModalShow(true)}>
                        Nuevo
                    </Button>
                }

            </div>
            <table className="mt-3">
                <thead>
                    <tr>
                        <th>N° Factura</th>
                        <th>Detalle</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 ? <>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.numInvoice || "---"}</td>
                                        <td>{item.detail}</td>
                                        <td>C$ {formatNumber(item.amount)}</td>
                                        {
                                            !isView && <td className="w-[40px]">
                                                <IconButton color="error" onClick={() => deleteItem(item.id, item.detail)}>
                                                    <FaTrash className="text-lg" />
                                                </IconButton>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={2}>
                                Total
                            </td>
                            <td>
                                C$ {formatNumber(data.reduce((total, item) => total + parseFloat(item.amount), 0) + "")}
                            </td>
                        </tr>
                    </>
                        :
                        <tr>
                            <td colSpan={3}>
                                No hay elementos
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
