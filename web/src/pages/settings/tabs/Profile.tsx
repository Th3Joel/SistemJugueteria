import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";

export const Profile = () => {
    return (
        <div className="flex justify-center animate__fadeIn">
            <UsersForm isProfile isEdit/>
        </div>
    );
};
