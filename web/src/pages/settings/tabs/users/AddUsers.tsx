import { TitleState } from "@/modules/core/states/title-state";
import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";
import { useEffect } from "react";

const AddUsers = () => {
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Configuración | Agregar usuario");
    }, [])
    return (
        <div className="flex justify-center">
            <UsersForm/>
        </div>
    )
}

export default AddUsers;