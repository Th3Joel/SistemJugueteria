import { Card } from "@/modules/core/components/Card";
import Table from "@/modules/core/components/Table";
import { useTable } from "@/modules/core/hooks/useTable";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface ICliente {
  id:string
  nombre:string
  apellido:string
  celular:string
  correo:string
  direccion:string

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
          "Apellido",
          "Celular",
          "Correo",
          "Dirección",
          "Acciones",
        ]}
        body={(eliminar) =>
          hook.all?.data.map((d, i) => (
            <tr key={i}>
              <td>{d.nombre}</td>
              <td>{d.apellido}</td>
              <td>{d.celular}</td>
              <td>{d.correo}</td>
              <td>{d.direccion}</td>
              <td>
                <div className="flex gap-1 justify-center">
                  <Link to={`/clientes/editar/${d.id}`}>
                    <button>
                      <EditRounded />
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      eliminar(d.id, `Eliminar a: ${d.nombre} ${d.apellido}`)
                    }
                    className="bg-red-500 hover:bg-red-400"
                  >
                    <DeleteRounded />
                  </button>
                </div>
              </td>
            </tr>
          ))
        }
      />
    </Card>
  );
};
