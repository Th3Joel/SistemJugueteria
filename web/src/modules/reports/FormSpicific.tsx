import { Button } from "@mui/material"
import { FaFileInvoice } from "react-icons/fa6"
import { InputText } from "../core/components/Input"
interface IProrps{
    isPurchase?: boolean
}
export const FormSpicific: React.FC<IProrps> = ({isPurchase}) => {
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const invoiceNumber = form.get("invoiveNumber") as string
        console.log(invoiceNumber)
        window.open(`/report/${isPurchase ? "specific-purchase" : "specific-sale"}/${invoiceNumber}`, "_blank")
    }
    return (
        <form onSubmit={submit}>
            <InputText
                label="N° Factura"
                name="invoiveNumber"
                icon={<FaFileInvoice />}
            />
            <div className="mt-2">

                <Button type="submit" variant="contained" color="primary" className="w-full">
                    Generar
                </Button>
            </div>
        </form>
    )
}
