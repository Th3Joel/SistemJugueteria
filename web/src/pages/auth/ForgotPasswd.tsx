import { ForgotPasswdForm } from "@/modules/auth/components/ForgotPasswdForm";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";


const ForgotPasswd = () => {
  const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Recuperación de contraseña");
    }, [])
  return <ForgotPasswdForm />
}
export default ForgotPasswd;