import { Header } from "@/modules/core/components/Header";
import { Sidebar } from "@/modules/core/components/Sidebar";
import { AuthState } from "@/modules/core/states/auth-state";
import { SidebarState } from "@/modules/core/states/sidebar-state";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";


const Layout = () => {
  const { estado, inc } = SidebarState();
  const auth = AuthState();

  if (!auth.estado) {
    return <Navigate to="/auth/login" replace />;
  }

  function verified(est: boolean) {

    if (est) {
      inc(true);
    } else {
      inc(false);
    }
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");

    verified(mq.matches);
    mq.addEventListener("change", (e) => verified(e.matches));
    //Se remueve cuando se desmonta
    return () => {
      mq.removeEventListener("change", (e) => verified(e.matches));
    };
  }, []);

  return (
    <>
      <Sidebar />
      <div className={`h-[100dvh] animate__fadeIn duration-300
        ${estado ? "pl-0" : "pl-[260px]"}`}
        style={{ background: "linear-gradient(135deg, #5c83ba,#c4d2ec,#f2f1ed)" }}

      >
        <Header />
        <div className="overflow-auto p-3"
          style={{ height: "calc(100dvh - 50px)" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;