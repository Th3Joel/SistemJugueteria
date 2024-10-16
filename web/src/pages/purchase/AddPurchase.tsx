import { Card } from "@/modules/core/components/Card";
import { Drawer } from "@/modules/core/components/Drawer";
import { InputText, IOptions } from "@/modules/core/components/Input";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { TableV2 } from "@/modules/core/components/TableV2";
import { useFetch } from "@/modules/core/hooks/useFetch";
import { useForm } from "@/modules/core/hooks/useForm";
import { TitleState } from "@/modules/core/states/title-state";
import { StateDriver, stepsAddPurchase } from "@/modules/core/utils/driver";
import { formatNumber } from "@/modules/core/utils/formatNumber";
import {
  PurchaseState,
  TDetailErrors,
} from "@/modules/purchase/states/purchase-state";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  FaFileInvoice,
  FaCalendarDays,
  FaPeopleCarryBox,
  FaBoxOpen,
  FaTrash,
  FaDatabase,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface ISelectArticleBox {
  id: string;
  code: string;
  description: string;
}
interface ISelectSupplier {
  id: string;
  name: string;
}
// interface IArticleBox {
//   cost: number;
//   toys_quantity: number;
//   purchase_price: number;
// }
const AddPurchase = () => {
  const { setSteps } = StateDriver();
  const [showDrawer, setShowDrawer] = useState(false);
  const [select, setSelect] = useState<IOptions[]>([{ key: "", value: "" }]);
  const [select2, setSelect2] = useState<IOptions[]>([{ key: "", value: "" }]);
  const { post, loading } = useForm<string>("");
  const { setTitle } = TitleState();
  const navigate = useNavigate();
  const {
    date,
    code,
    articleBoxID,
    supplierID,
    detail,
    costArticle,
    costBox,
    total,
    errors,
    detailErrors,
    quantityBox,
    deleteDetail,
    changeInput,
    validate,
    clear,
    json,
  } = PurchaseState();

  const fetchData = async () => {
    const res = await useFetch<ISelectArticleBox[]>(
      "/articles-box/select",
      "GET",
    );
    if (res) {
      setSelect(
        res.map((data) => ({
          key: data.id,
          value: data.code + " - " + data.description,
        })),
      );
    }
    const res2 = await useFetch<ISelectSupplier[]>("/suppliers/select", "GET");
    if (res2) {
      setSelect2(
        res2.map((data) => ({
          key: data.id,
          value: data.name,
        })),
      );
    }
  };

  // const fetchCost = (id: string) => {
  //   useFetch<{ status: boolean; find: IArticleBox }>(
  //     "/articles-box/cost/" + id,
  //     "GET",
  //   ).then((res) => {
  //     if (res.status) {
  //       //setCostArticle(parseFloat(res.find.cost.toFixed(2)));
  //     }
  //   });
  // };

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
      post("/purchases", json(), false, true).then((res) => {
        if (res) {
          navigate("/purchases");
        }
      });
    }
  };
  useEffect(() => {
    setTitle("Agregar compra");
    fetchData();
    setSteps(stepsAddPurchase);
    return () => {
      clear();
    };
  }, []);
  return (
    <Card btnBack btnBackLink="/purchases">
      <Drawer open={showDrawer} setOpen={setShowDrawer}>
        <p className="text-gray-700 text-xl mt-4 text-center font-bold">Articulos registrados</p>
        <div className="flex justify-center">
          <div className="w-[800px]">
            <TableV2 />
          </div>
        </div>
      </Drawer>
      <div className="flex justify-center py-5">
        <div className="w-[800px]">
          <div className="flex flex-col items-center border rounded-md p-3 shadow-lg dataPurchaseGen">
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
                  label="Proveedor"
                  icon={<FaPeopleCarryBox />}
                  type="select"
                  value={supplierID}
                  error={!!errors.supplierID}
                  helperText={errors.supplierID}
                  options={select2}
                  valueChange={(e) => {
                    if (e != "") changeInput(e, "supplierID");
                  }}
                />
              </span>


            </section>

          </div>
          <div className="flex flex-col items-center border rounded-md p-3 mt-3 shadow-lg boxDetails">
            <header className="text-gray-500 my-1">
              ----Caja de artículos----
            </header>
            <section className="flex flex-row justify-center flex-wrap gap-4">
              <span className="min-w-[200px] w-auto">
                <InputText
                  label="Caja de artículos"
                  icon={<FaBoxOpen />}
                  type="select"
                  value={articleBoxID}
                  options={select}
                  valueChange={(e) => {
                    if (e != "") changeInput(e, "articleBoxID");
                    //fetchCost(e);
                  }}
                  error={!!errors.articleBoxID}
                  helperText={errors.articleBoxID}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Costo"
                  icon={<p>C$</p>}
                  value={"" + costBox}
                  error={!!errors?.costBox}
                  onChange={(e) => {
                    changeInput(e.target.value, "costBox");
                  }}
                  helperText={errors?.costBox}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Cantidad de artículos"
                  icon={<FaDatabase />}
                  value={"" + quantityBox}
                  error={!!errors?.quantityBox}
                  onChange={(e) => {
                    changeInput(e.target.value, "quantityBox");
                  }}
                  helperText={errors?.quantityBox}
                />
              </span>


            </section>
          </div>
          <div className="border rounded-md px-3 pb-2 mt-3 shadow-lg">
            <div className="flex justify-between items-center">
              <header className="text-gray-700 text-lg flex items-center gap-2">
                Detalle de compra
                {
                  !!errors.quantityArticleDetail && (
                    <h1 className="text-sm text-center text-red-500">
                      ({errors.quantityArticleDetail})
                    </h1>
                  )
                }
              </header>
              <div className="btnAddArticle">
                <Tooltip title="Agregar artículos">
                  <IconButton sx={{ marginY: "2px" }} color="primary" onClick={() => setShowDrawer(true)}>
                    <FaPlusCircle size={30} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <hr />
            <section className="mb-2 overflow-y-auto max-h-[380px]">
              {detail.length === 0 ? (
                <h3
                  className={`text-gray-600 text-center mt-3 ${errors.empty && "text-red-500"}`}
                >
                  --- No hay elementos ---
                </h3>
              ) : (
                detail.map((d, i) => (
                  <span key={i} className={`flex flex-col items-center 
                  ${i < (detail.length - 1) && 'border-b-[1px]'}`}>
                    <header className=" text-gray-600 flex items-center">
                      ({d.code}) {d.description}
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
                      />
                      <InputText
                        label="Precio venta"
                        value={"" + d.price}
                        icon={<p>C$</p>}
                        iconSize="13px"
                        error={handleErrors(
                          detailErrors,
                          "price",
                          d.id,
                        ).some()}
                        helperText={handleErrors(
                          detailErrors,
                          "price",
                          d.id,
                        ).find()}
                        onChange={(e) => {
                          changeInput(e.target.value, "price", d.id);
                        }}
                      />
                      <InputText
                        label="Cantidad"
                        value={"" + d.quantity}
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
                        value={formatNumber(d.subtotal, 2)}
                        icon={<p>C$</p>}
                        iconSize="13px"
                        readonly
                      />
                    </section>
                  </span>
                ))
              )}
            </section>
            {detail.length !== 0 && (
              <>
                <hr className="-mt-2" />
                <section className="flex justify-center mt-2">
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
          <div className="mt-4 flex justify-center">

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

      </div>
    </Card>
  );
};

export default AddPurchase;
