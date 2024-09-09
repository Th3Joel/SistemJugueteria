import { ReqOpenCash } from "@/modules/cashRegister/ReqOpenCash";
import CashRegisterState from "@/modules/cashRegister/states/cashRegisterState";
import { Card } from "@/modules/core/components/Card";
import { InputText, IOptions } from "@/modules/core/components/Input";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import LoaderSmall from "@/modules/core/components/LoaderSmall";
import { TableV2 } from "@/modules/core/components/TableV2";
import { useFetch } from "@/modules/core/hooks/useFetch";
import { useForm } from "@/modules/core/hooks/useForm";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import {
  PurchaseState,
  TDetailErrors,
} from "@/modules/purchase/states/purchase-state";
import { Button, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import {
  FaFileInvoice,
  FaCalendarDays,
  FaTrash,
  FaDatabase,
  FaUserGroup,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface ISelectCostumer {
  id: string;
  name: string;
}

const AddSale = () => {
  const { verify, loading: loadCash, state } = CashRegisterState();
  const [select2, setSelect2] = useState<IOptions[]>([{ key: "", value: "" }]);
  const { post, loading } = useForm<string>("");
  const navigate = useNavigate();
  const {
    date,
    code,
    costumerID,
    detail,
    total,
    errors,
    detailErrors,
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
    verify();
    fetchData();
    setIsSale(true)
    //Cuando se desmonta el componente
    return () => {
      clear();
    };
  }, []);
  return (
    <Card>
      {
        loadCash ?
          <div className="p-8 flex justify-center">
            <LoaderSmall />
          </div>
          : !state ? <ReqOpenCash /> :

            <div className="flex flex-grow">
              <div className="w-[60%] m-3">
                <div className="flex flex-col items-center border rounded-md p-1 pb-2">
                  <header className="text-gray-500 my-1">
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
                        type="date"
                        value={date}
                        error={!!errors.date}
                        helperText={errors.date}
                        icon={<FaCalendarDays />}
                        onChange={(e) => {
                          changeInput(e.target.value, "date");
                        }}
                      />
                    </span>

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


                  </section>
                  <div className="mt-3">

                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? <LoaderBtn /> : "Guardar compra"}
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md px-3 pb-2 mt-3">
                  <header className="flex flex-col items-center text-gray-500">
                    ---- Detalle de venta ----
                  </header>

                  <hr />
                  <section className="mb-2">
                    {detail.length === 0 ? (
                      <h3
                        className={`text-gray-600 text-center mt-3 ${errors.empty && "text-red-500"}`}
                      >
                        --- No hay elementos ---
                      </h3>
                    ) : (
                      detail.map((d, i) => (
                        <span key={i} className="flex flex-col items-center mb-2">
                          <header className="my-2 text-gray-600 flex items-center">
                            ({d.code}) {d.description}
                            <IconButton
                              color="error"
                              sx={{ marginLeft: "10px" }}
                              onClick={() => deleteDetail(d.id)}
                            >
                              <FaTrash className="text-[18px]" />
                            </IconButton>
                          </header>
                          <section className="flex gap-3 flex-wrap justify-center">
                            <span className="w-[160px]">
                              <InputText
                                label="Precio venta"
                                value={d.price}
                                icon={<p>C$</p>}
                                iconSize="13px"
                                readonly
                              />
                            </span>

                            <span className="w-[120px]">
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
                            </span>

                            <span className="w-[160px]">
                              <InputText
                                label="Subtotal"
                                value={formatNumber(d.subtotal)}
                                icon={<p>C$</p>}
                                iconSize="13px"
                                readonly
                              />
                            </span>
                            <span className="w-[120px]">
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
                            </span>
                          </section>
                        </span>
                      ))
                    )}
                  </section>
                  {detail.length !== 0 && (
                    <>
                      <hr />
                      <section className="flex justify-center mt-4 gap-3 flex-wrap">
                        <span className="w-[200px]">
                          <InputText
                            label="Total descuento"
                            icon={<p>C$</p>}
                            value={discountTotal}
                            iconSize="13px"
                            readonly
                          />
                        </span>
                        <span className="w-[200px]">
                          <InputText
                            label="Neto"
                            value={formatNumber(neto)}
                            icon={<p>C$</p>}
                            iconSize="13px"
                            readonly
                          />
                        </span>

                        <span className="w-[200px]">
                          <InputText
                            label="Total"
                            value={formatNumber(total)}
                            icon={<p>C$</p>}
                            iconSize="13px"
                            readonly
                          />
                        </span>
                      </section>
                    </>
                  )}
                </div>
              </div>

              <div className="w-[50%] m-3 ">
                <div className="border rounded-md p-2">
                  <p className="text-gray-500 text-center">Artículos</p>
                  <TableV2 />
                </div>
              </div>
            </div>
      }


    </Card>
  );
};

export default AddSale;
