import Table from "@/modules/core/components/Table";
import { useTable } from "@/modules/core/hooks/useTable";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}
export const Users = () => {
  window.document.title = "Usuarios";
  const hook = useTable<IUser>();
  return (
    <Table
      hook={hook}
      ruta="settings/users"
      colunms={["Foto", "Nombre", "Correo", "Rol", "Acciones"]}
      body={(eliminar) =>
        hook.all?.data.map((d, i) => (
          <tr key={i}>
            <td>{d.picture}</td>
            <td>{d.name}</td>
            <td>{d.email}</td>
            <td>{d.role}</td>
            <td>
              <div className="flex gap-1 justify-center">
                <Link to={`/settings/users/editar/${d.id}`}>
                  <IconButton color="success">
                    <EditRounded />
                  </IconButton>
                </Link>
                <IconButton
                  color="error"
                  onClick={() => eliminar(d.id, `Eliminar a: ${d.name} `)}
                >
                  <DeleteRounded />
                </IconButton>
              </div>
            </td>
          </tr>
        ))
      }
    />
  );
};
