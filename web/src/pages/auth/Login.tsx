import { LoginForm } from "@/modules/auth/components/LoginForm"
import { AuthState } from "@/modules/core/globalStates/auth-state";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const auth = AuthState();

  if (auth.estado) {
    return <Navigate to="/" replace />
  }

  return (
    <div className=" grid place-items-center h-[100dvh]"
      style={{ background: "linear-gradient(135deg, #5c83ba,#c4d2ec,#f2f1ed)" }}>
      <LoginForm />
    </div>
  )



}
