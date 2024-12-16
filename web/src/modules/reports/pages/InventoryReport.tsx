import { AuthState } from "@/modules/core/states/auth-state";
import { useForm } from "@/modules/core/hooks/useForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { IParams } from "@/types";
import { formatNumber } from "@/modules/core/utils/formatNumber";
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
          <div className="flex justify-between items-center">
            <h1 className="text-center text-2xl my-4">
              {id == "running-out"
                ? "Inventario próximo a agotarse"
                : "Inventario"}
            </h1>
            <h4>
              Costo del inventario: C$ {formatNumber(data.reduce((a, b) => a + (Number(b.purchase_price.toFixed(2)) * Number(b.stock)), 0)+"")}
            </h4>
          </div>
          <table>
            <thead>
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

                  Number(item.purchase_price) > 0 &&
                  <tr key={index}>
                    <td>{item.code}</td>
                    <td className="text-left">{item.description}</td>
                    <td className="text-left">{item.category.name}</td>
                    <td>C$ {formatNumber(item.purchase_price+"")}</td>
                    <td>C$ {formatNumber(item.sale_price+"")}</td>
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
      )}
    </div>
  );
};

export default InventoryReport;
