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
  window.document.title = "Iniciar sesión";
  return (
    <div className="animate__fadeIn w-[350px] border-[1px] border-t-blue-600 border-t-4 bg-white border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-2 mb-2">Coleccióname</h1>
      <hr className="border-gray-200" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6 py-3">
        <h3 className="text-center">Bienvenido</h3>
        <TextField
          name="Email"
          size="small"
          label="Correo"
          error={!(!errors.Email)}
          helperText={errors.Email}
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
          name="Password"
          size="small"
          type="password"
          error={!(!errors.Password)}
          helperText={errors.Password}
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
