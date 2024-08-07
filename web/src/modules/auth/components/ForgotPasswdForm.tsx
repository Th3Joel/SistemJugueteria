import { InputText } from "@/modules/core/components/InputText"
import LoaderBtn from "@/modules/core/components/LoaderBtn"
import { Button } from "@mui/material"
import { FaEnvelope } from "react-icons/fa6"
import { Link } from "react-router-dom"

export const ForgotPasswdForm = () => {
  let errors = { loading: false };
  return (
    <div className="animate__fadeIn w-[350px] border-[1px] border-t-blue-600 border-t-4 bg-white border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-2 mb-2">Coleccióname</h1>
      <hr className="border-gray-200" />

      <form className="flex flex-col gap-3 px-6 py-3">
        <h3 className="text-center">¿Hás olvidado tu contraseña?</h3>
        <InputText
          name="Email"
          label="Correo electrónico"
          icon={<FaEnvelope />}
        />
        
        <Button type="submit" disabled={errors.loading} variant="contained">
          {errors.loading ? <LoaderBtn /> : "Enviar solicitud"}
        </Button>
        <Link to="/auth/login" className="text-center text-blue-500 underline">
          Ir a inicio de sesión

        </Link>
      </form>
    </div>
  )
}
