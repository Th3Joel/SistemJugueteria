import { InputText } from "@/modules/core/components/Input"
import { ModalProps } from "@/modules/core/components/Modal"
import { useForm } from "@/modules/core/hooks/useForm"
import { FaArrowDownWideShort } from "react-icons/fa6"
import { IRefunds } from "./Refunds"
import { pettyCashState } from "../states/DataState"
import { useState } from "react"
import { formatNumber } from "@/modules/core/utils/formatNumber"

interface IRefund {
    getData: () => void
    RenderModal: React.FC<ModalProps>
    setModalShow: (show: boolean) => void
}
export const AddRefund: React.FC<IRefund> = ({ getData, RenderModal, setModalShow }) => {
    const [err, setErr] = useState<Record<string, string>>({})
    const { InitialBalance, balance } = pettyCashState()
    const { post, loading, data, errors, inputChange,setData } = useForm<Omit<IRefunds, "id" | "date">>({
        Observation: "",
        Amount: "",
    });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const refund = InitialBalance - parseFloat(balance + "")
        if (refund < 1) {
            setErr({
                "pass": "No es necesario un reembolso"
            })
            return
        }
        if (parseFloat(data.Amount) > refund) {
            setErr({
                "pass": "Debe ser menor a C$" + formatNumber(refund + "")
            })
            return
        }
        post("/refunds", e.currentTarget).then((res) => {
            if (res) {
                getData()
                setData({Observation:"",Amount:""})
                setModalShow(false)
            }
        });
    }
    return (
        <RenderModal title="Nuevo reembolso" onSubmit={onSubmit} loadBtn={loading}>
            <div className="flex flex-col gap-4 px-3 py-2">
                <small className="text-red-500 text-sm -my-2 text-center">
                    Campo obligatorios *
                </small>
                <InputText
                    label="Observación"
                    name="Observation"
                    icon={<FaArrowDownWideShort />}
                    multiline
                    rows={2}
                    error={!!errors?.Observation}
                    helperText={errors?.Observation}
                    value={data.Observation}
                    onChange={inputChange}
                />
                <InputText
                    label="Monto *"
                    name="Amount"
                    icon={<p>C$</p>}
                    iconSize="15px"
                    error={!!errors?.Amount}
                    helperText={errors?.Amount}
                    value={data.Amount}
                    onChange={inputChange}
                />
                {
                    err?.pass && <small className="-my-3 text-center text-red-600">{err.pass}</small>
                }
            </div>
        </RenderModal>
    )
}
