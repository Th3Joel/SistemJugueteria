import { InputText } from "@/modules/core/components/Input"
import LoaderBtn from "@/modules/core/components/LoaderBtn"
import { useForm } from "@/modules/core/hooks/useForm"
import { Button, Collapse } from "@mui/material"
import { useState } from "react"
import { FaCircleChevronLeft, FaGear } from "react-icons/fa6"
import { pettyCashState } from "../states/DataState"

interface IPettyCash {
    InitialBalance: string
    Limit: string
}
export const GeneralData = () => {
    const [show, setShow] = useState(false)
    const { InitialBalance, Limit,fetchData } = pettyCashState()
    const {post,loading,data,inputChange} = useForm<IPettyCash>({
        InitialBalance:InitialBalance+"",
        Limit: Limit+"",
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post("/pettyCash",e.currentTarget,true).then((status) => {
            if(status){
                setShow(false)
                fetchData()
            }
        })

    }

    return (
        <div className="shadow-lg rounded-lg p-3 pettyCashGeneral">
            <div className="flex justify-between cursor-pointer" onClick={() => setShow((s) => !s)}>

                <h1 className="text-xl font-bold flex items-center">
                    Datos generales <FaGear className={`ml-1 ${show && "animate-spin"}`} />
                </h1>
                <div>
                    <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${show ? "-rotate-90" : "rotate-0"}`} />
                </div>
            </div>
            <Collapse in={show}>
                <form className="flex gap-3 flex-col sm:flex-row mt-2" onSubmit={handleSubmit}>
                    <InputText
                        label="Monto inicial"
                        name="InitialBalance"
                        icon={<p>C$</p>}
                        iconSize="13px"
                        value={data.InitialBalance}
                        onChange={inputChange}
                    />

                    <InputText
                        label="Límite de saldo mínimo"
                        name="Limit"
                        icon={<p>C$</p>}
                        iconSize="13px"
                        value={data.Limit}
                        onChange={inputChange}
                    />

                    <Button type="submit" disabled={loading} variant="contained" color="primary">
                        {loading ? <LoaderBtn/>: "Actualizar"}
                    </Button>
                </form>
            </Collapse>

        </div>
    )
}
