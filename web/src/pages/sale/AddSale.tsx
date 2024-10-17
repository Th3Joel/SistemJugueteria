import { ReqOpenCash } from "@/modules/cashRegister/ReqOpenCash";
import CashRegisterState from "@/modules/cashRegister/states/cashRegisterState";
import { Card } from "@/modules/core/components/Card";
import { Drawer } from "@/modules/core/components/Drawer";
import { InputText, IOptions } from "@/modules/core/components/Input";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import LoaderSmall from "@/modules/core/components/LoaderSmall";
import { useModal } from "@/modules/core/components/Modal";
import { TableV2 } from "@/modules/core/components/TableV2";
import { useFetch } from "@/modules/core/hooks/useFetch";
import { useForm } from "@/modules/core/hooks/useForm";
import { AuthState } from "@/modules/core/states/auth-state";
import { TitleState } from "@/modules/core/states/title-state";
import { StateDriver, stepsAddSale } from "@/modules/core/utils/driver";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import {
  PurchaseState,
  TDetailErrors,
} from "@/modules/purchase/states/purchase-state";
import { Button, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  FaFileInvoice,
  FaCalendarDays,
  FaTrash,
  FaDatabase,
  FaUserGroup,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AddCostumer } from "./AddCostumer";

interface ISelectCostumer {
  id: string;
  name: string;
}

