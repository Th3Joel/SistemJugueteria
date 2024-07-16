import {useTable} from "@/modules/core/hooks/useTable.ts";
import {Card} from "@/modules/core/components/Card.tsx";
import Table from "@/modules/core/components/Table.tsx";
import {IconButton} from "@mui/material";
import {FaPencil, FaTrash} from "react-icons/fa6";
import {Link} from "react-router-dom";

interface ICategory {
    id:string
    Name:string
    Description:string
}

export const Category = () => {
    window.document.title = "Categorías"
    const hook = useTable<ICategory>()
    return (
        <Card>
            <Table
            hook={hook}
            ruta="categories"
            colunms={[
                "Nombre",
                "Descripción",
                "Acciones"
            ]}
            body={(urlEdit,eliminar) =>
                hook.all?.data.map((d, i) => (
                    <tr key={i}>
                        <td>{d.Name}</td>
                        <td>{d.Description}</td>
                        <td>
                            <div className="flex gap-1 justify-center">
                                <Link to={urlEdit+d.id}>
                                    <IconButton color="success">
                                        <FaPencil />
                                    </IconButton>
                                </Link>

                                <IconButton
                                    color="error"
                                    onClick={() =>
                                        eliminar(d.id, `Eliminar a: ${d.Name}`)
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