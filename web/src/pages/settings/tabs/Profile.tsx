import { TitleState } from "@/modules/core/states/title-state";
import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";
import { useEffect } from "react";

const Profile = () => {
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Configuración | Perfil");
    }, [])
    return (
        <div className="flex justify-center animate__fadeIn">
            <UsersForm isProfile isEdit/>
        </div>
    );
};
export default Profile;