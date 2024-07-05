import { Card } from "@/modules/core/components/Card";
import Table from "@/modules/core/components/Table";
import { useTable } from "@/modules/core/hooks/useTable";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import {  IconButton } from "@mui/material";
import { Link } from "react-router-dom";

interface ICliente {
  id:string
  name:string
  surname:string
  phone:string
  email:string
  address:string
}
export const Clientes = () => {
  window.document.title = "Clientes"
const hook = useTable<ICliente>()
  return (
    <Card>
      <Table
        hook={hook}
        ruta="clientes"
        colunms={[
          "Nombre",
          "Celular",
          "Correo",
          "Dirección",
          "Acciones",
        ]}
        body={(urlEdit,eliminar) =>
          hook.all?.data.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
              <td>{d.address}</td>
              <td>
                <div className="flex gap-1 justify-center">
                  <Link to={urlEdit+d.id}>
                    <IconButton color="success">
                      <EditRounded />
                    </IconButton>
                  </Link>
                  <IconButton
                  color="error"
                    onClick={() =>
                      eliminar(d.id, `Eliminar a: ${d.name} ${d.surname ?? ""}`)
                    }
                  >
                    <DeleteRounded />
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
