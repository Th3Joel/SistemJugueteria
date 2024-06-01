import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useForm } from "@/modules/core/hooks/useForm";
import {
  BusinessRounded,
  DriveFileRenameOutlineRounded,
  EmailRounded,
  LocalPhoneRounded,
} from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
  const { post, errors,loading, data, get, inputChange } = useForm<IFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(isEdit ? `/clientes/${id}` : "/clientes", e, isEdit);
  };

  useEffect(() => {
    if (isEdit) {
      get("/clientes/" + id);
      window.document.title = "Editar Cliente";
    } else {
      window.document.title = "Crear Cliente";
    }
  }, []);
  return (
    <div className="w-[300px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextField
          label="Nombre"
          name="name"
          value={data?.name}
          placeholder="               (requerido)"
          variant="filled"
          onChange={inputChange}
          error={!!errors?.name}
          helperText={errors?.name}
          size="small"
          className="w-full"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DriveFileRenameOutlineRounded />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Celular"
          onChange={inputChange}
          variant="filled"
          name="phone"
          value={data?.phone}
          error={!!errors?.phone}
          helperText={errors?.phone}
          size="small"
          className="w-full"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneRounded />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Correo electrónico"
          variant="filled"
          value={data?.email}
          size="small"
          onChange={inputChange}
          name="email"
          error={!!errors?.email}
          helperText={errors?.email}
          className="w-full"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRounded />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Dirección"
          variant="filled"
          size="small"
          value={data?.address}
          onChange={inputChange}
          name="address"
          error={!!errors?.address}
          helperText={errors?.address}
          className="w-full"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessRounded />
              </InputAdornment>
            ),
          }}
        />
        <div className="flex justify-between">
          <Link to="/clientes">
            <Button variant="contained" type="button">
              Atrás
            </Button>
          </Link>
          <Button type="submit" disabled={loading} variant="contained">
           {loading ? <LoaderBtn/> : "Guardar"} 
          </Button>
        </div>
      </form>
    </div>
  );
};
