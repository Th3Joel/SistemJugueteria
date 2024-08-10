import {Card} from "@/modules/core/components/Card.tsx";
import Table from "@/modules/core/components/Table.tsx";
import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import {useTable} from "@/modules/core/hooks/useTable.ts";
import {FaPencil, FaTrash} from "react-icons/fa6";

interface IArticleBox {
    id:string
    Code:string
    Description:string
    ToysQuantity:string
    PurchasePrice:string
}
 
export const ArticleBox = () => {
    const hook = useTable<IArticleBox>()
    return (
        <Card>
            <Table
                hook={hook}
                ruta="articles-box"
                colunms={[
                    "Código",
                    "Descripción",
                    "Cantidad artículos",
                    "Precio",
                    "Acciones"
                ]}
                body={(urlEdit,eliminar) =>
                    hook.all?.data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.Code}</td>
                            <td>{d.Description}</td>
                            <td>{d.ToysQuantity}</td>
                            <td>C$ {d.PurchasePrice}</td>
                            <td>
                                <div className="flex gap-1 justify-center">
                                    <Link to={urlEdit+d.id}>
                                        <IconButton color="success" className="btnEdit">
                                            <FaPencil />
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        color="error"
                                        className="btnDelete"
                                        onClick={() =>
                                            eliminar(d.id, `Eliminar a: ${d.Description}`)
                                        }
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