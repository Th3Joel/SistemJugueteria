import { InputText } from "@/modules/core/components/InputText";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { Button } from "@mui/material";
import { FaFingerprint, FaKey, FaUnlockKeyhole } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

interface IParams{
  [key: string]: string;
  code: string;
}

export const ResetPasswdForm = () => {
  let errors = {loading:false};
  const { code } = useParams<IParams>();
  return (
    <div className="animate__fadeIn w-[350px] border-[1px] border-t-blue-600 border-t-4 bg-white border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-2 mb-2">Coleccióname</h1>
      <hr className="border-gray-200" />

      <form  className="flex flex-col gap-3 px-6 py-3">
        <h3 className="text-center font-semibold">Restablecer contraseña</h3>
        <p className="text-center -mt-3">Copie el codigo de reinicio que te hemos enviado a tu correo y pegalo aqui abajo</p>
        <InputText 
          name="Email" 
          label="Código"
          value={code}
          icon={<FaFingerprint/>}
        />
        <InputText
          label="Nueva contraseña"
          name="Password"
          isRequired
          icon={<FaUnlockKeyhole />}
          value=""
        />
        <InputText
          label="Repetir contraseña"
          name="Confirm"
          isRequired
          icon={<FaKey />}
          value=""
        />
        <Button type="submit" disabled={errors.loading} variant="contained">
          {errors.loading ? <LoaderBtn /> : "Restablecer"}
        </Button>
          <Link to="/auth/login" className="text-center text-blue-500 underline">
            Ir a inicio de sesión

          </Link>
      </form>
    </div>
  )
}
