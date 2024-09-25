import { useEffect, useState } from "react"
import { InputText } from "../core/components/Input"
import { ModalProps } from "../core/components/Modal"
import { useForm } from "../core/hooks/useForm"
import CashRegisterState from "./states/cashRegisterState"
interface ICloseCashRegsiter {
    RenderModal: React.FC<ModalProps>
    setModalShow: (show: boolean) => void
}
export interface IDenomination {
    One: string
    Five: string
    Ten: string
    Twenty: string
    Fyfty: string
    OneHundred: string
    TwoHundred: string
    FiveHundred: string
    OneThousand: string
    TotalDollar: string
    TotalCordoba: string
}
export const CloseCashRegsiter: React.FC<ICloseCashRegsiter> = ({ RenderModal, setModalShow }) => {
    const [total, setTotal] = useState<string>("")
    const { verify } = CashRegisterState();
    const { post, loading, data, inputChange, errors } = useForm<IDenomination>({
        One: "",
        Five: "",
        Ten: "",
        Twenty: "",
        Fyfty: "",
        OneHundred: "",
        TwoHundred: "",
        FiveHundred: "",
        OneThousand: "",
        TotalDollar: "",
        TotalCordoba: "",
    })
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/cash-register/close", e.currentTarget).then((res) => {
            if (res) {
                setModalShow(false)
                verify()
            }
        });
    }
    const valores: Record<string, number> = {
        One: 1,
        Five: 5,
        Ten: 10,
        Twenty: 20,
        Fyfty: 50,
        OneHundred: 100,
        TwoHundred: 200,
        FiveHundred: 500,
        OneThousand: 1000,
    }
    useEffect(() => {
        let sum = 0;
        Object.entries(data).forEach(([key, value]) => {
            sum += (parseInt(value) || 0) * (valores[key] || 0)
        })
        setTotal(sum == 0 ? "" : sum + "")
    }, [data])

    return (
        <RenderModal title="Cerrar caja" onSubmit={onSubmit} loadBtn={loading}>
             <h1 className="mb-2 text-center">Denominación de dinero</h1>
            
            <div className="w-[390px] flex flex-col gap-4">
                
                        <div className="flex gap-4">
                            <InputText
                                label="Monedas de 1"
                                name="One"
                                value={data?.One}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.One}
                                helperText={errors?.One}
                            />
                            <InputText
                                label="Monedas de 5"
                                name="Five"
                                value={data?.Five}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.Five}
                                helperText={errors?.Five}
                            />
                        </div>
                        <div className="flex  gap-4">

                            <InputText
                                label="Billetes de 10"
                                name="Ten"
                                value={data?.Ten}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.Ten}
                                helperText={errors?.Ten}
                            />
                            <InputText
                                label="Billetes de 20"
                                name="Twenty"
                                value={data?.Twenty}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.Twenty}
                                helperText={errors?.Twenty}
                            />
                        </div>
                        <div className="flex  gap-4">

                            <InputText
                                label="Billetes de 50"
                                name="Fyfty"
                                value={data?.Fyfty}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.Fyfty}
                                helperText={errors?.Fyfty}
                            />
                            <InputText
                                label="Billetes de 100"
                                name="OneHundred"
                                value={data?.OneHundred}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.OneHundred}
                                helperText={errors?.OneHundred}
                            />
                        </div>
                        <div className="flex  gap-4">
                            <InputText
                                label="Billetes de 200"
                                name="TwoHundred"
                                value={data?.TwoHundred}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.TwoHundred}
                                helperText={errors?.TwoHundred}
                            />
                            <InputText
                                label="Billetes de 500"
                                name="FiveHundred"
                                value={data?.FiveHundred}
                                onChange={inputChange}
                                icon={<p>C$</p>}
                                error={!!errors?.FiveHundred}
                                helperText={errors?.FiveHundred}
                            />

                        </div>
                        <InputText
                            label="Billetes de 1000"
                            name="OneThousand"
                            value={data?.OneThousand}
                            onChange={inputChange}
                            icon={<p>C$</p>}
                            error={!!errors?.OneThousand}
                            helperText={errors?.OneThousand}
                        />
                   

                <small className="text-red-500 text-sm text-center -my-3">Campos obligatorios *</small>

                
                <div className="flex flex-col gap-4 px-24">
                    <InputText
                        label="Total dolar"
                        name="TotalDollar"
                        value={data.TotalDollar}
                        onChange={inputChange}
                        error={!!errors?.TotalDollar}
                        helperText={errors?.TotalDollar}
                        icon={<p>$</p>}
                    />
                    <InputText
                        label="Total córdoba *"
                        name="TotalCordoba"
                        value={total}
                        onChange={inputChange}
                        error={!!errors?.TotalCordoba}
                        helperText={errors?.TotalCordoba}
                        icon={<p>C$</p>}
                        readonly

                    />
                </div>
            </div>

        </RenderModal>
    )
}
