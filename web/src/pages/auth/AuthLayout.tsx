import { AuthState } from "@/modules/core/globalStates/auth-state";
import { Navigate, Outlet } from "react-router-dom"



export const AuthLayout:React.FC = () => {
  const auth = AuthState();

  if (auth.estado) {
    return <Navigate to="/" replace />
  }
  return (
    <div className=" grid place-items-center h-[100dvh]"
      style={{ background: "linear-gradient(135deg, #5c83ba,#c4d2ec,#f2f1ed)" }}>
        <Outlet/>
        
    </div>
  )
}
