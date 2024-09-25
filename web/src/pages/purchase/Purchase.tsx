import { Card } from "@/modules/core/components/Card"
import Table from "@/modules/core/components/Table"
import { useTable } from "@/modules/core/hooks/useTable"
import { TitleState } from "@/modules/core/states/title-state"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { IconButton } from "@mui/material"
import dayjs from "dayjs"
import { useEffect } from "react"
import { FaEye, FaPen } from "react-icons/fa6"
import { Link } from "react-router-dom"

interface IPurchase {
  id: string
  code: string
  total: string
  date: string
  state: number
  supplier: {
    name: string
  }
  articleBox: {
    description: string
  }
}
const Purchase = () => {
  const hook = useTable<IPurchase>();
  const { setTitle } = TitleState();
  useEffect(() => {
    setTitle("Compras");
  }, [])
  return (
    <Card>
      <Table
        hook={hook}
        ruta="purchases"
        colunms={["N° Factura", "Proveedor", "Caja", "Total", "Fecha", "Estado", "Acciones"]}
        body={(urlEdit) =>
          hook.all?.data.map((d, i) => (
            <tr key={i}>
              <td>{d.code.padStart(4, "0")}</td>
              <td>{d.supplier.name}</td>
              <td>{d.articleBox.description}</td>
              <td>C$ {formatNumber(d.total)}</td>
              <td>{dayjs(d.date).format("DD/MM/YYYY")}</td>
              <td className="font-bold">{d.state == 0 ?
                <h1 className="text-red-700">
                  Incompleta
                </h1>
                :
                <h1 className="text-green-700">
                  Completada
                </h1>
              }</td>
              <td>
                <div className="flex gap-1 justify-center">
                  <Link to={urlEdit + d.id}>
                    <IconButton color="success" className="btnEdit">
                      {d.state == 0 ? <FaPen /> : <FaEye />}
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

export default Purchase