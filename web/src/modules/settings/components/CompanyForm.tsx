import logoImg from '@/assets/logo.jpg'
import {Button} from "@mui/material";
import {InputText} from "@/modules/core/components/InputText.tsx";
import {useForm} from "@/modules/core/hooks/useForm.ts";
import {useEffect} from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import {FaBuilding, FaBuildingUser, FaEnvelope, FaMapLocationDot, FaPhone} from "react-icons/fa6";

interface IFormData {
    Name: string;
    Email: string;
    Phone: string;
    Ruc: string;
    Address: string;
}

export const CompanyForm = () => {
    const {post, errors, loading, data, get, inputChange} = useForm<IFormData>({
        Name: '',
        Email: '',
        Phone: '',
        Ruc: '',
        Address: ''
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
                <h1 className="text-xl font-semibold">{data?.Name}</h1>
                <h2 className="text-lg font-semibold text-gray-500">{data?.Email}</h2>
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
                        name="Name"
                        isRequired
                        onChange={inputChange}
                        error={!!errors?.Name}
                        helperText={errors?.Name}
                        value={data?.Name}
                        icon={<FaBuilding/>}
                    />

                    <InputText
                        label="Correo electrónico"
                        name="Email"
                        onChange={inputChange}
                        error={!!errors?.Email}
                        helperText={errors?.Email}
                        value={data?.Email}
                        icon={<FaEnvelope/>}
                    />

                    <InputText
                        label="Número de registro"
                        name="Ruc"
                        onChange={inputChange}
                       error={!!errors?.Ruc}
                        helperText={errors?.Ruc}
                        value={data?.Ruc}
                        icon={<FaBuildingUser/>}
                    />

                    <InputText
                        label="Teléfono"
                        name="Phone"
                        onChange={inputChange}
                        error={!!errors?.Phone}
                        helperText={errors?.Phone}
                        value={data?.Phone}
                        icon={<FaPhone/>}
                    />

                    <InputText
                        label="Dirección"
                        name="Address"
                        onChange={inputChange}
                        error={!!errors?.Address}
                        helperText={errors?.Address}
                        value={data?.Address}
                        icon={<FaMapLocationDot/>}
                    />

                    <Button variant="contained" color="primary" type="submit" size="small" fullWidth>{loading ? <LoaderBtn/> : "Actualizar"}</Button>
                </form>
            </div>
        </>
    )
}