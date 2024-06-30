import userImg from "@/assets/user.png";
import {InputText} from "@/modules/core/components/InputText.tsx";
import {
    DriveFileRenameOutlineRounded,
    EmailRounded,
    KeyRounded,
    LockPersonRounded,
    LockRounded
} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "@/modules/core/hooks/useForm.ts";
import React, {useEffect} from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import {AuthState} from "@/modules/core/globalStates/auth-state.ts";

interface IProps {
    isEdit?: boolean;
    isProfile?: boolean;
    id?: string;
}

interface IFormData {
    name: string;
    email: string;
    role: string;
    password: string;
    confirm: string;
}

export const UsersForm:React.FC<IProps> = ({isEdit,id,isProfile}) => {
    const {user,verify} = AuthState();

    const {post, errors, loading, data, get, inputChange} = useForm<IFormData>({
        name: isProfile ? user.name : '',
        email: isProfile ? user.email : '',
        role:'',
        password: "",
        confirm: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(isEdit ? `/settings/users${!isProfile ? '/'+id : ''}` : "/settings/users", e, isEdit).then((res) => {
            if (res && !isProfile) {
                navigate("/settings/users");
            }else{
                verify();
            }
        });
    };

    useEffect(() => {
        if (isEdit && !isProfile) {
            get("/settings/users/user/" + id);
        }
    }, []);
    return (
        <div className="w-[330px] rounded-lg shadow-lg">
            <header className=" font-weight-400 text-xl text-center">
                {isProfile ? "Editar perfil" : "Agregar usuario"}
            </header>
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <img
                        src={userImg}
                        alt=""
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                    <span
                        className="mx-auto bg-gray-300 cursor-pointer text-center w-[300px] border px-3 py-2 rounded-md">
              Seleccionar imagen
            </span>
                </div>
                <section className="mt-3 flex flex-col gap-3">
                    <InputText
                        label="Nombre"
                        name="name"
                        icon={<DriveFileRenameOutlineRounded/>}
                        isRequired
                        onChange={inputChange}
                        error={!!errors?.name}
                        helperText={errors?.name}
                        value={data?.name}
                    />

                    <InputText
                        label="Correo electrónico"
                        name="email"
                        isRequired
                        icon={<EmailRounded/>}
                        onChange={inputChange}
                        error={!!errors?.email}
                        helperText={errors?.email}
                        value={data?.email}
                    />
                    {!isProfile && <InputText
                        label="Tipo de usuario"
                        name="role"
                        icon={<LockPersonRounded/>}
                        type="select"
                        error={!!errors?.role}
                        helperText={errors?.role}
                        options={[{key: "admin", value: "Administrador"}, {
                            key: "vendedor",
                            value: "Vendedor"
                        }, {key: "bodega", value: "Bodega"}]}
                    />}

                    {isEdit && <h4 className="text-gray-500 ml-2 -my-2">Actualizar contraseña (opcional)</h4>}
                    <InputText
                        label="Contraseña"
                        name="password"
                        isRequired
                        icon={<LockRounded/>}
                        onChange={inputChange}
                        error={!!errors?.password}
                        helperText={errors?.password}
                        value={data?.password}
                    />
                    <InputText
                        label="Repetir contraseña"
                        name="confirm"
                        isRequired
                        onChange={inputChange}
                        error={!!errors?.confirm}
                        helperText={errors?.confirm}
                        icon={<KeyRounded/>}
                        value={data?.confirm}
                    />
                    <div className="flex justify-between">
                        <Link to="/settings/users">
                            <Button variant="contained" type="button">
                                Atrás
                            </Button>
                        </Link>
                        <Button type="submit" disabled={loading} variant="contained">
                            {loading ? <LoaderBtn/> : "Actualizar"}
                        </Button>
                    </div>
                </section>
            </form>
        </div>
    );
}