import { Card } from "@/modules/core/components/Card"
import { InputText, IOptions } from "@/modules/core/components/Input"
import { TableV2 } from "@/modules/core/components/TableV2"
import { useFetch } from "@/modules/core/hooks/useFetch"
import { PurchaseState } from "@/modules/purchase/zustand/purchase-state"
import { IconButton } from "@mui/material"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { FaBoxOpen, FaCalendarDays, FaDatabase, FaFileInvoice, FaPeopleCarryBox, FaTrash } from "react-icons/fa6"
interface ISelectArticleBox {
  id: string,
  code: string,
  description: string,
}
interface ISelectSupplier {
  id: string,
  name: string,
}
const Purchase = () => {
  const [select, setSelect] = useState<IOptions[]>([{ key: "", value: "" }]);
  const [select2, setSelect2] = useState<IOptions[]>([{ key: "", value: "" }]);
  const { detail, cost, setCost, total, deleteDetail, changeInput } = PurchaseState();

  const fetchData = async () => {
    let res = await useFetch<ISelectArticleBox[]>("/articles-box/select", "GET");
    if (res) {
      setSelect(res.map((data) => ({
        key: data.id,
        value: data.code + " - " + data.description
      })));
    }
    let res2 = await useFetch<ISelectSupplier[]>("/suppliers/select", "GET");
    if (res2) {
      setSelect2(res2.map((data) => ({
        key: data.id,
        value: data.name
      })));
    }
  }

  const fetchCost = (id: string) => {
    useFetch<{ status: boolean, find: number }>("/articles-box/cost/" + id, "GET").then((res) => {
      if (res.status) {
        setCost(parseFloat(res.find.toFixed(2)))
      }
    });

  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <Card>
      <div className="flex flex-grow">
        <div className="w-[60%] m-3">
          <div className="flex flex-col items-center border rounded-md p-1 pb-2">
            <header className="text-gray-500 my-1">
              Datos de compra
            </header>
            <section className="flex flex-row justify-center flex-wrap gap-4">
              <span className="w-[200px]">
                <InputText
                  label="N° Factura"
                  icon={<FaFileInvoice />}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Fecha"
                  type="date"
                  defaultValue={dayjs(Date.now()).format("YYYY-MM-DD")}
                  icon={<FaCalendarDays />}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Proveedor"
                  icon={<FaPeopleCarryBox />}
                  type="select"
                  value=""
                  options={select2}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Caja de artículos"
                  icon={<FaBoxOpen />}
                  type="select"
                  value=""
                  options={select}
                  valueChange={fetchCost}
                />
              </span>
            </section>
          </div>
          <div className="border rounded-md px-3 pb-2 mt-3">
            <header className="flex flex-col items-center text-gray-500 my-1">
              Detalle de compra
            </header>
            <hr />
            <section className="mb-2">
              {detail.length === 0 ?
                <h3 className="text-gray-600 text-center mt-3"> --- No hay elementos --- </h3> :
                detail.map((d, i) => (
                  <span key={i} className="flex flex-col items-center mb-2">
                    <header className="my-2 text-gray-600 flex items-center">
                      ({d.code}) {d.description}
                      <IconButton color="error" sx={{ marginLeft: "10px" }} onClick={() => deleteDetail(d.id)}>
                        <FaTrash className="text-[18px]" />
                      </IconButton>
                    </header>
                    <section className="flex gap-3 flex-wrap justify-center">
                      <span className="w-[145px]">
                        <InputText
                          label="Costo"
                          icon={<p>C$</p>}
                          value={"" + cost}
                          iconSize="13px"
                          readonly
                        />
                      </span>

                      <span className="w-[145px]">
                        <InputText
                          label="Precio"
                          value={"" + d.price}
                          icon={<p>C$</p>}
                          iconSize="13px"
                          onChange={(e) => {
                            changeInput(d.id, e.target.value, "price")
                          }}
                        />
                      </span>
                      <span className="w-[145px]">
                        <InputText
                          label="Cantidad"
                          value={"" + d.quantity}
                          icon={< FaDatabase />}
                          onChange={(e) => {
                            changeInput(d.id, e.target.value, "quantity")
                          }}
                        />
                      </span>

                      <span className="w-[145px]">
                        <InputText
                          label="Subtotal"
                          value={"" + d.subtotal}
                          icon={<p>C$</p>}
                          iconSize="13px"
                          readonly
                        />
                      </span>
                    </section>
                  </span>
                ))}

            </section>
            {detail.length !== 0 && <>
              <hr />
              <section className="flex justify-center mt-2">
                <span className="w-[200px]">
                  <InputText
                    label="Total"
                    value={"" + total}
                    icon={<p>C$</p>}
                    iconSize="13px"
                    readonly
                  />
                </span>
              </section>
            </>}

          </div>
        </div>


        <div className="w-[50%] m-3 ">
          <div className="border rounded-md p-2">
            <p className="text-gray-500 text-center">
              Articulos registrados
            </p>
            <TableV2 title="Artículos registrados" />

          </div>
        </div>
      </div>
    </Card>
  )
}

export default Purchase