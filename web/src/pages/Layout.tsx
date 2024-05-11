import { Header } from "@/modules/core/components/Header";
import { Sidebar } from "@/modules/core/components/Sidebar";
import { AuthState } from "@/modules/core/globalStates/auth-state";
import { SidebarState } from "@/modules/core/globalStates/sidebar-state";
import { Navigate, Outlet } from "react-router-dom";

export const Layout = () => {
  const {estado} = SidebarState();
  const auth = AuthState();

  if(!auth.estado){
    return <Navigate to="/auth/login" replace />
  }

  return (
    <div className="min-h-screen bg-slate-100 animate__animated animate__fast animate__fadeInTopLeft">
      <Sidebar />
      <div className={`duration-300  ${estado ? "pl-0" : "pl-[260px]"}`}>
        <Header/>
        <Outlet />
      </div>
    </div>
  );
};
