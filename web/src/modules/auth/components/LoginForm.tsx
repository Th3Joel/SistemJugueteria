import { AccountCircle, Key } from "@mui/icons-material";
import { Button, InputAdornment, Link, TextField } from "@mui/material";
import { IErrors, loginFetch } from "../utils/authFetch";
import { FormEvent, useState } from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn";



export const LoginForm = () => {

  const [errors,setErrors] = useState<IErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginFetch(new FormData(e.target as HTMLFormElement),setErrors);
  };
  return (
    <div className="animate__animated animate__zoomIn w-[350px] border-[1px] border-t-blue-600 border-t-4 bg-white border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-2 mb-2">Coleccióname</h1>
      <hr className="border-gray-200" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6 py-2">
        <h3 className="text-center">Bienvenido</h3>
        <TextField
          name="email"
          size="small"
          label="Correo"
          error={!(!errors.email)}
          helperText={errors.email}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="password"
          size="small"
          type="password"
          error={!(!errors.password)}
          helperText={errors.password}
          label="Contraseña"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" disabled={errors.loading} variant="contained">
         {errors.loading ? <LoaderBtn/> : "Iniciar session"}
        </Button>
        <Link className="text-center">¿Hás olvidado tu contraseña</Link>
      </form>
    </div>
  );
};
