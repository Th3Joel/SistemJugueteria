import { Card } from "@/modules/core/components/Card.tsx";
import Table from "@/modules/core/components/Table.tsx";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useTable } from "@/modules/core/hooks/useTable.ts";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
import { StateDriver, stepsTable } from "@/modules/core/utils/driver";

interface IArticleBox {
    id: string
    Code: string
    Description: string
    ToysQuantity: string
    PurchasePrice: string
}
const ArticleBox = () => {
    const hook = useTable<IArticleBox>()
    const { setTitle } = TitleState();
    const { setSteps } = StateDriver();
    useEffect(() => {
        setTitle("Cajas de artículos");
        setSteps(stepsTable);
    }, [])
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
                body={(urlEdit, eliminar) =>
                    hook.all?.data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.Code}</td>
                            <td>{d.Description}</td>
                            <td>{d.ToysQuantity}</td>
                            <td>C$ {formatNumber(d.PurchasePrice)}</td>
                            <td>
                                <div className="flex gap-1 justify-center">
                                    <Link to={urlEdit + d.id}>
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

export default ArticleBox;