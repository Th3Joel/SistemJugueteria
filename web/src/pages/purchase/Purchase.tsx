import { Card } from "@/modules/core/components/Card"
import { InputText } from "@/modules/core/components/InputText"
import { FaBoxOpen, FaCalendarDays, FaDatabase, FaFileInvoice, FaPeopleCarryBox } from "react-icons/fa6"

const Purchase = () => {
  return (
    <Card>
      <div className="flex flex-grow">
        <div className="w-full m-3">
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
                  icon={<FaCalendarDays />}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Proveedor"
                  icon={<FaPeopleCarryBox />}
                  type="select"
                  options={[
                    { key: "1", value: "Banco de Bogotá" },
                    { key: "2", value: "Banco de Bogotá" },
                    { key: "3", value: "Banco de Bogotá" },
                    { key: "4", value: "Banco de Bogotá" },
                    { key: "5", value: "Banco de Bogotá" },
                  ]}
                />
              </span>

              <span className="w-[200px]">
                <InputText
                  label="Asignar caja"
                  icon={<FaBoxOpen />}
                  type="select"
                  options={[
                    { key: "1", value: "(A) Variada" },
                    { key: "2", value: "(B) Variada niño" },
                    { key: "3", value: "(C) Variada niña" },
                    { key: "4", value: "(D) Nuevos" },
                    { key: "5", value: "(E) Usados" },
                  ]}
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
              <span className="flex flex-col items-center">
                <header className="my-2 text-gray-600">
                  (AH23) Transformer
                </header>
                <section className="flex gap-3 flex-wrap justify-center">
                  <span className="w-[145px]">
                    <InputText
                      label="Costo"
                      icon={<p>C$</p>}
                      iconSize="14px"
                    />
                  </span>

                  <span className="w-[145px]">
                    <InputText
                      label="Precio"
                      icon={<p>C$</p>}
                      iconSize="14px"
                    />
                  </span>
                  <span className="w-[145px]">
                    <InputText
                      label="Cantidad"
                      icon={< FaDatabase />}
                    />
                  </span>

                  <span className="w-[145px]">
                    <InputText
                      label="Subtotal"
                      icon={<p>C$</p>}
                      iconSize="14px"
                      readonly
                    />
                  </span>
                </section>
              </span>
            </section>
            <hr />
            <section className="flex justify-center mt-2">
              <span className="w-[200px]">
                <InputText
                  label="Total"
                  icon={<p>C$</p>}
                  iconSize="14px"
                  readonly
                />
              </span>
            </section>
          </div>
        </div>


        <div className="w-full m-3">
          <div className="flex justify-center border rounded-md">
            <h1 className="text-gray-500">
              Artículos registrados
            </h1>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Purchase