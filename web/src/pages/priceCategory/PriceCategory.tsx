import {useTable} from "@/modules/core/hooks/useTable.ts";
import Table from "@/modules/core/components/Table.tsx";
import {Card} from "@/modules/core/components/Card.tsx";
import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import {FaPencil, FaTrash} from "react-icons/fa6";

interface IPriceCategory {
    id: string;
    code: string;
    name: string;
    description: string;
    articlesBox: IArticleBox;
    stock: number;
    salePrice: number;
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
                    <td>{d.code}</td>
                    <td>{d.name}</td>
                    <td>{d.description}</td>
                    <td>{d.articlesBox.code}</td>
                    <td>{d.stock}</td>
                    <td>C$ {d.salePrice}</td>
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
                                    eliminar(d.id, `Eliminar a: ${d.name}`)
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