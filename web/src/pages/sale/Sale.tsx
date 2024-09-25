import { Card } from "@/modules/core/components/Card"
import Table from "@/modules/core/components/Table"
import { useFetch } from "@/modules/core/hooks/useFetch"
import { useTable } from "@/modules/core/hooks/useTable"
import { TitleState } from "@/modules/core/states/title-state"
import alertBox from "@/modules/core/utils/alertBox"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { IResponseFetch } from "@/types"
import { IconButton, Tooltip } from "@mui/material"
import dayjs from "dayjs"
import { useEffect } from "react"
import { FaBan, FaEye } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { toast } from "sonner"

interface IPurchase {
  id: string
  code: string
  total: string
  date: string
  state: number
  discount: string
  neto: string
  costumer: {
    name: string
  }
}
const Sale = () => {
  const hook = useTable<IPurchase>();
  const { setTitle } = TitleState();
  const anular = async (id: string, numFac: string) => {
    alertBox("warning", "Anular venta: " + numFac.padStart(4, "0"), "¿Estás seguro?", "Aceptar", async () => {
      const res = await useFetch<IResponseFetch<unknown>>("/sales/" + id, "DELETE");
      if (res.status) {
        toast.success(res.msj)
        hook.get("/sales?page=1&pageSize=10")
      }else{
        toast.error(res.msj)
      }
    })
  }



  function limitDate(date: string) {
    const fechaLimite = new Date(date);
    fechaLimite.setDate(fechaLimite.getDate() + 2);
    return fechaLimite
  }
  useEffect(() => {
    setTitle("Ventas");
  }, [])
  return (
    <Card>
      <Table
        hook={hook}
        ruta="sales"
        colunms={["N° Factura", "Cliente", "Total", "Fecha", "Acciones"]}
        body={(urlEdit) =>
          hook.all?.data.map((d, i) => (
            <tr key={i} className={`${d.state == 0 && "bg-red-200"}`}>
              <td>{d.code.padStart(4, "0")}</td>
              <td>{d.costumer.name}</td>
              <td>C$ {formatNumber(d.total)}</td>
              <td>{dayjs(d.date).format("DD/MM/YYYY")}</td>
              <td>
                <div className="flex gap-1 justify-center items-center">
                  <Link to={urlEdit + d.id}>
                    <IconButton color="success" className="btnEdit">
                      <FaEye />
                    </IconButton>
                  </Link>
                  {d.state == 0 &&
                    <small className="text-red-700">
                      (Anulada)
                    </small>}
                  {d.state == 1 && ((limitDate(d.date) > new Date(Date.now()))) && (
                    <Tooltip title="Anular venta">
                      <IconButton color="error" className="btnEdit" onClick={() => anular(d.id, d.code)}>
                        <FaBan />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </td>
            </tr>
          ))
        }
      />

    </Card>
  )
}

export default Sale