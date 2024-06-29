import userImg from "@/assets/user.png";
import {
    DriveFileRenameOutlineRounded,
    EmailRounded,
    KeyRounded,
    LockPersonRounded,
    LockRounded
} from "@mui/icons-material";
import {Button,} from "@mui/material";
import {InputText} from "@/modules/core/components/InputText.tsx";

export const Profile = () => {
    return (
        <div className="flex justify-center">
            <div className="w-[330px] rounded-lg shadow-lg">
                <header className=" font-weight-400 text-xl text-center">
                    Actualizar perfil
                </header>
                <form className="p-3">
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
                        />

                        <InputText
                            label="Correo electrónico"
                            name="email"
                            icon={<EmailRounded/>}
                        />

                        <InputText
                            label="Tipo de usuario"
                            name="role"
                            icon={<LockPersonRounded/>}
                            type="select"
                            options={[{key:"asdf",value:"Administrador"},{key:"asdfasdf",value:"Vendedor"},{key:"asdfaf",value:"Bodega"}]}
                        />

                        <span className="flex flex-col gap-3">
                            <h4 className="text-gray-500 ml-2 ">Actualizar contraseña</h4>
                            <InputText
                                label="Contraseña"
                                name="password"
                                icon={<LockRounded/>}
                            />
                            <InputText
                                label="Repetir contraseña"
                                name="confirmPassword"
                                icon={<KeyRounded/>}
                            />

                        </span>

                        <Button type="button" variant="contained">Actualizar</Button>
                    </section>
                </form>
            </div>
        </div>
    );
};
