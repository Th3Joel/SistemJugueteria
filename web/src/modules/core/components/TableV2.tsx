import { IconButton } from "@mui/material"
import React from "react"
import { FaCirclePlus } from "react-icons/fa6"
import Table from "./Table"
import { useTable } from "../hooks/useTable"
import { PurchaseState } from "@/modules/purchase/states/purchase-state"
import { formatNumber } from "../utils/formatNumber"


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

export const TableV2: React.FC = () => {
    const hook = useTable<IArticle>()
    const { pushDetail,exists } = PurchaseState();
    return (
        <div>
            <Table
                v2
                hook={hook}
                ruta="articles"
                colunms={[
                    "",
                    "Código",
                    "Descripción",
                    "Stock",
                    "Precio venta",
                ]}
                body={() =>
                    hook.all?.data.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <IconButton color="success" sx={{ marginX: "-8px" }} disabled={exists(d.id)} onClick={() => {
                                    pushDetail({
                                        id: d.id,
                                        code: d.Code,
                                        description: d.Description,
                                        price: ""+d.SalePrice,
                                        quantity: "",
                                        subtotal: "",
                                        stock: ""+d.Stock,
                                    })
                                }}>
                                    <FaCirclePlus className="text-[20px]" />
                                </IconButton>
                            </td>
                            <td>{d.Code}</td>
                            <td>{d.Description}</td>
                            <td className="text-lg font-extrabold">
                                {
                                    parseInt(d.Stock) <= parseInt(d.MinimunStock) ?
                                        <p className="text-red-600">{d.Stock}</p> :
                                        <p className="text-green-600">{d.Stock}</p>
                                }
                            </td>
                            <td>C$ {formatNumber(d.SalePrice)}</td>
                        </tr>
                    ))
                }
            />

        </div>
    )
}
