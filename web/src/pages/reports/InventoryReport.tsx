import { AuthState } from "@/modules/core/states/auth-state";
import { useForm } from "@/modules/core/hooks/useForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { IParams } from "@/types";
interface IInventoryReport {
  code: string;
  description: string;
  sale_price: number;
  purchase_price: number;
  stock: number;
  category: {
    name: string;
  };
  min_stock: number;
}

const InventoryReport = () => {
  const { id } = useParams<IParams>();
  const { estado } = AuthState();
  const { get, data, loading } = useForm<IInventoryReport[]>([]);
  useEffect(() => {
    if (estado) {
      get("/reports/inventory" + (id == "running-out" ? "/running-out" : ""));
    }
  }, []);
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-[800px]">
          <div className="print-container">
            <h1 className="text-center text-2xl my-4">
              {id == "running-out"
                ? "Inventario próximo a agotarse"
                : "Inventario"}
            </h1>
              <table>
                <thead className="sticky top-0">
                  <tr>
                    <th>Código</th>
                    <th>Artículo</th>
                    <th>Categoría</th>
                    <th>Precio compra</th>
                    <th>Precio venta</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={6}>No hay elementos</td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.code}</td>
                        <td>{item.description}</td>
                        <td>{item.category.name}</td>
                        <td>C$ {item.purchase_price.toFixed(2)}</td>
                        <td>C$ {item.sale_price.toFixed(2)}</td>
                        <td
                          className={
                            "font-bold " +
                            (item.stock <= item.min_stock
                              ? "text-red-500"
                              : "text-green-600")
                          }
                        >
                          {item.stock}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryReport;
