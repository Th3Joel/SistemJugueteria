import { TitleState } from "@/modules/core/states/title-state";
import {CompanyForm} from "@/modules/settings/components/CompanyForm.tsx";
import { useEffect } from "react";

const Company = () => {
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Configuración | Datos de empresa");
    }, [])
    return (
        <div className="flex flex-wrap justify-center gap-7">
            <CompanyForm/>
        </div>
    )
}
export default Company;