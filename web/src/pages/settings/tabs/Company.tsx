import {CompanyForm} from "@/modules/settings/components/CompanyForm.tsx";

export const Company = () => {
    window.document.title = "Datos de la empresa";
    return (
        <div className="flex flex-wrap justify-center gap-7 m-2">
            <CompanyForm/>
        </div>
    )
}
