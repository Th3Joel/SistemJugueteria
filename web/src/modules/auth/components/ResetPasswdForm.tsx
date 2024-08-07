import { InputText } from "@/modules/core/components/InputText";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useForm } from "@/modules/core/hooks/useForm";
import { Button } from "@mui/material";
import { FaFingerprint, FaKey, FaUnlockKeyhole } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface IForm{
  Code: string;
  Password: string;
  Confirm: string;
}
export const ResetPasswdForm = () => {
  window.document.title = "Restablecer contraseña";
  const [params] = useSearchParams();
  const code = params.get("code");
  const {errors,data,loading,post,inputChange} = useForm<IForm>({
    Code: code ?? "",
    Password: "",
    Confirm: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(`/auth/reset-password`, e, false).then((res) => {
        if (res) {
          navigate("/auth/login",{replace: true});
        } 
    });
};
  return (
    <div className="animate__fadeIn w-[350px] border-[1px] border-t-blue-600 border-t-4 bg-white border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-2 mb-2">Coleccióname</h1>
      <hr className="border-gray-200" />

      <form onSubmit={handleSubmit}  className="flex flex-col gap-3 px-6 py-3">
        <h3 className="text-center font-semibold">Restablecer contraseña</h3>
        <p className="text-center -mt-3">Copie el codigo de reinicio que te hemos enviado a tu correo y pegalo aqui abajo</p>
        {/* <small className="text-center text-red-500 -my-2">* Campos requeridos</small> */}
        <InputText 
          name="Code" 
          label="Código"
          value={data.Code}
          icon={<FaFingerprint/>}
          error={!!errors?.Code}
          helperText={errors?.Code}
          onChange={inputChange}
          readonly={!!code}
        />
        <InputText
          label="Nueva contraseña"
          name="Password"
          isRequired
          icon={<FaUnlockKeyhole />}
          value={data.Password}
          error={!!errors?.Password}
          helperText={errors?.Password}
          onChange={inputChange}
        />
        <InputText
          label="Repetir contraseña"
          name="Confirm"
          isRequired
          icon={<FaKey />}
          value={data.Confirm}
          error={!!errors?.Confirm}
          helperText={errors?.Confirm}
          onChange={inputChange}
        />
        <Button type="submit" disabled={loading} variant="contained">
          {loading ? <LoaderBtn /> : "Restablecer"}
        </Button>
          <Link to="/auth/login" className="text-center text-blue-500 underline">
            Ir a inicio de sesión

          </Link>
      </form>
    </div>
  )
}
