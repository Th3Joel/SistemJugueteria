import { Button, Chip } from "@mui/material"
import { FaCalendarDays } from "react-icons/fa6"
import { InputText } from "../core/components/Input"
import dayjs from "dayjs"
import { useState } from "react"

interface IFormPeriodic {
    startDate: string
    endDate: string
}

export const FormPeriodic: React.FC<{ isSale?: boolean }> = ({ isSale }) => {
    const [errors, setErrors] = useState<Record<string,string>>({})
    const [data, setData] = useState<IFormPeriodic>({ startDate: dayjs(Date.now()).format("YYYY-MM-DD"), endDate: dayjs(Date.now() + (24 * 60 * 60 * 24 * 30)).format("YYYY-MM-DD") })
    const uri = "/report/" + (isSale ? "sales" : "purchases");
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const startDate = data.startDate
        const endDate = data.endDate

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (start > end) {
            setErrors({ startDate: "La fecha de inicio debe ser menor a la de fin" })
            return
        }
        setErrors({})
        window.open(`${uri}?startDate=${startDate}&endDate=${endDate}`, "_blank")
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
                <a href={uri + "/day"} target="_blank">
                    <Chip label="Del día" clickable />
                </a>
                <a href={uri + "/week"} target="_blank">
                    <Chip label="De la semana" clickable />
                </a>
                <a href={uri + "/month"} target="_blank">
                    <Chip label="Del mes" clickable />
                </a>
                <a href={uri + "/year"} target="_blank">
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
                />
                <InputText
                    label="Fecha final"
                    type="date"
                    name="endDate"
                    value={data.endDate}
                    onChange={onChange}
                    icon={<FaCalendarDays />}
                />
                <small>
                    {
                        errors.startDate && <span className="text-red-500">{errors.startDate}</span>
                    }
                </small>
                <div className="mb-2">
                    <Button type="submit" variant="contained" color="primary" className="w-full">
                        Generar personalizado
                    </Button>
                </div>
            </form>
        </div>
    )
}
