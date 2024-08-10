import { Button} from "@mui/material";
import { Link as LinkR } from "react-router-dom";
import { IErrors, loginFetch } from "../utils/authFetch";
import { FormEvent, useState } from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { InputText } from "@/modules/core/components/InputText";
import { FaEnvelope, FaKey } from "react-icons/fa6";



export const LoginForm = () => {

  const [errors, setErrors] = useState<IErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginFetch(new FormData(e.target as HTMLFormElement), setErrors);
  };
  return (
    <div className="animate__fadeIn w-[350px] border-[1px] border-t-blue-600 border-t-4 bg-white border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-2 mb-2">Coleccióname</h1>
      <hr className="border-gray-200" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6 py-3">
        <h3 className="text-center">Bienvenido</h3>
        <InputText
          name="Email"
          label="Correo electrónico"
          error={!(!errors.Email)}
          helperText={errors.Email}
          icon={<FaEnvelope />}
        />
        <InputText
          name="Password"
          type="password"
          error={!(!errors.Password)}
          helperText={errors.Password}
          label="Contraseña"
          icon={<FaKey />}
        />
        <Button type="submit" disabled={errors.loading} variant="contained">
          {errors.loading ? <LoaderBtn /> : "Iniciar sesión"}
        </Button>
          <LinkR to="/auth/forgot-password" className="text-center text-blue-500 underline">
            ¿Hás olvidado tu contraseña?

          </LinkR>
      </form>
    </div>
  );
};
