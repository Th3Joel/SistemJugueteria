import { FaArrowDownWideShort, FaFileInvoice } from "react-icons/fa6"
import { InputText } from "../../core/components/Input"
import { ModalProps } from "../../core/components/Modal"
import { useForm } from "../../core/hooks/useForm"
import { IExpenses } from "./Expenses"
import { useState } from "react"
import { pettyCashState } from "../states/DataState"
import { formatNumber } from "@/modules/core/utils/formatNumber"

interface IAddExpenses {
    isCash?: boolean
    getData: () => void
    RenderModal: React.FC<ModalProps>
    setModalShow: (show: boolean) => void
}

export const AddExpenses: React.FC<IAddExpenses> = ({ getData, RenderModal, setModalShow, isCash }) => {
    const [err, setErr] = useState<Record<string, string>>({})
    const { balance } = pettyCashState()
    const { post, loading, data, errors, inputChange } = useForm<Omit<IExpenses, "id" | "Date">>({
        NumInvoice: "",
        Detail: "",
        Amount: "",
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pas = parseFloat(data.Amount)
        if (!isCash && (pas > balance || pas < 10)) {
            setErr({
                "pass": "Debe ser menor a C$" + formatNumber(balance + "")
            })
            return
        }

        post(isCash ? "/expenses/cash" : "/expenses", e.currentTarget).then((res) => {
            if (res) {
                getData()
                setModalShow(false)
            }

        });
        setErr({})
    }
    return (
        <RenderModal title="Nuevo egreso" onSubmit={onSubmit} loadBtn={loading}>
            <div className="flex flex-col gap-4 px-3 py-2">
                <small className="text-red-500 text-sm -my-2 text-center">
                    Campo obligatorios *
                </small>
                <InputText
                    label="N° Factura"
                    name="NumInvoice"
                    icon={<FaFileInvoice />}
                    error={!!errors?.NumInvoice}
                    helperText={errors?.NumInvoice}
                    value={data.NumInvoice}
                    onChange={inputChange}
                />
                <InputText
                    label="Detalle *"
                    name="Detail"
                    icon={<FaArrowDownWideShort />}
                    multiline
                    rows={2}
                    error={!!errors?.Detail}
                    helperText={errors?.Detail}
                    value={data.Detail}
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
