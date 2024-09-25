import { FaArrowDownWideShort, FaFileInvoice } from "react-icons/fa6"
import { InputText } from "../core/components/Input"
import { ModalProps } from "../core/components/Modal"
import { ExpensesData } from "./Expenses"
import { useForm } from "../core/hooks/useForm"

interface IAddExpenses {
    getData: () => void
    RenderModal: React.FC<ModalProps>
    setModalShow: (show: boolean) => void
}

export const AddExpenses: React.FC<IAddExpenses> = ({ getData, RenderModal, setModalShow }) => {

    const { post, loading, data, errors,inputChange } = useForm<Omit<ExpensesData, "id" | "cashRegisterID">>({
        NumInvoice: "",
        Detail: "",
        Amount: "",
    });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/expenses", e.currentTarget).then((res) => {
            if (res) {
                getData()
                setModalShow(false)
            }
        });
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
            </div>
        </RenderModal>

    )
}
