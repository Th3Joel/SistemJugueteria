import { Card } from "@/modules/core/components/Card"
import { InputText, IOptions } from "@/modules/core/components/Input"
import LoaderBtn from "@/modules/core/components/LoaderBtn"
import { TableV2 } from "@/modules/core/components/TableV2"
import { useFetch } from "@/modules/core/hooks/useFetch"
import { useForm } from "@/modules/core/hooks/useForm"
import { PurchaseState, TDetailErrors } from "@/modules/purchase/zustand/purchase-state"
import { Button, IconButton } from "@mui/material"
import { useState, useEffect } from "react"
import { FaFileInvoice, FaCalendarDays, FaPeopleCarryBox, FaBoxOpen, FaTrash, FaDatabase } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

interface ISelectArticleBox {
  id: string,
  code: string,
  description: string,
}
interface ISelectSupplier {
  id: string,
  name: string,
}
interface IArticleBox {
  cost: number,
  toys_quantity: number,
  purchase_price: number,
}
const AddPurchase = () => {
  const [select, setSelect] = useState<IOptions[]>([{ key: "", value: "" }]);
  const [select2, setSelect2] = useState<IOptions[]>([{ key: "", value: "" }]);
  const { post, loading } = useForm<any>("")
  const navigate = useNavigate();
  const {
    date,
    code,
    articleBoxID,
    supplierID,
    detail,
    cost,
    costBox,
    total,
    errors,
    detailErrors,

    setCode,
    setCost,
    deleteDetail,
    changeInput,
    setCostBox,
    setQuantityBox,
    validate,
    clear,
    json
  } = PurchaseState();

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
    useFetch<{ status: boolean, find: IArticleBox }>("/articles-box/cost/" + id, "GET").then((res) => {
      if (res.status) {
        setCost(parseFloat(res.find.cost.toFixed(2)))
        setCostBox(parseFloat(res.find.purchase_price.toFixed(2)))
        setQuantityBox(res.find.toys_quantity)
      }
    });

    useFetch<{ status: boolean, find: number }>("/purchases/new-code", "GET").then((res) => {
      if (res.status) {
        setCode(res.find.toString())
      }
    })

  }

  const handleErrors = (errors: TDetailErrors, field: string, id: string) => {
    function some() {
      return errors.some(x => x.id === id && x.field === field)
    }
    function find() {
      return errors.find(x => x.id === id && x.field === field)?.msj
    }
    return {
      some,
      find
    }
  }
  const handleSubmit = () => {
    if (validate()) {
      console.log(json())
      post("/purchases", json(), false, true).then((res) => {
        if (res) {
          navigate("/purchases")
        }
      })
    }
  }
  useEffect(() => {
    fetchData();
    return () => {
      clear()
    }
  }, [])
  return (
    <Card>
      <div className="flex flex-grow">
        <div className="w-[60%] m-3">
          <div className="flex flex-col items-center border rounded-md p-1 pb-2">
            <header className="text-gray-500 my-1">
              ----Datos de compra----
            </header>
            <section className="flex flex-row justify-center flex-wrap gap-4">
              <span className="w-[200px]">
                <InputText
                  label="N° Factura"
                  icon={<FaFileInvoice />}
                  error={!!errors.code}
                  helperText={errors.code}
                  value={code}
                  onChange={(e) => {
                    changeInput(e.target.value, "code")
                  }}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Fecha"
                  type="date"
                  value={date}
                  error={!!errors.date}
                  helperText={errors.date}
                  icon={<FaCalendarDays />}
                  onChange={(e) => {
                    changeInput(e.target.value, "date")
                  }}

                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Proveedor"
                  icon={<FaPeopleCarryBox />}
                  type="select"
                  value={supplierID}
                  error={!!errors.supplierID}
                  helperText={errors.supplierID}
                  options={select2}
                  valueChange={(e) => {
                    if (e != "") changeInput(e, "supplierID")
                  }}
                />
              </span>

              <span className="min-w-[200px] w-auto">
                <InputText
                  label="Caja de artículos"
                  icon={<FaBoxOpen />}
                  type="select"
                  value={articleBoxID}
                  options={select}
                  valueChange={(e) => {
                    if (e != "") changeInput(e, "articleBoxID")
                    fetchCost(e)
                  }}
                  error={!!errors.articleBoxID}
                  helperText={errors.articleBoxID}
                />
              </span>

            </section>
            <h1 className="text-lg text-gray-600 mt-1">
              Costo de la caja: C$ {costBox}
            </h1>
            <Button variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                {loading ? <LoaderBtn /> : "Guardar compra"}
            </Button>

          </div>
          <div className="border rounded-md px-3 pb-2 mt-3">
            <header className="flex flex-col items-center text-gray-500">
              ----Detalle de compra----
            </header>
            <h1 className="text-lg text-center text-gray-600">
              Precio de compra: C$ {cost}
            </h1>
            {!!errors.articleBoxID && <h1 className="text-sm text-center text-red-500">
              Elige una cada de artículos
            </h1>}
            <hr />
            <section className="mb-2">
              {detail.length === 0 ?
                <h3 className={`text-gray-600 text-center mt-3 ${errors.empty && "text-red-500"}`}> --- No hay elementos --- </h3> :
                detail.map((d, i) => (
                  <span key={i} className="flex flex-col items-center mb-2">
                    <header className="my-2 text-gray-600 flex items-center">
                      ({d.code}) {d.description}
                      <IconButton color="error" sx={{ marginLeft: "10px" }} onClick={() => deleteDetail(d.id)}>
                        <FaTrash className="text-[18px]" />
                      </IconButton>
                    </header>
                    <section className="flex gap-3 flex-wrap justify-center">

                      <span className="w-[160px]">
                        <InputText
                          label="Precio venta"
                          value={"" + d.price} 
                          icon={<p>C$</p>}
                          iconSize="13px"
                          error={handleErrors(detailErrors, "price", d.id).some()}
                          helperText={handleErrors(detailErrors, "price", d.id).find()}
                          onChange={(e) => {
                            changeInput(e.target.value, "price", d.id)
                          }}
                        />
                      </span>
                      <span className="w-[160px]">
                        <InputText
                          label="Cantidad"
                          value={"" + d.quantity}
                          icon={< FaDatabase />}
                          onChange={(e) => {
                            changeInput(e.target.value, "quantity", d.id)
                          }}
                          error={handleErrors(detailErrors, "quantity", d.id).some()}
                          helperText={handleErrors(detailErrors, "quantity", d.id).find()}
                        />
                      </span>

                      <span className="w-[160px]">
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
            <TableV2 />

          </div>
        </div>
      </div>
    </Card>
  )
}

export default AddPurchase