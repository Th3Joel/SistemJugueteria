import { TitleState } from "@/modules/core/states/title-state";
import { StateDriver, stepsFormAdd } from "@/modules/core/utils/driver";
import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";
import { useEffect } from "react";

const AddUsers = () => {
    const { setTitle } = TitleState();
    const {setSteps} = StateDriver();
    useEffect(() => {
        setTitle("Configuración | Agregar usuario");
        setSteps(stepsFormAdd);
    }, [])
    return (
        <div className="flex justify-center formAdd">
            <UsersForm/>
        </div>
    )
}
 
export default AddUsers;