import { Card } from "@/modules/core/components/Card"
import { useForm } from "@/modules/core/hooks/useForm";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"

interface IParams {
  [key: string]: string;
  id: string;
}

interface IPurchase {
  code: string;
  total: string;
  date: string;
  supplier: {
    name: string;
  }
  articleBox: {
    description: string;
    purchasePrice: string;
  }
  detail: IPurchaseDetail[];
}
interface IPurchaseDetail {
  id: string;
  price: string;
  quantity: string;
  subtotal: string;
  article: {
    code: string;
    description: string;
  }
}
const ViewPurchase = () => {
  const { id } = useParams<IParams>()
  const { get, data } = useForm<IPurchase>({
    code: "",
    total: "",
    date: "",
    supplier: {
      name: ""
    },
    articleBox: {
      description: "",
      purchasePrice: ""
    },
    detail: []
  })

  useEffect(() => {
    get("/purchases/" + id)
  }, [])
  return (
    <Card>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full m-3">
          <div className="flex flex-col items-center border rounded-md p-1 pb-2">
            <header className="text-gray-500 my-1">
              ----Datos de compra----
            </header>
            <section className="flex flex-row justify-center flex-wrap gap-4">
              <span className="w-[200px]">
                <h1>N° Factura:</h1>
                <h3 className="text-slate-600">{data.code.padStart(4, "0")}</h3>
              </span>
              <span className="w-[200px]">
                <h1>Fecha:</h1>
                <h3 className="text-slate-600">{dayjs(data.date).format("DD/MM/YYYY")}</h3>
              </span>
              <span className="w-[200px]">
                <h1>Proveedor:</h1>
                <h3 className="text-slate-600">{data.supplier.name}</h3>
              </span>
              <span className="w-[200px]">
                <h1>Caja de artículos:</h1>
                <h3 className="text-slate-600">{data.articleBox.description}</h3>
              </span>
            </section>
            <span className="flex items-center flex-col mt-3">
              Costo de caja de artículos:
              <p className="text-slate-600">
                C$ {parseFloat(data.articleBox.purchasePrice).toFixed(2)}
              </p>
            </span>
            <Link to="/purchases" className="mt-3">
              <Button variant="contained" color="primary">
                Atrás
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full m-3">
          <div className="flex flex-col items-center border rounded-md p-1 pb-2">
            <header className="text-gray-500 my-1">
              ----Detalle de compra----
            </header>
            <section>
              {data.detail.map((d, i) => (
                <span key={i} className="flex flex-col items-center mb-2">
                  <header className="my-2 text-gray-600 flex items-center">
                    ({d.article.code}) {d.article.description}
                  </header>
                  <section className="flex gap-3 flex-wrap justify-center">

                    <span className="w-[160px]">
                      <h1>Precio:</h1>
                      <h3>C$ {d.price}</h3>
                    </span>
                    <span className="w-[160px]">
                      <h1>Cantidad:</h1>
                      <h3>{d.quantity}</h3>
                    </span>

                    <span className="w-[160px]">
                      <h1>Subtotal:</h1>
                      <h3>C$ {d.subtotal}</h3>
                    </span>
                  </section>
                </span>
              ))}
            </section>

            <span>
              Total: C$ {data.total}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ViewPurchase 