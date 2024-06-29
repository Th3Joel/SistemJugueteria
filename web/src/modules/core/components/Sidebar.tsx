import { useEffect } from "react";
import { SidebarState } from "@/modules/core/globalStates/sidebar-state";
import logoImg from "@/assets/logo.jpg";
import userImg from "@/assets/user.png";
import { Link, useLocation } from "react-router-dom";
import { Home, People, Settings } from "@mui/icons-material";
import { AuthState } from "../globalStates/auth-state";

export const Sidebar = () => {
  const { user } = AuthState();
  const { pathname } = useLocation();
  const { estado, inc } = SidebarState();
  const mq = window.matchMedia("(max-width: 720px)");

  function verified(est:boolean) {
    if (est) {
      inc(true);
    } else {
      inc(false);
    }
  }
  useEffect(() => {
    mq.addEventListener("change", (e)=>verified(e.matches));
    verified(mq.matches);
    //Se remueve cuando se desmonta
    return () => {
      mq.removeEventListener("change",(e)=>verified(e.matches));
    };
  }, []);
  return (
    <div
      className={`z-20 px-3 fixed w-[260px] text-white bg-slate-700 min-h-screen duration-300 ${
        estado ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="px-1 h-16 flex items-center">
        <img
          src={logoImg}
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />
        <p className="pl-2">Coleccióname</p>
      </div>
      <hr className="border-gray-500" />
      <div className="px-1 h-16 flex items-center">
        <img
          src={userImg}
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />
        <div className="ml-2">
          <p className="text-lg font-semibold -mb-1">{user.name}</p>
          <p className="text-slate-300">{user.role}</p>
        </div>
      </div>
      <hr className="border-gray-500" />
      <div className="my-6">
        <div
          className={`border duration-300 border-[#0071BC] ${
            pathname === "/" && "bg-[#E261B1] border-[#E261B1]"
          } rounded-lg px-3 py-2 my-3`}
        >
          <Link to="/" className="flex">
            <Home />
            <p className="pl-2">Dashboard</p>
          </Link>
        </div>

        <div
          className={`border duration-300 border-[#0071BC] ${
            pathname.startsWith("/clientes") && "bg-[#E261B1] border-[#E261B1]"
          } rounded-lg px-3 py-2 my-3`}
        >
          <Link to="/clientes" className="flex">
            <People />
            <p className="pl-2">Clientes</p>
          </Link>
        </div>

        <div
          className={`border duration-300 border-[#0071BC] ${
            pathname.startsWith("/settings") &&
            "bg-[#E261B1] border-[#E261B1]"
          } rounded-lg px-3 py-2 my-3`}
        >
          <Link to="/settings" className="flex">
            <Settings />
            <p className="pl-2">Configuración</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
