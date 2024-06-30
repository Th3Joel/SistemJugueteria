import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useForm } from "@/modules/core/hooks/useForm";
import {
  BusinessRounded,
  DriveFileRenameOutlineRounded,
  EmailRounded,
  LocalPhoneRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {InputText} from "@/modules/core/components/InputText.tsx";

interface IProps {
  isEdit?: boolean;
  id?: string;
}

interface IFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const ClientesForm: React.FC<IProps> = ({ isEdit, id }) => {
  const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(isEdit ? `/clientes/${id}` : "/clientes", e, isEdit).then((res) => {
      if (res) {
        navigate("/clientes");
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      get("/clientes/" + id);
    }

  }, []);
  return (
    <div className="w-[340px] shadow-lg rounded-lg p-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <InputText
            label="Nombre"
            name="name"
            value={data?.name}
            isRequired={true}
            onChange={inputChange}
            error={!!errors?.name}
            helperText={errors?.name}
            icon={<DriveFileRenameOutlineRounded/>}
        />
        <InputText
            label="Celular"
            name="phone"
            value={data?.phone}
            onChange={inputChange}
            error={!!errors?.phone}
            helperText={errors?.phone}
            icon={<LocalPhoneRounded />}
        />

        <InputText
            label="Correo electrónico"
            name="email"
            value={data?.email}
            onChange={inputChange}
            error={!!errors?.email}
            helperText={errors?.email}
            type="email"
            icon={<EmailRounded />}
        />

        <InputText
            label="Dirección"
            name="address"
            value={data?.address}
            onChange={inputChange}
            error={!!errors?.address}
            helperText={errors?.address}
            icon={<BusinessRounded />}
        />

        <div className="flex justify-between">
          <Link to="/clientes">
            <Button variant="contained" type="button">
              Atrás
            </Button>
          </Link>
          <Button type="submit" disabled={loading} variant="contained">
            {loading ? <LoaderBtn /> : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
