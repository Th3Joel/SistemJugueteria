import { OpenCash } from "@/modules/cashRegister/OpenCash";
import { ReqOpenCash } from "@/modules/cashRegister/ReqOpenCash";
import CashRegisterState from "@/modules/cashRegister/states/cashRegisterState";
import LoaderSmall from "@/modules/core/components/LoaderSmall";
import { StateDriver, stepsCashRegister } from "@/modules/core/utils/driver";
import { useEffect, useState } from "react";


const YouBox = () => {
    const { verify, state } = CashRegisterState();
  const { setSteps } = StateDriver();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        verify().then(()=>{
            setLoading(false)
        });
        setSteps(stepsCashRegister)
    }, [])
     
    return <>
        {
            loading ?
                <div className="p-8 flex justify-center">
                    <LoaderSmall />
                </div>
                : state ? <OpenCash /> : <ReqOpenCash />
        }
    </>
}

export default YouBox;