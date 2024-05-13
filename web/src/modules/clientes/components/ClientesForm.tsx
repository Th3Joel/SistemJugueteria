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
  nombre: string;
  apellido: string;
  celular: string;
  correo: string;
  direccion: string;
}

export const ClientesForm: React.FC<IProps> = ({ isEdit, id }) => {
  const { post, errors,loading, data, get, inputChange } = useForm<IFormData>({
    nombre: "",
    apellido: "",
    celular: "",
    correo: "",
    direccion: "",
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
          name="nombre"
          value={data?.nombre}
          placeholder="               (requerido)"
          variant="filled"
          onChange={inputChange}
          error={!!errors?.nombre}
          helperText={errors?.nombre}
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
          label="Apellido"
          variant="filled"
          onChange={inputChange}
          name="apellido"
          value={data?.apellido}
          size="small"
          error={!!errors?.apellido}
          helperText={errors?.apellido}
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
          name="celular"
          value={data?.celular}
          error={!!errors?.celular}
          helperText={errors?.celular}
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
          value={data?.correo}
          size="small"
          onChange={inputChange}
          name="correo"
          error={!!errors?.correo}
          helperText={errors?.correo}
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
          value={data?.direccion}
          onChange={inputChange}
          name="direccion"
          error={!!errors?.direccion}
          helperText={errors?.direccion}
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
