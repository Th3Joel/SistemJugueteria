import cashImage from "@/assets/cash.png";
import { Raya } from "../core/components/Raya";
import { Expenses } from "./Expenses";
import { IconButton } from "@mui/material";
import { FaPrint } from "react-icons/fa6";

export const ViewCash = () => {
    return (<>
        <h1 className="text-center text-gray-600 font-bold text-xl mt-2">
            Visualizar caja
        </h1>
        <div className="flex flex-col gap-7 items-center my-5">
            <div className="rounded-xl shadow-xl px-4 py-3 flex justify-between w-[700px] border">
                <div className="flex">
                    <img src={cashImage} alt="cashImage" width={90} />
                    <div className="flex flex-col justify-center ml-3">
                        <h1 className="font-bold text-xl">Caja</h1>
                        <h2 className="text-gray-500 font-bold">Juan Molina</h2>
                        <h3 className="text-red-700 mt-3">
                            12/23/2022
                        </h3>
                    </div>
                </div>

                <div className="flex flex-col justify-between ml-4">
                    <h1 className="text-red-700 text-end font-bold">
                        Cerrada |
                        <IconButton color="success">
                            <FaPrint className="text-md" /> 
                        </IconButton>
                    </h1>
                    <div className="flex flex-col text-lg">
                        <span>
                            Saldo inicial: C$ 5,000.00
                        </span>
                        <span>
                            Total ventas: C$ 3,000.00
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-xl shadow-xl  py-6 flex justify-evenly w-[700px] border">
                <div>
                    <h1 className="text-gray-600 font-bold text-center mb-2">
                        Apertura
                    </h1>
                    <span className="font-bold text-xl text-green-700">
                        7:00 AM
                    </span>
                </div>
                <Raya />
                <div className="text-gray-600 font-bold">
                    <h1 className="text-gray-600 font-bold text-center mb-2">
                        Cierre
                    </h1>

                    <span className="font-bold text-xl text-red-700">
                        8:00 PM
                    </span>
                </div>
            </div>

            <div className="rounded-xl shadow-xl px-4 py-4 w-[700px] border">
                <Expenses isView />
            </div>
            <div className="rounded-xl shadow-xl px-4 py-6 w-[700px] border flex justify-evenly">
                <h1 className="text-xl font-bold">Total arqueo: </h1>
                <h2 className="text-xl text-gray-600 font-bold">C$ 5,000.00</h2>
            </div>
        </div>
    </>
    )
}
