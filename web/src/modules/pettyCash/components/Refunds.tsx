import { useModal } from "@/modules/core/components/Modal"
import Table from "@/modules/core/components/Table"
import { useTable } from "@/modules/core/hooks/useTable"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { Button } from "@mui/material"
import dayjs from "dayjs"
import { AddRefund } from "./AddRefund"
import { pettyCashState } from "../states/DataState"
export interface IRefunds {
    id: string
    Amount: string
    Observation: string
    date: string
}
export const Refunds = () => {
    const hook = useTable<IRefunds>()
    const { RenderModal, setModalShow } = useModal()
    const {fetchData} = pettyCashState();
    const getData = () => {
        fetchData()
        hook.get("/refunds?page=1&pageSize=10")
    }

    return (
        <div>
            <AddRefund getData={getData} RenderModal={RenderModal} setModalShow={setModalShow} />
            <div className="shadow-lg rounded-lg p-3 pettyCashRefunds">
                <div className="flex justify-between items-center mb-1">
                    <h1 className="text-xl font-bold mb-2 my-auto">
                        Reembolsos
                    </h1>
                    <Button variant="contained" color="primary" onClick={() => setModalShow(true)}>
                        Nuevo
                    </Button>
                </div>
                <Table
                    v2
                    hook={hook}
                    ruta="refunds"
                    colunms={["Observación", "Monto", "Fecha"]}
                    body={() => (
                        hook.all?.data.map((data,key) => (
                            <tr key={key}>
                                <td>{data.Observation == "" ? "---" : data.Observation}</td>
                                <td>C$ {formatNumber(data.Amount)}</td>
                                <td>{dayjs(data.date).format("DD/MM/YYYY, hh:mm A")}</td>

                            </tr>
                        ))
                    )}
                />
            </div>
        </div>
    )
}
