import { InputText } from "@/modules/core/components/Input";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@/modules/core/hooks/useForm.ts";
import React, { useEffect } from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import { AuthState } from "@/modules/core/states/auth-state";
import { FaEnvelope, FaICursor, FaKey, FaUnlockKeyhole, FaUserLock } from "react-icons/fa6";
import { useImg } from "@/modules/core/hooks/useImg";
import userImg from "@/assets/user.png";

interface IProps {
    isEdit?: boolean;
    isProfile?: boolean;
    id?: string;
}

interface IFormData {
    Name: string;
    Email: string;
    Role: string;
    Picture: string;
    Password: string;
    Confirm: string;
}

export const UsersForm: React.FC<IProps> = ({ isEdit, id, isProfile }) => {
    const { user, verify } = AuthState();

    const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
        Name: isProfile ? user.Name : '',
        Email: isProfile ? user.Email : '',
        Role: '',
        Picture:"",
        Password: "",
        Confirm: ""
    });

    const navigate = useNavigate();
    const { fileRef, img, handleFile, handleInputFile } = useImg();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(isEdit ? `/settings/users${!isProfile ? '/' + id : ''}` : "/settings/users", e.currentTarget, isEdit).then((res) => {
            if (res && !isProfile) {
                navigate("/settings/users");
            } else {
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
        <div className="w-[330px] rounded-lg shadow-lg animate__fadeIn my-3">
            <header className=" font-weight-400 text-xl text-center">
                {isProfile ? "Editar perfil" : "Agregar usuario"}
            </header>
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <img
                        src={
                            img ? img 
                            : 
                            isProfile ? user.Picture ? `/api/settings/users/picture/${user.Email}` : userImg
                            : 
                            data.Picture ? `/api/settings/users/picture/${data.Email}` 
                            : 
                            userImg}
                        alt="profile pic"
                        width={60}
                        height={60}
                        className="rounded-full"
                    /> 
                    <div onClick={handleInputFile}
                            className={'mx-auto bg-gray-300 cursor-pointer w-full text-center border px-3 py-2 rounded-lg'}>
                            Seleccionar imagen
                            <input type="file" accept='image/*' name="file0" onChange={handleFile} className="hidden" ref={fileRef} />

                        </div>
                </div>
                <section className="mt-3 flex flex-col gap-3">
                    <InputText
                        label="Nombre"
                        name="Name"
                        icon={<FaICursor />}
                        isRequired
                        onChange={inputChange}
                        error={!!errors?.Name}
                        helperText={errors?.Name}
                        value={data?.Name}
                    />

                    <InputText
                        label="Correo electrónico"
                        name="Email"
                        isRequired
                        icon={<FaEnvelope />}
                        onChange={inputChange}
                        error={!!errors?.Email}
                        helperText={errors?.Email}
                        value={data?.Email}
                    />
                    {!isProfile &&
                        <InputText
                            label="Tipo de usuario"
                            name="Role"
                            icon={<FaUserLock />}
                            type="select"
                            error={!!errors?.Role}
                            helperText={errors?.Role}
                            value={data.Role}
                            options={[
                                { key: "admin", value: "Administrador" },
                                { key: "vendedor", value: "Vendedor" }
                            ]}
                        />
                    }

                    {isEdit && <h4 className="text-gray-500 ml-2 -my-2">Actualizar contraseña (opcional)</h4>}
                    <InputText
                        label="Contraseña"
                        name="Password"
                        type="password"
                        isRequired
                        icon={<FaUnlockKeyhole />}
                        onChange={inputChange}
                        error={!!errors?.Password}
                        helperText={errors?.Password}
                        value={data.Password || ''}
                    />
                    <InputText
                        label="Repetir contraseña"
                        name="Confirm"
                        type="password"
                        isRequired
                        onChange={inputChange}
                        error={!!errors?.Confirm}
                        helperText={errors?.Confirm}
                        icon={<FaKey />}
                        value={data.Confirm || ''}
                    />
                    {
                        isProfile ?
                            <Button type="submit" disabled={loading} variant="contained">
                                {loading ? <LoaderBtn /> : "Actualizar"}
                            </Button>
                            :
                            <div className="flex justify-between">
                                <Link to="/settings/users">
                                    <Button variant="contained" type="button">
                                        Atrás
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={loading} variant="contained">
                                    {loading ? <LoaderBtn /> : isEdit ? "Actualizar" : "Guardar"}
                                </Button>
                            </div>
                    }

                </section>
            </form>
        </div>
    );
}