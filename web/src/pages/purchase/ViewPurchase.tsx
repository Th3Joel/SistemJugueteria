import { Card } from "@/modules/core/components/Card"
import { Drawer } from "@/modules/core/components/Drawer";
import { InputText } from "@/modules/core/components/Input";
import LoaderSmall from "@/modules/core/components/LoaderSmall";
import { TableV2 } from "@/modules/core/components/TableV2";
import { useForm } from "@/modules/core/hooks/useForm";
import { TitleState } from "@/modules/core/states/title-state";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import { PurchaseEditState } from "@/modules/purchase/states/purchase-edit-state";
import { TDetailErrors } from "@/modules/purchase/states/purchase-state";
import { IParams } from "@/types";
import { Button, Collapse, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaBoxOpen, FaCalendarDays, FaCircleChevronLeft, FaDatabase, FaFileInvoice, FaPeopleCarryBox, FaTrash } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom"

export interface IPurchase {
  code: string;
  total: number;
  state: number;
  date: string;
  supplier: {
    name: string;
  }
  articleBox: {
    description: string;
    purchasePrice: number;
    toysQuantity: number;
  }
  detail: IPurchaseDetail[];
}
export interface IPurchaseDetail {
  id: string;
  price: number;
  quantity: number;
  subtotal: number;
  article: {
    code: string;
    description: string;
  }
}

const Table: React.FC<{ data: IPurchase, isView?: boolean }> = ({ data, isView }) => {
  return (
    <div className="overflow-y-auto max-h-[300px] w-full">
      <table>
        <thead className="sticky top-0">
          <tr>
            <th>Código</th>
            <th>Artículo</th>
            <th>Precio compra</th>
            <th>Precio venta</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data.detail.map((d, i) => (
            <tr key={i}>
              <td>{d.article.code}</td>
              <td>{d.article.description}</td>
              <td>C$ {formatNumber((data.articleBox.purchasePrice / data.articleBox.toysQuantity) + "")}</td>
              <td>C$ {formatNumber(d.price + "")}</td>
              <td>{d.quantity}</td>
              <td>C$ {formatNumber(d.subtotal + "")}</td>
            </tr>
          ))}
          {
            isView &&
            <tr>
              <td colSpan={5}>Total</td>
              <td>C$ {formatNumber(data.total + "")}</td>
            </tr>
          }

        </tbody>
      </table>
    </div>
  )
}

