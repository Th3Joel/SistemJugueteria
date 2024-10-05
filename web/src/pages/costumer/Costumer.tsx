import { Card } from "@/modules/core/components/Card";
import Table from "@/modules/core/components/Table";
import { useTable } from "@/modules/core/hooks/useTable";
import { TitleState } from "@/modules/core/states/title-state";
import { StateDriver, stepsTable } from "@/modules/core/utils/driver";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

export interface ICliente {
  id: string
  Name: string
  Phone: string
}
const Clientes = () => {
  const hook = useTable<ICliente>()
  const { setTitle } = TitleState();
  const {setSteps} = StateDriver(); 
  useEffect(() => {
    setTitle("Clientes");
    setSteps(stepsTable);
  }, [])
  return (
    <Card>
      <Table
        hook={hook}
        ruta="clientes"
        colunms={[
          "Nombre",
          "Celular",
          "Acciones",
        ]}
        body={(urlEdit, eliminar) =>
          hook.all?.data.map((d, i) => (
            <tr key={i}>
              <td>{d.Name}</td>
              <td>{d.Phone}</td>
              <td>
                <div className="flex gap-1 justify-center">
                  <Link to={urlEdit + d.id}>
                    <IconButton color="success" className="btnEdit">
                      <FaPen />
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
  );
};
export default Clientes;