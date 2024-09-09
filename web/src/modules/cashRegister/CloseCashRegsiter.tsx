import { useEffect, useState } from "react"
import { InputText } from "../core/components/Input"
import { ModalProps } from "../core/components/Modal"
import { useForm } from "../core/hooks/useForm"
import { formatNumber } from "../core/utils/formatNumber"
interface ICloseCashRegsiter {
    RenderModal: React.FC<ModalProps>
    setModalShow: (show: boolean) => void
}
interface IDenomination {
    one: string
    five: string
    ten: string
    twenty: string
    fyfty: string
    oneHundred: string
    fiveHundred: string
    oneThousand: string
    totalDollar: string
    totalCordoba: string
}
export const CloseCashRegsiter: React.FC<ICloseCashRegsiter> = ({ RenderModal, setModalShow }) => {
    const [total, setTotal] = useState<string>("")
    const { post, loading, data, inputChange } = useForm<IDenomination>({
        one: "",
        five: "",
        ten: "",
        twenty: "",
        fyfty: "",
        oneHundred: "",
        fiveHundred: "",
        oneThousand: "",
        totalDollar: "",
        totalCordoba: "",
    })
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/cash-register/close", e.currentTarget).then((res) => {
            if (res) {
                setModalShow(false)
            }
        });
    }
    const valores: Record<string, number> = {
        one:1,
        five:5,
        ten:10,
        twenty:20,
        fyfty:50,
        oneHundred:100,
        fiveHundred:500,
        oneThousand:1000,
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
                        name="one"
                        value={data?.one}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                    <InputText
                        label="Monedas de 5"
                        name="five"
                        value={data?.five}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                </div>
                <div className="flex  gap-4">

                    <InputText
                        label="Billetes de 10"
                        name="ten"
                        value={data?.ten}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                    <InputText
                        label="Billetes de 20"
                        name="twenty"
                        value={data?.twenty}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                </div>
                <div className="flex  gap-4">

                    <InputText
                        label="Billetes de 50"
                        name="fyfty"
                        value={data?.fyfty}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                    <InputText
                        label="Billetes de 100"
                        name="oneHundred"
                        value={data?.oneHundred}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                </div>
                <div className="flex  gap-4">
                    <InputText
                        label="Billetes de 500"
                        name="fiveHundred"
                        value={data?.fiveHundred}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                    <InputText
                        label="Billetes de 1000"
                        name="oneThousand"
                        value={data?.oneThousand}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                    />
                </div>
                <div className="flex flex-col gap-4 px-24">

                    <InputText
                        label="Total dolar"
                        name="totalDollar"
                        value={data.totalDollar}
                        onChange={inputChange}
                        icon={<p>$</p>}
                    />
                    <InputText
                        label="Total córdoba"
                        name="totalCordoba"
                        value={formatNumber(total)}
                        icon={<p>C$</p>}
                        readonly
                    />
                </div>
            </div>

        </RenderModal>
    )
}