const ViewPurchase = () => {
  const { id } = useParams<IParams>()
  const { setTitle } = TitleState();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false);
  const { detail, total, costArticle, errorsDetail, pass, errors, totalToysDetail, orgTotalToysDetail,
    deleteDetail, changeInput, setOrgTotal, setArticleBox, setCostArticle, setOrgTotalToysDetail, parseJson, checkErrors, clear } = PurchaseEditState();

  const { get, data, loading, post } = useForm<IPurchase>({
    code: "",
    total: 0,
    date: "",
    state: 0,
    supplier: {
      name: ""
    },
    articleBox: {
      description: "",
      purchasePrice: 0,
      toysQuantity: 0
    },
    detail: []
  })

  const handleErrors = (errors: TDetailErrors, field: string, id: string) => {
    function some() {
      return errors.some((x) => x.id === id && x.field === field);
    }
    function find() {
      return errors.find((x) => x.id === id && x.field === field)?.msj;
    }
    return {
      some,
      find,
    };
  };

  const handleSubmit = () => {

    if (pass && checkErrors()) {
      post("/purchases/" + id, parseJson(), true, true).then((res) => {
        if (res) {
          navigate("/purchases");
        }
      });
    }
  };

  useEffect(() => {
    //setDetail(data.detail)
    setOrgTotal(data.total)
    setArticleBox(data.articleBox)
    setCostArticle(data.articleBox.purchasePrice / data.articleBox.toysQuantity)
    setOrgTotalToysDetail(data.detail.reduce((a, b) => a + parseInt(b.quantity + ""), 0))
  }, [data])

  useEffect(() => {
    setTitle("Vizualizar compra");
    get("/purchases/" + id)
    return () => {
      clear();
    }
  }, [])

  return (
    <Card btnBack btnBackLink="/purchases">
      <Drawer open={showDrawer} setOpen={setShowDrawer}>
        <p className="text-gray-700 text-xl mt-4 text-center font-bold">Articulos registrados</p>
        <div className="flex justify-center">
          <div className="w-[800px]">
            <TableV2 isViewPurchase />
          </div>
        </div>
      </Drawer>
      <div className="flex justify-center">
        {
          loading ?
            <div className="p-6"><LoaderSmall /></div>
            :
            <div className="w-[800px]">
              <div className="flex flex-col items-center border rounded-md p-3 mx-3 my-5 shadow-lg relative">
                <header className="text-gray-700 mb-2">
                  ---- Datos de compra ----
                </header>
                <h1 className="absolute top-1 right-2 font-bold">
                  {data.state == 0 ?
                    <h1 className="text-red-700">
                      Incompleta
                    </h1>
                    :
                    <h1 className="text-green-700">
                      Completada
                    </h1>
                  }
                </h1>

                <section className="flex flex-row justify-center flex-wrap gap-4">
                  <span className="w-[200px]">
                    <InputText
                      label="N° Factura"
                      value={data.code.padStart(4, "0")}
                      icon={<FaFileInvoice />}
                    />
                  </span>
                  <span className="w-[200px]">
                    <InputText
                      label="Fecha"
                      value={dayjs(data.date).format("DD/MM/YYYY")}
                      icon={<FaCalendarDays />}
                    />
                  </span>
                  <span className="w-[200px]">
                    <InputText
                      label="Proveedor"
                      value={data.supplier.name}
                      icon={<FaPeopleCarryBox />}
                    />
                  </span>
                </section>
                {
                  data.state == 0 &&
                  <span className="mt-2">
                    <Button variant="contained" onClick={() => handleSubmit()}>
                      Actualizar
                    </Button>
                  </span>
                }

              </div>

              <div className="flex flex-col items-center border rounded-md p-3 mx-3 shadow-lg">
                <header className="text-gray-700 mb-2">
                  ---- Caja de artículos ----
                </header>
                <section className="flex flex-row justify-center flex-wrap gap-4">
                  <span className="w-[200px]">
                    <InputText
                      label="Caja de artículos"
                      value={data.articleBox.description}
                      icon={<FaBoxOpen />}
                    />
                  </span>
                  <span className="w-[200px]">
                    <InputText
                      label="Costo de caja"
                      value={formatNumber(data.articleBox.purchasePrice + "")}
                      icon={<p>C$</p>}
                    />
                  </span>
                  <span className="w-[200px]">
                    <InputText
                      label="Cantidad"
                      value={data.articleBox.toysQuantity + ""}
                      icon={<FaDatabase />}
                    />
                  </span>
                </section>
              </div>

              <div className="flex flex-col items-center border rounded-md px-3 mx-3 my-5 shadow-lg">
                {
                  data.state == 1 ?
                    <header className="text-gray-700 mt-2 mb-2">
                      ---- Detalle de compra ----
                    </header>
                    :
                    <div className="flex justify-between items-center items- w-full">

                      <header className="text-gray-700 text-lg">
                        Detalle de compra
                      </header>
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center cursor-pointer" onClick={() => setShowDetails((s) => !s)}>
                          <h1>Artículos anteriores</h1>
                          <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${showDetails ? "-rotate-90" : "rotate-0"}`} />
                        </div>
                        <Tooltip title="Agregar artículos">
                          <IconButton color="primary" onClick={() => setShowDrawer(true)}>
                            <FaPlusCircle size={30} />
                          </IconButton>
                        </Tooltip>
                      </div>

                    </div>
                }

                {
                  data.state == 1 ?
                    <Table data={data} isView />
                    :
                    <Collapse in={showDetails} className="w-full">
                      <Table data={data} />
                    </Collapse>
                }
                <div className={`flex w-full ${errors.totalToysDetail ? "justify-between" : "justify-center"}`}>
                  {
                    errors.totalToysDetail && <small className="text-red-600 text-md">{errors.totalToysDetail}</small>
                  }
                  {
                    data.state == 0 &&
                    <small className="text-[15px]">
                      Cantidad de articulos: {(totalToysDetail || 0) > 0 ? totalToysDetail : orgTotalToysDetail}
                    </small>
                  }

                </div>
                {
                  <div className="mb-3">
                    <hr className="border w-full" />

                    {detail.map((d, i) => (
                      <span key={i} className={`flex flex-col items-center ${i < (detail.length - 1) && 'border-b-[1px]'}`}>
                        <header className=" text-gray-600 flex items-center">
                          ({d.article.code}) {d.article.description}
                          <IconButton
                            color="error"
                            sx={{ marginLeft: "10px" }}
                            onClick={() => deleteDetail(d.id)}
                          >
                            <FaTrash className="text-[18px]" />
                          </IconButton>
                        </header>
                        <section className="flex gap-3 flex-wrap md:flex-nowrap justify-center mb-3">
                          <InputText
                            label="Precio compra"
                            value={formatNumber(costArticle + "")}
                            icon={<p>C$</p>}
                            iconSize="13px"
                          />
                          <InputText
                            label="Precio venta"
                            value={"" + d.price}
                            icon={<p>C$</p>}
                            iconSize="13px"
                            onChange={(e) => {
                              changeInput(e.target.value, "price", d.id);
                            }}
                            error={handleErrors(
                              errorsDetail,
                              "price",
                              d.id,
                            ).some()}
                            helperText={handleErrors(
                              errorsDetail,
                              "price",
                              d.id,
                            ).find()}
                          />
                          <InputText
                            label="Cantidad"
                            value={"" + d.quantity}
                            icon={<FaDatabase />}
                            onChange={(e) => {
                              changeInput(e.target.value, "quantity", d.id);
                            }}
                            error={handleErrors(
                              errorsDetail,
                              "quantity",
                              d.id,
                            ).some()}
                            helperText={handleErrors(
                              errorsDetail,
                              "quantity",
                              d.id,
                            ).find()}
                          />
                          <InputText
                            label="Subtotal"
                            value={formatNumber(d.subtotal + "")}
                            icon={<p>C$</p>}
                            iconSize="13px"
                            readonly
                          />
                        </section>
                      </span>
                    ))
                    }
                    <hr className="border-b-[1px] w-full" />

                  </div>

                }
                {
                  errors.isEmpty && <small className="text-red-600 text-md -mt-3 mb-3">{errors.isEmpty}</small>
                }
                {
                  data.state == 0 &&
                  <section className="flex justify-center mb-3">
                    <span className="w-[200px]">
                      <InputText
                        label="Total"
                        value={formatNumber(total + "")}
                        icon={<p>C$</p>}
                        iconSize="13px"
                        readonly
                      />
                    </span>
                  </section>
                }


              </div>
            </div>
        }
      </div>
    </Card>
  )
}

export default ViewPurchase 