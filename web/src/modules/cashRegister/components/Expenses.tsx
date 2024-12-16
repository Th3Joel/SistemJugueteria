import { Button, IconButton } from "@mui/material"
import { FaTrash } from "react-icons/fa6"
import { useFetch } from "@/modules/core/hooks/useFetch"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { useModal } from "@/modules/core/components/Modal"
import alertBox from "@/modules/core/utils/alertBox"
import { AddExpenses } from "@/modules/pettyCash/components/AddExpenses"
import CashRegisterState, { IExpenses } from "@/modules/cashRegister/states/cashRegisterState"
import { useEffect, useState } from "react"

interface ExpensesProps {
    isView?: boolean
    expenses?: IExpenses[]
}


export interface ExpensesData {
    id: string
    cashRegisterID: string
    NumInvoice: string
    Detail: string
    Amount: string
}

export const Expenses: React.FC<ExpensesProps> = ({ isView,expenses }) => {
    const { expenses: dat, fetchData } = CashRegisterState()
    const [data, setData] = useState<IExpenses[]>([])
    const { RenderModal, setModalShow } = useModal()

    // const getData = async () => {
    //     const res = await useFetch<{ status: boolean, find: ExpensesData[] }>("/expenses/all", "GET")
    //     if (res.status) {
    //         setData(res.find)
    //     }
    // }

    const deleteItem = async (id: string, detail: string) => {
        alertBox(
            "warning",
            "¿Estás seguro?",
            "Eliminar egreso: " + detail,
            "Aceptar",
            async () => {
                const res = await useFetch<{ status: boolean }>(`/expenses/${id}`, "DELETE");
                if (res.status) {
                    fetchData()
                }
            }
        )

    } 

    // useEffect(() => {
    //     if (!isView) {
    //         getData()
    //     }
    // }, [])
    useEffect(() => {
        if (isView) {
            setData(expenses || [])
        }else{
            setData(dat)
        }

    }, [expenses,dat])
    return ( 
        <div>
            <AddExpenses isCash getData={fetchData} RenderModal={RenderModal} setModalShow={setModalShow} />
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
            {data.length !== 0 ?
                <table className="mt-3">
                    <thead>
                        <tr>
                            <th>N° Factura</th>
                            <th>Detalle</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.NumInvoice || "---"}</td>
                                        <td>{item.Detail}</td>
                                        <td>C$ {formatNumber(item.Amount)}</td>
                                        {
                                            !isView && <td className="w-[40px]">
                                                <IconButton color="error" onClick={() => deleteItem(item.id, item.Detail)}>
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
                                C$ {formatNumber(data.reduce((total, item) => total + parseFloat(item.Amount), 0) + "")}
                            </td>
                        </tr>

                    </tbody>
                </table>
                :
                <h1 className="text-center text-gray-600 font-bold mt-2">
                    ---- No hay datos ----
                </h1>
            }
        </div>
    )
}
