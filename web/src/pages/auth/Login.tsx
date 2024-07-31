import { LoginForm } from "@/modules/auth/components/LoginForm"
import { AuthState } from "@/modules/core/globalStates/auth-state";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const auth = AuthState();

  if(auth.estado){
    return <Navigate to="/" replace />
  }

  return (
    <div className=" grid place-items-center h-[100dvh] bg-slate-100">
        <LoginForm/>
    </div>
  )

 
  
}
