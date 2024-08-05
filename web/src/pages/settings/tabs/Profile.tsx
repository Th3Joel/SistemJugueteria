import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";

export const Profile = () => {
    window.document.title = "Perfil de Usuario";
    return (
        <div className="flex justify-center animate__fadeIn">
            <UsersForm isProfile isEdit/>
        </div>
    );
};
