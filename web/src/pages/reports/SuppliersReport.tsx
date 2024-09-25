import { useForm } from "@/modules/core/hooks/useForm";
import { AuthState } from "@/modules/core/states/auth-state";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { ISupplier } from "../supplier/Suppliers";

const SuppliersReport = () => {
  const { estado } = AuthState();
  const { get, data, loading } = useForm<ISupplier[]>([]);
  useEffect(() => {
    if (estado) {
      get("/reports/suppliers");
    }
  }, [])
  return (
    <div>

        {
          loading ? <CircularProgress />
            :
            <div className="w-[800px]">
              <div className="print-container">

                <h1 className="text-center text-2xl mt-3">
                  Proveedores registrados
                </h1>
                <div className="mt-5">

                  <table>
                    <thead className="sticky top-0">
                      <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Contacto</th>
                        <th>Dirección</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.length === 0 ? <tr><td colSpan={6}>No hay elementos</td></tr> :
                          data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.Name}</td>
                              <td>{item.Email}</td>
                              <td>{item.Phone}</td>
                              <td>{item.Address}</td>
                            </tr>
                          ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        }

      </div>
  )
}

export default SuppliersReport 