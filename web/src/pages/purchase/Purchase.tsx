import { Card } from "@/modules/core/components/Card"
import Table from "@/modules/core/components/Table"
import { useTable } from "@/modules/core/hooks/useTable"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { IconButton } from "@mui/material"
import dayjs from "dayjs"
import { FaEye } from "react-icons/fa6"
import { Link } from "react-router-dom"

interface IPurchase{
  id:string
  code:string
  total:string
  date:string
  supplier:{
    name:string
  }
  articleBox:{
    description:string
  }
}
const Purchase = () => {
  const hook = useTable<IPurchase>();
  return (
    <Card>
     <Table 
      hook={hook}
      ruta="purchases"
      colunms={["N° Factura","Proveedor","Caja","Total","Fecha","Acciones"]}
      body={(urlEdit) =>
        hook.all?.data.map((d, i) => (
            <tr key={i}>
                <td>{d.code.padStart(4,"0")}</td>
                <td>{d.supplier.name}</td>
                <td>{d.articleBox.description}</td>
                <td>C$ {formatNumber(d.total)}</td>
                <td>{dayjs(d.date).format("DD/MM/YYYY")}</td>
                <td>
                    <div className="flex gap-1 justify-center">
                        <Link to={urlEdit+d.id}>
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

export default Purchase