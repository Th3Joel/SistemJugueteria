import logoImg from '@/assets/logo.jpg'
import {Button} from "@mui/material";
import {
    BusinessRounded,
    DriveFileRenameOutlineRounded,
    EditRoadRounded,
    EmailRounded,
    PhoneRounded
} from "@mui/icons-material";
import {InputText} from "@/modules/core/components/InputText.tsx";

export const Company = () => {
    window.document.title = "Datos de la empresa";
    return (
        <div className="flex flex-wrap justify-center gap-7 m-2">
            <div
                className="w-[350px] h-[250px] flex flex-col gap-1 py-2 shadow-lg rounded-lg justify-center items-center">
                <img src={logoImg} width={150} height={150} alt="logo"/>
                <h1 className="text-xl font-semibold">Coleccióname</h1>
                <h2 className="text-lg font-semibold text-gray-500">colleccioname@gmail.com</h2>
            </div>
            <div className={'w-[350px] flex flex-col gap-2 shadow-lg rounded-md py-2'}>
                <h1 className={'text-center font-semibold text-lg text-gray-600'}>Actualizar datos de la empresa</h1>
                <form className="mx-5 flex flex-col gap-3">
                <span className={'flex items-center'}>
                    <p className={'w-[50px] mr-4'}>Logo</p>
                    <div
                        className={'mx-auto bg-gray-300 cursor-pointer w-full text-center border px-3 py-2 rounded-lg'}>
                        Seleccionar imagen
                    </div>
                </span>
                    <InputText
                        label="Nombre de la empresa"
                        name="name"
                        icon={<DriveFileRenameOutlineRounded/>}
                    />

                    <InputText
                        label="Correo electrónico"
                        name="email"
                        icon={<EmailRounded/>}
                    />

                    <InputText
                        label="Número de registro"
                        name="phone"
                        icon={<BusinessRounded/>}
                    />

                    <InputText
                        label="Teléfono"
                        name="phone"
                        icon={<PhoneRounded/>}
                    />

                    <InputText
                        label="Dirección"
                        name="address"
                        icon={<EditRoadRounded/>}
                    />

                    <Button variant="contained" color="primary" size="small" fullWidth>Actualizar</Button>
                </form>
            </div>
        </div>
    )
}
