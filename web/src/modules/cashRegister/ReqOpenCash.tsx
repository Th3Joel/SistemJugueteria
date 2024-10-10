import { Button } from "@mui/material"
import { InputText } from "../core/components/Input"
import { Raya } from "../core/components/Raya"
import cashImage from "@/assets/cash.png";
import { useForm } from "../core/hooks/useForm";
import LoaderBtn from "../core/components/LoaderBtn";
import CashRegisterState from "./states/cashRegisterState";

interface IReqOpenCash {
    InitialBalance: string
}
export const ReqOpenCash = () => {
    const { post, loading, inputChange, data,errors } = useForm<IReqOpenCash>({
        InitialBalance: "",
    });
    const {verify} = CashRegisterState();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/cash-register/open", e.currentTarget).then((res) => {
           if(res){
                verify()
           }
        })
    }
 
    return (
        <div className="flex justify-center my-5">
            <form className="flex shadow-lg rounded-xl p-3 cashRegisterReqOpen" onSubmit={handleSubmit}>
                <img src={cashImage} alt="cashImage" width={170} className="mr-9" />
                <Raya />

                <div className="flex flex-col gap-2 justify-center ml-9">
                    <h1 className="text-xl font-bold">
                        Abrir caja
                    </h1>
                    <span className="w-[200px]">
                        <InputText
                            label="Monto inicial"
                            name="InitialBalance"
                            value={data?.InitialBalance}
                            error={!!errors?.InitialBalance}
                            helperText={errors?.InitialBalance}
                            onChange={inputChange}
                            icon={<p>C$</p>}
                        />
                    </span>
                    <Button type="submit" disabled={loading} variant="contained" sx={{ marginTop: "20px", width: "100px" }}>
                        {loading ? <LoaderBtn /> : "Hecho"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
