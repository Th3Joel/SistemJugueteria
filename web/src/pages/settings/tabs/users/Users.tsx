import Table from "@/modules/core/components/Table";
import { useTable } from "@/modules/core/hooks/useTable";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

interface IUser {
  id: string;
  Name: string;
  Email: string;
  Role: string;
  Picture: string;
}
export const Users = () => {
  window.document.title = "Usuarios";
  const hook = useTable<IUser>();
  return (
    <Table
      hook={hook}
      ruta="settings/users"
      colunms={["Foto", "Nombre", "Correo", "Rol", "Acciones"]}
      body={(urlEdit,eliminar) =>
        hook.all?.data.map((d, i) => (
          <tr key={i}>
            <td>{d.Picture}</td>
            <td>{d.Name}</td>
            <td>{d.Email}</td>
            <td>{d.Role}</td>
            <td>
              <div className="flex gap-1 justify-center">
                <Link to={urlEdit+d.id}>
                  <IconButton color="success">
                    <EditRounded />
                  </IconButton>
                </Link>
                <IconButton
                  color="error"
                  onClick={() => eliminar(d.id, `Eliminar a: ${d.Name} `)}
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
