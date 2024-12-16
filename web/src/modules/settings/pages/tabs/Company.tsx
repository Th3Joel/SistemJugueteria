import { TitleState } from "@/modules/core/states/title-state";
import { StateDriver, stepsCompany } from "@/modules/core/utils/driver";
import {CompanyForm} from "@/modules/settings/components/CompanyForm.tsx";
import { useEffect } from "react";

const Company = () => {
    const { setTitle } = TitleState();
    const { setSteps } = StateDriver();

    useEffect(() => {
        setTitle("Configuración | Datos de empresa");
        setSteps(stepsCompany);
    }, [])
    return (
        <div className="flex flex-wrap justify-center gap-7">
            <CompanyForm/>
        </div>
    )
}
export default Company;