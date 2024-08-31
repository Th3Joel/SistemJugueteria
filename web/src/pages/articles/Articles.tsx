import { Card } from "@/modules/core/components/Card"
import Table from "@/modules/core/components/Table"
import { useTable } from "@/modules/core/hooks/useTable"
import { formatNumber } from "@/modules/core/utils/formatNumber"
import { IconButton } from "@mui/material"

import { FaPencil, FaTrash } from "react-icons/fa6"
import { Link } from "react-router-dom"


interface IArticle {
    id: string
    Code: string
    Description: string
    State: string
    Stock: string
    SalePrice: string
    PurchasePrice: string
    Profit: string
    Category: {
        Name: string
    },
    MinimunStock: string
}

const Articles = () => {
    const hook = useTable<IArticle>()
    return (
        <Card>
            <Table
                hook={hook}
                ruta="articles"
                colunms={[
                    "Código",
                    "Descripción",
                    "Categoría",
                    "Stock",
                    "Precio venta",
                    "Acciones"
                ]}
                body={(urlEdit, eliminar) =>
                    hook.all?.data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.Code}</td>
                            <td>{d.Description}</td>
                            <td>{d.Category.Name}</td>
                            <td className="text-lg font-extrabold">
                                {
                                    parseInt(d.Stock) <= parseInt(d.MinimunStock) ?
                                        <p className="text-red-600">{d.Stock}</p> :
                                        <p className="text-green-600">{d.Stock}</p>
                                }
                            </td>
                            <td>C$ {formatNumber(d.SalePrice)}</td>
                            <td>
                                <div className="flex gap-1 justify-center">
                                    <Link to={urlEdit + d.id}>
                                        <IconButton color="success" className="btnEdit">
                                            <FaPencil />
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            eliminar(d.id, `Eliminar a: ${d.Description}`)
                                        }
                                        className="btnDelete"
                                    >
                                        <FaTrash />
                                    </IconButton>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            />
        </Card>
    )
}

export default Articles;