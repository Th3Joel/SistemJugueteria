import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"
import { IPurchase } from "../purchase/ViewPurchase";
import { useForm } from "@/modules/core/hooks/useForm";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";
import { formatNumber } from "@/modules/core/utils/formatNumber";

const PurchasesReport = () => {
  const { filter } = useParams<{ filter: string }>();
  const query = new URLSearchParams(useLocation().search)
  const startDate = query.get("startDate")
  const endDate = query.get("endDate")
  const { get, data, loading } = useForm<IPurchase[]>([]);
  const getData = async () => {
      if (startDate && endDate) {
          get("/reports/purchases?startDate=" + startDate + "&endDate=" + endDate)
      } else if (filter) {
          get("/reports/purchases?filter=" + filter)
      }
  }
  const msj: Record<string, string> = {
      day: `De este día`,
      week: `De esta semana`,
      month: `De este mes (${dayjs().locale("es").format("MMMM")})`,
      year: `De este año ${dayjs().format("YYYY")}`
  }
  useEffect(() => {
      getData() 
  }, [])
  return (
      <div>
          {
              loading ? <CircularProgress />
                  :
                  <div className="w-[800px]">
                          <h1 className="text-center text-2xl mt-3">Reporte de compras por periodo</h1>
                          <div className="mx-2">
                              <small className="font-bold">
                                  Filtrar por: {startDate && endDate ? "De " + startDate + " a " + endDate : msj[(filter ?? "")]}
                              </small>
                                  <table>
                                      <thead className="sticky top-0">
                                          <tr>
                                              <th>N° Factura</th>
                                              <th>Fecha</th>
                                              <th>Proveedor</th>
                                              <th>Caja</th>
                                              <th>Total</th>
                                              <th>Estado</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {data.map((d, i) => (
                                              <tr key={i}>
                                                  <td>{d.code.padStart(4, "0")}</td>
                                                  <td>{dayjs(d.date).format("DD/MM/YYYY")}</td>
                                                  <td className="text-left">{d.supplier.name}</td>
                                                  <td className="text-left">{d.articleBox.description}</td>
                                                  <td>C$ {formatNumber(d.total+"")}</td>
                                                  <td className={`font-bold ${d.state == 0 ? "text-red-500" : "text-green-600"}`}>{d.state == 0 ? "Incompleta" : "Completa"}</td>
                                              </tr>
                                          ))}

                                          <tr>
                                            <td colSpan={4}>Total</td>
                                            <td>C$ {formatNumber(data.reduce((a, b) => a + Number(b.total.toFixed(2)), 0) + "")}</td>
                                            <td></td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                  </div>
          }
      </div>
  )
}

export default PurchasesReport