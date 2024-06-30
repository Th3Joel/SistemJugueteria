import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";

export const AddUsers = () => {
    window.document.title = "Crear Usuario";
    return (
        <div className="flex justify-center">
            <UsersForm/>
        </div>
    )
}
