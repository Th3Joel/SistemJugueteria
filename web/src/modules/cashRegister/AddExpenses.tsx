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

    const { post, loading } = useForm<Omit<ExpensesData, "id" | "cashRegisterID">>({
        numInvoice: "",
        detail: "",
        amount: "",
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
                    name="numInvoice"
                    icon={<FaFileInvoice />}
                />
                <InputText
                    label="Detalle *"
                    name="detail"
                    icon={<FaArrowDownWideShort />}
                    multiline
                    rows={2}
                />
                <InputText
                    label="Monto *"
                    name="amount"
                    icon={<p>C$</p>}
                    iconSize="15px"
                />
            </div>
        </RenderModal>

    )
}
