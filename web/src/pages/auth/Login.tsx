import { LoginForm } from "@/modules/auth/components/LoginForm"
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";


const Login = () => {
  const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Inicio de sesión");
    }, [])
  return <LoginForm />



}
export default Login