import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";

export const Profile = () => {
    window.document.title = "Perfil de Usuario";
    return (
        <div className="flex justify-center">
            <UsersForm isProfile isEdit/>
        </div>
    );
};
