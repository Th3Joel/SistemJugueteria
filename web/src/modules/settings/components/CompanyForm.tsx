import { Button } from "@mui/material";
import { InputText } from "@/modules/core/components/Input";
import { useForm } from "@/modules/core/hooks/useForm.ts";
import { useEffect } from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import { FaBuilding, FaBuildingUser, FaEnvelope, FaMapLocationDot, FaPhone } from "react-icons/fa6";
import { AuthState } from "@/modules/core/states/auth-state";
import { useImg } from "@/modules/core/hooks/useImg";
import logoImg from "@/assets/logo.jpg";

interface IFormData {
    Name: string;
    Email: string;
    Phone: string;
    Ruc: string;
    Address: string;
    PriceDollar: string;
}

export const CompanyForm = () => {
    const { company, verify } = AuthState();
    const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
        Name: company.Name ?? "",
        Email: company.Email ?? "",
        Phone: company.Phone ?? "",
        Ruc: company.Ruc ?? "",
        Address: company.Address ?? "",
        PriceDollar: company.PriceDollar ?? ""
    });
    const { fileRef, img, handleFile, handleInputFile } = useImg();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/settings/company", e.currentTarget, true).then((e) => {
            if (e) {
                verify();
            }
        });
    };

    useEffect(() => {
        get("/settings/company");
    }, []); 
    return (
        <div className="animate__fadeIn">
            <div
                className="w-[350px] h-[250px] flex flex-col gap-1 my-3 shadow-lg rounded-lg justify-center items-center">
                <img src={img ? img : company.Logo == "" ? logoImg : "/api/settings/company/logo"} width={150} alt="logo" />
                <h1 className="text-xl font-semibold">{data?.Name}</h1>
                <h2 className="text-lg font-semibold text-gray-500">{data?.Email}</h2>
            </div>
            <div className={'w-[350px] flex flex-col gap-2 shadow-lg rounded-md py-2 companyForm'} >
                <h1 className={'text-center font-semibold text-lg text-gray-600'}>Actualizar datos de la empresa</h1>
                <form className="mx-5 flex flex-col gap-3" onSubmit={handleSubmit} encType="multipart/form-data">
                    <span className={'flex items-center'}>
                        <p className={'w-[50px] mr-4'}>Logo</p>
                        <div onClick={handleInputFile}
                            className={'mx-auto bg-gray-300 cursor-pointer w-full text-center border px-3 py-2 rounded-lg'}>
                            Seleccionar imagen
                            <input type="file" accept='image/*' name="file0" onChange={handleFile} className="hidden" ref={fileRef} />

                        </div>
                    </span>
                    <InputText
                        label="Nombre de la empresa"
                        name="Name"
                        isRequired
                        onChange={inputChange}
                        error={!!errors?.Name}
                        helperText={errors?.Name}
                        value={data.Name}
                        icon={<FaBuilding />}
                    />

                    <InputText
                        label="Correo electrónico"
                        name="Email"
                        onChange={inputChange}
                        error={!!errors?.Email}
                        helperText={errors?.Email}
                        value={data.Email}
                        icon={<FaEnvelope />}
                    />

                    <InputText
                        label="Número de registro"
                        name="Ruc"
                        onChange={inputChange}
                        error={!!errors?.Ruc}
                        helperText={errors?.Ruc}
                        value={data.Ruc}
                        icon={<FaBuildingUser />}
                    />

                    <InputText
                        label="Teléfono"
                        name="Phone"
                        onChange={inputChange}
                        error={!!errors?.Phone}
                        helperText={errors?.Phone}
                        value={data.Phone}
                        icon={<FaPhone />}
                    />

                    <InputText
                        label="Dirección"
                        name="Address"
                        onChange={inputChange}
                        error={!!errors?.Address}
                        helperText={errors?.Address}
                        value={data.Address}
                        icon={<FaMapLocationDot />}
                    />

                    <InputText
                        label="Precio del dólar"
                        name="PriceDollar"
                        onChange={inputChange}
                        error={!!errors?.PriceDollar}
                        helperText={errors?.PriceDollar}
                        value={data.PriceDollar}
                        icon={<p>C$</p>}
                    />

                    <Button variant="contained" color="primary" type="submit" size="small" fullWidth>{loading ? <LoaderBtn /> : "Actualizar"}</Button>
                </form>
            </div>
        </div>
    )
}
