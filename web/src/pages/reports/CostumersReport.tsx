import { useForm } from "@/modules/core/hooks/useForm";
import { AuthState } from "@/modules/core/states/auth-state";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { ICliente } from "../costumer/Costumer";


const CostumersReport = () => {
  const { estado } = AuthState();
  const { get, data, loading } = useForm<ICliente[]>([]);
  useEffect(() => {
    if (estado) {
      get("/reports/costumers");
    }
  }, [])
  return (
    <div>

      {
        loading ? <CircularProgress />
          :
          <div className="w-[800px]">

            <h1 className="text-center text-2xl mt-3">
              Clientes registrados
            </h1>
            <div className="mt-5">

              <table>
                <thead className="sticky top-0">
                  <tr>
                    <th>Nombre</th>
                    <th>Contacto</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.length === 0 ? <tr><td colSpan={6}>No hay elementos</td></tr> :
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.Name}</td>
                          <td>{item.Phone}</td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
      }

    </div>
  )
}

export default CostumersReport