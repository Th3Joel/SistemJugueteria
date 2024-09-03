import { Card } from "@/modules/core/components/Card"
import Table from "@/modules/core/components/Table"
import { useTable } from "@/modules/core/hooks/useTable"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { IconButton } from "@mui/material"
import dayjs from "dayjs"
import { FaEye } from "react-icons/fa6"
import { Link } from "react-router-dom"

interface IPurchase {
  id: string
  code: string
  total: string
  date: string
  state: number
  discount: string
  neto: string
  costumer:{
    name:string
  }
}
const Sale = () => {
  const hook = useTable<IPurchase>();
  return (
    <Card>
      <Table
        hook={hook}
        ruta="sales"
        colunms={["N° Factura","Cliente", "Total", "Fecha", "Acciones"]}
        body={(urlEdit) =>
          hook.all?.data.map((d, i) => (
            <tr key={i}>
              <td>{d.code.padStart(4, "0")}</td>
              <td>{d.costumer.name}</td>
              <td>C$ {formatNumber(d.total)}</td>
              <td>{dayjs(d.date).format("DD/MM/YYYY")}</td>
              <td>
                <div className="flex gap-1 justify-center">
                  <Link to={urlEdit + d.id}>
                    <IconButton color="success" className="btnEdit">
                      <FaEye />
                    </IconButton>
                  </Link>
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