import logoImg from '@/assets/logo.jpg'
import {Button} from "@mui/material";
import {InputText} from "@/modules/core/components/InputText.tsx";
import {useForm} from "@/modules/core/hooks/useForm.ts";
import {useEffect} from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import {FaBuilding, FaBuildingUser, FaEnvelope, FaMapLocationDot, FaPhone} from "react-icons/fa6";

interface IFormData {
    name: string;
    email: string;
    phone: string;
    ruc: string;
    address: string;
}

export const CompanyForm = () => {
    const {post, errors, loading, data, get, inputChange} = useForm<IFormData>({
        name: '',
        email: '',
        phone: '',
        ruc: '',
        address: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/settings/company", e,true).then(() => {});
    };

    useEffect(() => {
        get("/settings/company");
    }, []);
    return (
        <>
            <div
                className="w-[350px] h-[250px] flex flex-col gap-1 py-2 shadow-lg rounded-lg justify-center items-center">
                <img src={logoImg} width={150} height={150} alt="logo"/>
                <h1 className="text-xl font-semibold">{data?.name}</h1>
                <h2 className="text-lg font-semibold text-gray-500">{data?.email}</h2>
            </div>
            <div className={'w-[350px] flex flex-col gap-2 shadow-lg rounded-md py-2'}>
                <h1 className={'text-center font-semibold text-lg text-gray-600'}>Actualizar datos de la empresa</h1>
                <form className="mx-5 flex flex-col gap-3" onSubmit={handleSubmit}>
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
                        isRequired
                        onChange={inputChange}
                        error={!!errors?.name}
                        helperText={errors?.name}
                        value={data?.name}
                        icon={<FaBuilding/>}
                    />

                    <InputText
                        label="Correo electrónico"
                        name="email"
                        onChange={inputChange}
                        error={!!errors?.email}
                        helperText={errors?.email}
                        value={data?.email}
                        icon={<FaEnvelope/>}
                    />

                    <InputText
                        label="Número de registro"
                        name="ruc"
                        onChange={inputChange}
                        error={!!errors?.ruc}
                        helperText={errors?.ruc}
                        value={data?.ruc}
                        icon={<FaBuildingUser/>}
                    />

                    <InputText
                        label="Teléfono"
                        name="phone"
                        onChange={inputChange}
                        error={!!errors?.phone}
                        helperText={errors?.phone}
                        value={data?.phone}
                        icon={<FaPhone/>}
                    />

                    <InputText
                        label="Dirección"
                        name="address"
                        onChange={inputChange}
                        error={!!errors?.address}
                        helperText={errors?.address}
                        value={data?.address}
                        icon={<FaMapLocationDot/>}
                    />

                    <Button variant="contained" color="primary" type="submit" size="small" fullWidth>{loading ? <LoaderBtn/> : "Actualizar"}</Button>
                </form>
            </div>
        </>
    )
}