const AddSale = () => {
  const {RenderModal,setModalShow} = useModal();
  const { setSteps } = StateDriver();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const { setTitle } = TitleState();
  const { company } = AuthState()
  const { verify, state } = CashRegisterState();
  const [loadCash, setLoadCash] = useState(true);
  const [select2, setSelect2] = useState<IOptions[]>([{ key: "", value: "" }]);
  const { post, loading } = useForm<string>("");
  const navigate = useNavigate();
  const {
    date,
    code,
    costumerID,
    detail,
    total,
    valResto,
    errors,
    detailErrors,
    exchange,
    setCostDollar,
    deleteDetail,
    changeInput,
    validate,
    clear,
    setCode,
    json,
    neto,
    discountTotal,
    setIsSale
  } = PurchaseState();

  const fetchData = async () => {

    const res2 = await useFetch<ISelectCostumer[]>("/clientes/select", "GET");
    if (res2) {
      setSelect2(
        res2.map((data) => ({
          key: data.id,
          value: data.name,
        })),
      );
    }

    const res = await useFetch<{ status: boolean, find: number }>("/sales/newCode", "GET");
    if (res.status) {
      setCode("" + res.find);
    }
  };


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
    if (validate()) {
      //console.log(json());
      post("/sales", json(), false, true).then((res) => {
        if (res) {
          navigate("/sales");
        }
      });
    }
  };

  useEffect(() => {
    setTitle("Agregar venta");
    setCostDollar(company.PriceDollar)
    verify().then(() => {
      setLoadCash(false)
    });
    setIsSale(true)
    fetchData();
    setSteps(stepsAddSale);
    //Cuando se desmonta el componente
    return () => {
      clear();
    };
  }, []);

  return (
    <Card btnBack btnBackLink="/sales">
      <AddCostumer getData={fetchData} RenderModal={RenderModal} setModalShow={setModalShow} />
      {
        loadCash ?
          <div className="p-8 flex justify-center">
            <LoaderSmall />
          </div>
          : !state ? <ReqOpenCash /> :

            <div className="flex justify-center py-5">
              <Drawer open={showDrawer} setOpen={setShowDrawer}>
                <p className="text-gray-700 text-xl mt-4 text-center font-bold">Artículos registrados</p>
                <div className="flex justify-center">
                  <div className="w-[800px]">
                    <TableV2 isSale />
                  </div>
                </div>

              </Drawer>
              <div className="w-[800px]">
                <div className="flex flex-col items-center border rounded-md p-2 mx-3 shadow-lg dataSaleGen">
                  <header className="text-gray-700 mb-2">
                    ---- Datos de venta ----
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
                          changeInput(e.target.value, "code");
                        }}
                      />
                    </span>

                    <span className="w-[200px]">
                      <InputText
                        label="Fecha"
                        value={dayjs(date).format("DD/MM/YYYY")}
                        icon={<FaCalendarDays />}
                      />
                    </span>

                    <div className="flex">
                      <span className="w-[200px]">

                        <InputText
                          label="Cliente"
                          icon={<FaUserGroup />}
                          type="select"
                          value={costumerID}
                          error={!!errors.costumerID}
                          helperText={errors.costumerID}
                          options={select2}
                          valueChange={(e) => {
                            if (e != "") changeInput(e, "costumerID");
                          }}
                        />

                      </span>
                      <Tooltip title="Agregar cliente">
                        <IconButton color="secondary" onClick={() => setModalShow(true)}>
                          <FaPlusCircle />
                        </IconButton>
                      </Tooltip>
                    </div>


                  </section>

                </div>

                <div className="border rounded-md px-3 mt-5 mx-3 shadow-lg">
                  <div className="flex justify-between items-center">

                    <header className="text-gray-700 text-lg">
                      Detalle de venta
                    </header>
                    <span className="btnAddArticle">
                      <Tooltip title="Agregar artículos">
                        <IconButton sx={{ marginY: "2px" }} color="primary" onClick={() => setShowDrawer(true)}>
                          <FaPlusCircle size={30} />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </div>
                  <hr />
                  <section className="mb-2 overflow-y-auto max-h-[360px]">
                    {detail.length === 0 ? (
                      <h3
                        className={`text-gray-600 text-center mt-1 ${errors.empty && "text-red-500"}`}
                      >
                        No hay elementos
                      </h3>
                    ) : (
                      detail.map((d, i) => (
                        <span key={i} className={`flex flex-col items-center
                        ${i < (detail.length - 1) && 'border-b-[1px]'}`}>
                          <header className="text-gray-600 flex items-center">
                            ({d.code}) {d.description}
                            <IconButton
                              color="error"
                              sx={{ marginLeft: "10px" }}
                              onClick={() => deleteDetail(d.id)}
                            >
                              <FaTrash className="text-[18px]" />
                            </IconButton>
                          </header>
                          <section className="flex gap-3 flex-wrap md:flex-nowrap mb-3 justify-center">
                            <InputText
                              label="Precio venta"
                              value={d.price}
                              icon={<p>C$</p>}
                              iconSize="13px"
                              readonly
                            />
                            <InputText
                              label="Cantidad"
                              value={d.quantity}
                              icon={<FaDatabase />}
                              onChange={(e) => {
                                changeInput(e.target.value, "quantity", d.id);
                              }}
                              error={handleErrors(
                                detailErrors,
                                "quantity",
                                d.id,
                              ).some()}
                              helperText={handleErrors(
                                detailErrors,
                                "quantity",
                                d.id,
                              ).find()}
                            />

                            <InputText
                              label="Subtotal"
                              value={formatNumber(d.subtotal)}
                              icon={<p>C$</p>}
                              iconSize="13px"
                              readonly
                            />
                            <InputText
                              label="Descuento"
                              value={d.discount}
                              icon={<p>C$</p>}
                              iconSize="13px"
                              onChange={(e) => {
                                changeInput(e.target.value, "discount", d.id);
                              }}
                              error={handleErrors(
                                detailErrors,
                                "discount",
                                d.id,
                              ).some()}
                              helperText={handleErrors(
                                detailErrors,
                                "discount",
                                d.id,
                              ).find()}
                            />
                          </section>
                        </span>
                      ))
                    )}
                  </section>
                  {detail.length !== 0 && (
                    <>
                      <hr className="-mt-2" />
                      <div>
                        <header className="text-gray-700 my-1 text-center">
                          ---- Totales ----
                        </header>
                        <section className="flex flex-row justify-center flex-wrap md:flex-nowrap gap-4">
                          <InputText
                            label="Total descuento"
                            icon={<p>C$</p>}
                            value={discountTotal}
                            iconSize="13px"
                            readonly
                          />

                          <InputText
                            label="Neto"
                            value={formatNumber(neto)}
                            icon={<p>C$</p>}
                            iconSize="13px"
                            readonly
                          />

                          <InputText
                            label="Total" mx-4
                            value={formatNumber(total)}
                            icon={<p>C$</p>}
                            iconSize="13px"
                            readonly
                          />
                        </section>
                      </div>

                      <div className="gap-3 mb-1 mt-1">
                        <header className="text-gray-700 mb-[5px] text-center">
                          ---- Pago del cliente ----
                        </header>
                        {
                          valResto != "0" && valResto != "NaN" &&
                          <h1 className="text-red-500 text-center text-sm font-bold -mt-[5px] mb-[5px]">
                            Faltan C$ {formatNumber(valResto)} de pago
                          </h1>
                        }

                        <section className="flex flex-row justify-center md:flex-nowrap flex-wrap gap-4">
                          <InputText
                            label="Efectivo en dólares"
                            icon={<p>$</p>}
                            onChange={(e) => {
                              changeInput(e.target.value, "cashDollar");
                            }}
                          />
                          <InputText
                            label="Efectivo en córdobas"
                            icon={<p>C$</p>}
                            onChange={(e) => {
                              changeInput(e.target.value, "cashCordoba");
                            }}
                          />
                          <InputText
                            label="Cambio"
                            value={formatNumber(exchange == "0" ? "" : exchange)}
                            icon={<p>C$</p>}
                            readonly
                          />
                        </section>
                        <h1 className="text-gray-600 ml-8">Cambio dolar: {formatNumber(company.PriceDollar)}</h1>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-5 flex justify-center">

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? <LoaderBtn /> : "Guardar venta"}
                  </Button>
                </div>
              </div>
            </div>
      }


    </Card>
  );
};

export default AddSale;
