import Table from "@/modules/core/components/Table";
import { useTable } from "@/modules/core/hooks/useTable";
import { TitleState } from "@/modules/core/states/title-state";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import userImg from "@/assets/user.png";

interface IUser {
  id: string;
  Name: string;
  Email: string;
  Role: string;
  Picture: string;
}
const Users = () => {
  const hook = useTable<IUser>();
  const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Configuración | Usuarios");
    }, [])
  return (
    <div className="animate__fadeIn">
      <Table
        hook={hook}
        ruta="settings/users"
        colunms={["Foto", "Nombre", "Correo", "Rol", "Acciones"]}
        body={(urlEdit, eliminar) =>
          hook.all?.data.map((d, i) => (
            <tr key={i}>
              <td className="flex justify-center">
                <img
                  src={d.Picture ? `/api/settings/users/picture/${d.Email}` : userImg  }
                  alt="Foto"
                  className="w-10 h-10 rounded-full"
                />
              </td> 
              <td>{d.Name}</td>
              <td>{d.Email}</td>
              <td>{d.Role === "admin" ? "Administrador" : d.Role === "vendedor" ? "Vendedor" : "Bodega"}</td>
              <td>
                <div className="flex gap-1 justify-center">
                  <Link to={urlEdit + d.id}>
                    <IconButton color="success" className="btnEdit">
                      <FaPen />
                    </IconButton>
                  </Link>
                  <IconButton
                    color="error"
                    onClick={() => eliminar(d.id, `Eliminar a: ${d.Name} `)}
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
    </div>
  );
};
export default Users;