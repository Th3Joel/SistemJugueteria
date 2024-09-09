import { OpenCash } from "@/modules/cashRegister/OpenCash";
import { ReqOpenCash } from "@/modules/cashRegister/ReqOpenCash";
import CashRegisterState from "@/modules/cashRegister/states/cashRegisterState";
import LoaderSmall from "@/modules/core/components/LoaderSmall";
import { useEffect } from "react";


const YouBox = () => {
    const { verify, state, loading } = CashRegisterState();
    useEffect(() => {
        verify();
    }, [])
    return loading ?
        <div className="p-8 flex justify-center">
            <LoaderSmall />
        </div>
        : state ? <OpenCash /> : <ReqOpenCash />

}

export default YouBox;