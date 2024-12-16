import { Card } from "@/modules/core/components/Card"
import { TitleState } from "@/modules/core/states/title-state"
import { FormPeriodic } from "@/modules/reports/FormPeriodic"
import { FormSpicific } from "@/modules/reports/components/FormSpicific"
import { Collapse } from "@mui/material"
import { useEffect, useState } from "react"
import { FaCircleChevronLeft } from "react-icons/fa6"
import { Link } from "react-router-dom"

const Reports = () => {
    const { setTitle } = TitleState();
    const [coSpecificSale, setCoSpecificSale] = useState<boolean>(false)
    const [coSpecificPurchase, setCoSpecificPurchase] = useState<boolean>(false)
    const [coSpecificPeriodSale, setCoSpecificPeriodSale] = useState<boolean>(false)
    const [coSpecificPeriodPurchase, setCoSpecificPeriodPurchase] = useState<boolean>(false)
    const [coCashRegisterPeriod, setCoCashRegisterPeriod] = useState<boolean>(false)
    const [coOtherInventoryOutputs, setCoOtherInventoryOutputs] = useState<boolean>(false)
    useEffect(() => {
        setTitle("Reportes")
    }, [])
    return (
        <Card>
            <div className="py-4 px-6">
                <div className="flex gap-5 flex-wrap justify-center">


                    <Link to="/report/inventory" target="_blank">
                        <div className="gap-4 border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Inventario
                            </h1>
                        </div>

                    </Link>

                    <Link to="/report/inventory/running-out" target="_blank">
                        <div className="gap-4 border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Inventario próximo a agotarse
                            </h1>
                        </div>
                    </Link>
                    <Link to="/report/suppliers" target="_blank">
                        <div className="gap-4 border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Proveedores registrados
                            </h1>
                        </div>

                    </Link>

                    <Link to="/report/costumers" target="_blank">
                        <div className="gap-4 border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Clientes registrados
                            </h1>
                        </div>

                    </Link>

                    <div>
                        <div onClick={() => setCoSpecificSale((s) => !s)} className="gap-4 relative border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Reporte de venta
                            </h1>
                            <div className="absolute right-3">
                                <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${coSpecificSale ? "-rotate-90" : "rotate-0"}`} />
                            </div>
                        </div>

                        <Collapse in={coSpecificSale}>
                            <div className="border-b border-x rounded-md px-3 py-4">
                                <FormSpicific />
                            </div>
                        </Collapse>
                    </div>

                    <div>
                        <div onClick={() => setCoSpecificPurchase((s) => !s)} className="gap-4 relative border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Reporte de compra
                            </h1>
                            <div className="absolute right-3">
                                <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${coSpecificPurchase ? "-rotate-90" : "rotate-0"}`} />
                            </div>
                        </div>

                        <Collapse in={coSpecificPurchase}>
                            <div className="border-b border-x rounded-md px-3 py-4">
                                <FormSpicific isPurchase />
                            </div>
                        </Collapse>
                    </div>

                    <div>
                        <div onClick={() => setCoSpecificPeriodSale((s) => !s)} className="gap-4 relative border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Ventas por periodo
                            </h1>
                            <div className="absolute right-3">
                                <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${coSpecificPeriodSale ? "-rotate-90" : "rotate-0"}`} />
                            </div>
                        </div>

                        <Collapse in={coSpecificPeriodSale}>
                            <div className="border-b border-x rounded-md px-3 py-1 w-[300px]">
                                <FormPeriodic reportType="sale" />
                            </div>
                        </Collapse>
                    </div>

                    <div>
                        <div onClick={() => setCoSpecificPeriodPurchase((s) => !s)} className="gap-4 relative border rounded-lg w-[300px] h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Compras por periodo
                            </h1>
                            <div className="absolute right-3">
                                <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${coSpecificPeriodPurchase ? "-rotate-90" : "rotate-0"}`} />
                            </div>
                        </div>

                        <Collapse in={coSpecificPeriodPurchase}>
                            <div className="border-b border-x rounded-md px-3 py-1 w-[300px]">
                                <FormPeriodic reportType="purchase" />
                            </div>
                        </Collapse>
                    </div>

                    <div className="w-[300px]">
                        <div onClick={() => setCoCashRegisterPeriod((s) => !s)} className="gap-4 relative border rounded-lg  h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Arqueos de caja
                            </h1>
                            <div className="absolute right-3">
                                <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${coCashRegisterPeriod ? "-rotate-90" : "rotate-0"}`} />
                            </div>
                        </div>

                        <Collapse in={coCashRegisterPeriod}>
                            <div className="border-b border-x rounded-md px-3 py-1 w-full">
                                <FormPeriodic reportType="cashRegister" />
                            </div>
                        </Collapse>
                    </div>

                    <div className="w-[300px]">
                        <div onClick={() => setCoOtherInventoryOutputs((s) => !s)} className="gap-4 relative border rounded-lg  h-[50px] border-blue-500 grid
                                                place-items-center cursor-pointer hover:border-blue-600
                                                hover:bg-blue-200 duration-300 hover:shadow-lg">

                            <h1 className="text-xl">
                                Salidas de inventario
                            </h1>
                            <div className="absolute right-3">
                                <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${coOtherInventoryOutputs ? "-rotate-90" : "rotate-0"}`} />
                            </div>
                        </div>

                        <Collapse in={coOtherInventoryOutputs}>
                            <div className="border-b border-x rounded-md px-3 py-1 w-full">
                                <FormPeriodic reportType="othersInventoryOutputs" />
                            </div>
                        </Collapse>
                    </div>


                </div>
            </div>

        </Card>
    )
}

export default Reports