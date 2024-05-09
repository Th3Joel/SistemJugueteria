import { Header } from "@/modules/core/components/Header";
import { Sidebar } from "@/modules/core/components/Sidebar";
import { SidebarStore } from "@/modules/core/globalStates/sidebar-store";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const {estado} = SidebarStore();
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <div className={`duration-300  ${estado ? "pl-0" : "pl-[260px]"}`}>
        <Header/>
        <Outlet />
      </div>
    </div>
  );
};
