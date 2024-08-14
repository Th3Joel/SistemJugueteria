import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";

const Profile = () => {
    return (
        <div className="flex justify-center animate__fadeIn">
            <UsersForm isProfile isEdit/>
        </div>
    );
};
export default Profile;