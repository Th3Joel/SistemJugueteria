import { InputText } from "@/modules/core/components/Input";
import { FaBuilding, FaEnvelope, FaICursor, FaMapLocationDot, FaPhone } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import { useForm } from "@/modules/core/hooks/useForm.ts";
import React, { useEffect } from "react";

interface IProps {
    isEdit?: boolean;
    id?: string;
}
interface IFormData {
    Company: string,
    Name: string,
    Email: string,
    Address: string,
    Phone: string
}

export const SupplierForm: React.FC<IProps> = ({ isEdit, id }) => {
    const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
        Company: "",
        Name: "",
        Email: "",
        Address: "",
        Phone: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(isEdit ? `/suppliers/${id}` : "/suppliers", e.currentTarget, isEdit).then((res) => {
            if (res) {
                navigate("/suppliers");
            }
        });
    };



    useEffect(() => {
        if (isEdit) {
            get("/suppliers/" + id).then();
        }
    }, []);
    return (
        <div className="w-[350px] pb-5 px-5 shadow-lg rounded-lg border">
            <h2 className="text-center text-red-500 text-sm my-2">Campo obligatorios *</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <InputText
                    label="Empresa"
                    name="Company"
                    value={data?.Company}
                    isRequired={true}
                    onChange={inputChange}
                    error={!!errors?.Company}
                    helperText={errors?.Company}
                    icon={<FaBuilding />}
                />

                <InputText
                    label="Nombre *"
                    name="Name"
                    value={data?.Name}
                    isRequired={true}
                    onChange={inputChange}
                    error={!!errors?.Name}
                    helperText={errors?.Name}
                    icon={<FaICursor />}
                />
                <InputText
                    label="Celular"
                    name="Phone"
                    value={data?.Phone}
                    onChange={inputChange}
                    error={!!errors?.Phone}
                    helperText={errors?.Phone}
                    icon={<FaPhone />}
                />

                <InputText
                    label="Correo electrónico"
                    name="Email"
                    value={data?.Email}
                    onChange={inputChange}
                    error={!!errors?.Email}
                    helperText={errors?.Email}
                    type="email"
                    icon={<FaEnvelope />}
                />

                <InputText
                    label="Dirección"
                    name="Address"
                    value={data?.Address}
                    onChange={inputChange}
                    error={!!errors?.Address}
                    helperText={errors?.Address}
                    icon={<FaMapLocationDot />}
                />
                <Button variant="contained" type="submit">
                    {loading ? <LoaderBtn /> : isEdit ? "Actualizar" : "Guardar"}
                </Button>
            </form>
        </div>)
}