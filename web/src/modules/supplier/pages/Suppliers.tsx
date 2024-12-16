import { Card } from "@/modules/core/components/Card.tsx";
import Table from "@/modules/core/components/Table.tsx";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useTable } from "@/modules/core/hooks/useTable.ts";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
import { StateDriver, stepsTable } from "@/modules/core/utils/driver";

export interface ISupplier {
    id: string
    Company:string
    Name: string
    Email: string
    Phone: string
    Address: string 
}

const Suppliers = () => {
    const hook = useTable<ISupplier>()
    const { setTitle } = TitleState();
    const {setSteps} = StateDriver();
    useEffect(() => {
        setTitle("Proveedores");
        setSteps(stepsTable);
    }, [])
    return (
        <Card>
            <Table
                hook={hook}
                ruta="suppliers"
                colunms={[
                    "Empresa",
                    "Nombre",
                    "Correo",
                    "Teléfono",
                    "Dirección",
                    "Acciónes",
                ]} 
                body={(urlEdit, eliminar) =>
                    hook.all?.data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.Company}</td>
                            <td>{d.Name}</td>
                            <td>{d.Email}</td>
                            <td>{d.Phone}</td>
                            <td>{d.Address}</td>

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
                                            eliminar(d.id, `Eliminar a: ${d.Name}`)
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
};
export default Suppliers;