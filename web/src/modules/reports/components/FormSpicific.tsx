import { Button } from "@mui/material"
import { FaFileInvoice } from "react-icons/fa6"
import { InputText } from "../../core/components/Input"
import { useState } from "react"
interface IProrps {
    isPurchase?: boolean
}
export const FormSpicific: React.FC<IProrps> = ({ isPurchase }) => {
    const [err, setErr] = useState<Record<string, string>>({})
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const invoiceNumber = form.get("invoiveNumber") as string
        if (invoiceNumber.trim() == "") {
            setErr({
                "invoiveNumber": "Campo obligatorio"
            })
            return
        }
        setErr({})
        console.log(invoiceNumber)
        window.open(`/sis/report/${isPurchase ? "specific-purchase" : "specific-sale"}/${invoiceNumber}`, "_blank")
    }
    return (
        <form onSubmit={submit}>
            <InputText
                label="N° Factura"
                name="invoiveNumber"
                icon={<FaFileInvoice />}
                error={!!err?.invoiveNumber}
                helperText={err?.invoiveNumber}
            />
            <div className="mt-2">

                <Button type="submit" variant="contained" color="primary" className="w-full">
                    Generar
                </Button>
            </div>
        </form>
    )
}
