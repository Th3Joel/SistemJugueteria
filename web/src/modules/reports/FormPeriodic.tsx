import { Button, Chip } from "@mui/material"
import { FaCalendarDays } from "react-icons/fa6"
import { InputText } from "../core/components/Input"
import dayjs from "dayjs"

export const FormPeriodic: React.FC<{ isSale?: boolean }> = ({ isSale }) => {
    const uri = "/report/" + (isSale ? "sales" : "purchases");
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const startDate = form.get("startDate") as string
        const endDate = form.get("endDate") as string
        window.open(`${uri}?startDate=${startDate}&endDate=${endDate}`, "_blank")
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
                    value={dayjs(Date.now()).format("YYYY-MM-DD")}
                    icon={<FaCalendarDays />}
                />
                <InputText
                    label="Fecha final"
                    type="date"
                    name="endDate"
                    value={dayjs(Date.now() + (24 * 60 * 60 * 24 * 30)).format("YYYY-MM-DD")}
                    icon={<FaCalendarDays />}
                />
                <div className="mb-2">
                    <Button type="submit" variant="contained" color="primary" className="w-full">
                        Generar personalizado
                    </Button>
                </div>
            </form>
        </div>
    )
}
