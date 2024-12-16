import { ResetPasswdForm } from "@/modules/auth/components/ResetPasswdForm";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";

const ResetPasswd = () => {
  const { setTitle } = TitleState();
  useEffect(() => {
      setTitle("Restablecimiento de contraseña");
  }, [])
  return <ResetPasswdForm />
}
export default ResetPasswd;