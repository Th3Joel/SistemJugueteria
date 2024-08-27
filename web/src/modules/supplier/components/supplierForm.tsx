import {InputText} from "@/modules/core/components/Input";
import {FaEnvelope, FaICursor, FaMapLocationDot, FaPhone} from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import {useForm} from "@/modules/core/hooks/useForm.ts";
import React, {useEffect} from "react";

interface IProps {
    isEdit?: boolean;
    id?: string;
}
interface IFormData{
    Name: string,
    Email: string,
    Address: string,
    Phone: string
}

export const SupplierForm:React.FC<IProps> = ({ isEdit, id }) => {
    const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
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
    return (<div className="w-[350px] p-3 shadow-lg rounded-lg">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

            <InputText
                label="Nombre"
                name="Name"
                value={data?.Name}
                isRequired={true}
                onChange={inputChange}
                error={!!errors?.Name}
                helperText={errors?.Name}
                icon={<FaICursor/>}
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


            <div className="flex justify-between">
                <Link to="/suppliers">
                    <Button variant="contained" type="button">
                        Atrás
                    </Button>
                </Link>
                <Button variant="contained" type="submit">
                    {loading ? <LoaderBtn/> : "Guardar"}
                </Button>
            </div>
        </form>
    </div>)
}