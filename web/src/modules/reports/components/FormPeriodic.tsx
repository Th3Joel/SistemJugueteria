import { Button, Chip } from "@mui/material"
import { FaCalendarDays } from "react-icons/fa6"
import { InputText } from "../core/components/Input"
import dayjs from "dayjs"
import { useState } from "react"

interface IFormPeriodic {
    startDate: string
    endDate: string
}

interface IProps {
    reportType: ReportType
}

type ReportType = "sale" | "purchase" | "cashRegister" | "othersInventoryOutputs"

export const FormPeriodic: React.FC<IProps> = ({ reportType }) => {
    const [errors, setErrors] = useState<Record<string,string>>({})
    const [data, setData] = useState<IFormPeriodic>({ startDate: dayjs(Date.now()).format("YYYY-MM-DD"), endDate: dayjs(Date.now() + (24 * 60 * 60 * 24 * 30)).format("YYYY-MM-DD") })
   // const uri = "/sis/report/" + (isSale ? "sales" : "purchases");
    const urls = {
        sale: "/sis/report/sales",
        purchase: "/sis/report/purchases",
        cashRegister: "/sis/report/cashRegister",
        othersInventoryOutputs: "/sis/report/othersInventoryOutputs",
    }
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        let val = true;
        e.preventDefault()
        const startDate = data.startDate
        const endDate = data.endDate

        const start = new Date(startDate)
        const end = new Date(endDate)
        const now = new Date()
        const err:Record<string,string> = {}

        if (start > end) {
            err["startDate"] = "La fecha de inicio debe ser menor a la de fin"
            val = false
        }

        if(end > now){
            err["endDate"] = "La fecha de fin no puede ser mayor a la actual"
            val = false
        }
        setErrors(err)
        if (!val) return
        setErrors({})
        window.open(`${urls[reportType]}?startDate=${startDate}&endDate=${endDate}`, "_blank")
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setData((d) => ({ ...d, [name]: value }))
    }

    return (
        <div>
            <h1 className="text-center mb-1">Seleccione el periodo</h1>
            <div className="flex gap-2 flex-wrap">
                <a href={urls[reportType] + "/day"} target="_blank">
                    <Chip label="Del día" clickable />
                </a>
                <a href={urls[reportType] + "/week"} target="_blank">
                    <Chip label="De la semana" clickable />
                </a>
                <a href={urls[reportType] + "/month"} target="_blank">
                    <Chip label="Del mes" clickable />
                </a>
                <a href={urls[reportType] + "/year"} target="_blank">
                    <Chip label="Del año" clickable />
                </a>
            </div>
            <h1 className="text-center mb-2">Personalizar</h1>
            <form className="flex flex-col gap-4" onSubmit={submit}>
                <InputText
                    label="Fecha inicial"
                    type="date"
                    name="startDate"
                    value={data.startDate}
                    onChange={onChange}
                    icon={<FaCalendarDays />}
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                />
                <InputText
                    label="Fecha final"
                    type="date"
                    name="endDate"
                    value={data.endDate}
                    onChange={onChange}
                    icon={<FaCalendarDays />}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                />
                <div className="mb-2">
                    <Button type="submit" variant="contained" color="primary" className="w-full">
                        Generar
                    </Button>
                </div>
            </form>
        </div>
    )
}
