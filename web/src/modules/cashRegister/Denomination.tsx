import { InputText } from "../core/components/Input"
import { useForm } from "../core/hooks/useForm"
import { formatNumber } from "../core/utils/formatNumber"
import CashRegisterState from "./states/cashRegisterState"
import { Button } from "@mui/material"

export interface IDenomination {
    One: string
    Five: string
    Ten: string
    Twenty: string
    Fyfty: string
    OneHundred: string
    TwoHundred: string
    FiveHundred: string
    OneThousand: string
    TotalDollar: string
    TotalCordoba: string
}
export const Denomination: React.FC = () => {
    const {
        Denomination,
        errors,
        verify,
        inputChange,
        cleanDeno
    } = CashRegisterState();
    const { post } = useForm<unknown>({})
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/cash-register/close", e.currentTarget).then((res) => {
            if (res) {

                verify()
            }
        });
    }


    return (
        <div>

            <form className="w-[390px] flex flex-col gap-7" onSubmit={handleSubmit}>

                <div className="flex gap-4">
                    <InputText
                        label="Monedas de 0.5"
                        name="ZeroPointFive"
                        value={Denomination.ZeroPointFive + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.ZeroPointFive}
                        helperText={errors.ZeroPointFive}
                    />
                    <InputText
                        label="Monedas de 1"
                        name="One"
                        value={Denomination.One + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.One}
                        helperText={errors.One}
                    />

                </div>
                <div className="flex  gap-4">
                    <InputText
                        label="Monedas de 5"
                        name="Five"
                        value={Denomination.Five + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.Five}
                        helperText={errors.Five}
                    />
                    <InputText
                        label="Billetes de 10"
                        name="Ten"
                        value={Denomination.Ten + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.Ten}
                        helperText={errors.Ten}
                    />

                </div>
                <div className="flex  gap-4">
                    <InputText
                        label="Billetes de 20"
                        name="Twenty"
                        value={Denomination.Twenty + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.Twenty}
                        helperText={errors.Twenty}
                    />
                    <InputText
                        label="Billetes de 50"
                        name="Fyfty"
                        value={Denomination.Fyfty + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.Fyfty}
                        helperText={errors.Fyfty}
                    />

                </div>
                <div className="flex  gap-4">
                    <InputText
                        label="Billetes de 100"
                        name="OneHundred"
                        value={Denomination.OneHundred + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.OneHundred}
                        helperText={errors.OneHundred}
                    />
                    <InputText
                        label="Billetes de 200"
                        name="TwoHundred"
                        value={Denomination.TwoHundred + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.TwoHundred}
                        helperText={errors.TwoHundred}
                    />


                </div>
                <div className="flex  gap-4">

                    <InputText
                        label="Billetes de 500"
                        name="FiveHundred"
                        value={Denomination.FiveHundred + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.FiveHundred}
                        helperText={errors.FiveHundred}
                    />
                    <InputText
                        label="Billetes de 1000"
                        name="OneThousand"
                        value={Denomination.OneThousand + ""}
                        onChange={inputChange}
                        icon={<p>C$</p>}
                        error={!!errors.OneThousand}
                        helperText={errors.OneThousand}
                    />
                </div>
                <hr />
                <small className="text-red-500 text-sm text-center -my-4">Campos obligatorios *</small>


                <div className="flex gap-4">
                    <span className="cashRegisterDenominationTotalDollar">

                        <InputText
                            label="Total dólar"
                            name="TotalDollar"
                            value={Denomination.TotalDollar + ""}
                            onChange={inputChange}
                            icon={<p>$</p>}
                            error={!!errors.DTotalDollar}
                            helperText={errors.DTotalDollar}

                        />
                    </span>
                    <span className="cashRegisterDenominationTotalCordoba">

                        <InputText
                            label="Total córdoba *"
                            name="TotalCordoba"
                            value={formatNumber(Denomination.TotalCordoba + "")}
                            icon={<p>C$</p>}
                            readonly
                            error={!!errors.DTotalCordoba}
                            helperText={errors.DTotalCordoba}
                            
                        />
                    </span>
                </div>

                <div className="w-full flex justify-center cashRegisterDenominationTotalClean">
                    <Button variant="contained" color="primary" onClick={() => cleanDeno()}>
                        Limpiar datos
                    </Button>
                </div>
            </form>

        </div>
    )
}
