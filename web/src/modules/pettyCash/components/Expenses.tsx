import Table from "@/modules/core/components/Table"
import { useTable } from "@/modules/core/hooks/useTable"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { Button, IconButton } from "@mui/material"
import dayjs from "dayjs"
import { FaTrash } from "react-icons/fa6"
import { AddExpenses } from "./AddExpenses"
import { useModal } from "@/modules/core/components/Modal"
import { useFetch } from "@/modules/core/hooks/useFetch"
import alertBox from "@/modules/core/utils/alertBox"
import { pettyCashState } from "../states/DataState"

export interface IExpenses {
    id: string
    NumInvoice: string
    Detail: string
    Amount: string
    Date: string
}
export const Expenses = () => {
    const { RenderModal, setModalShow } = useModal()
    const { fetchData } = pettyCashState();
    const getData = () => {
        fetchData()
        hook.get("/expenses?page=1&pageSize=10")
    }
    const hook = useTable<IExpenses>();
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
    return (
        <div>
            <AddExpenses getData={getData} RenderModal={RenderModal} setModalShow={setModalShow} />
            <div className="shadow-lg rounded-lg p-3 pettyCashExpenses">
                <div className="flex justify-between items-center mb-1">
                    <h1 className="text-xl font-bold mb-2 my-auto">
                        Egresos
                    </h1>
                    <Button variant="contained" color="primary" onClick={() => setModalShow(true)}>
                        Nuevo
                    </Button>
                </div>
                <Table
                    v2
                    hook={hook}
                    ruta="expenses"
                    colunms={["N° Factura", "Detalle", "Monto", "Fecha", "Acciones"]}
                    body={() => (
                        hook.all?.data.map((data) => (
                            <tr key={data.id}>
                                <td>{data.NumInvoice == "" ? "---" : data.NumInvoice}</td>
                                <td>{data.Detail}</td>
                                <td>C$ {formatNumber(data.Amount)}</td>
                                <td>{dayjs(data.Date).format("DD/MM/YYYY, hh:mm A")}</td>
                                <td>
                                    <IconButton color="error" onClick={() => deleteItem(data.id, data.Detail)}>
                                        <FaTrash />
                                    </IconButton>
                                </td>
                            </tr>
                        ))
                    )}
                />
            </div>
        </div>

    )
}
