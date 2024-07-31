import {useTable} from "@/modules/core/hooks/useTable.ts";
import Table from "@/modules/core/components/Table.tsx";
import {Card} from "@/modules/core/components/Card.tsx";
import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import {FaPencil, FaTrash} from "react-icons/fa6";

interface IPriceCategory {
    id: string;
    Code: string;
    Name: string;
    Description: string;
    ArticlesBox: IArticleBox;
    Stock: number;
    SalePrice: number;
}

interface IArticleBox {
    id: string;
    code: string;
}

export const PriceCategory = () => {
    window.document.title = "Precio de articulos"
    const hook = useTable<IPriceCategory>()
    return (
       <Card>
        <Table
            ruta={"price-categories"}
            hook={hook}
            colunms={["Código", "Nombre", "Descripción", "Caja", "Artículos","Precio", "Acciones"]}
            body={(urlEdit, eliminar) =>
            hook.all?.data.map((d, i) => (
                <tr key={i}>
                    <td>{d.Code}</td>
                    <td>{d.Name}</td>
                    <td>{d.Description}</td>
                    <td>{d.ArticlesBox.code}</td>
                    <td>{d.Stock}</td>
                    <td>C$ {d.SalePrice}</td>
                    <td>
                        <div className="flex gap-1 justify-center">
                            <Link to={urlEdit + d.id}>
                                <IconButton color="success">
                                    <FaPencil/>
                                </IconButton>
                            </Link>
                            <IconButton
                                color="error"
                                onClick={() =>
                                    eliminar(d.id, `Eliminar a: ${d.Name}`)
                                }
                            >
                                <FaTrash/>
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