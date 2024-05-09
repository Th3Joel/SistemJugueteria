import { useEffect } from "react";
import { SidebarStore } from "../globalStates/sidebar-store";
import logoImg from "@/assets/logo.jpg";
import userImg from "@/assets/user.png";
import { Link, useLocation } from "react-router-dom";
import { Home, People } from "@mui/icons-material";

export const Sidebar = () => {
  const { pathname } = useLocation();
  let oo = false;
  const { estado, inc } = SidebarStore();
  useEffect(() => {
    function verificar() {
      if (innerWidth < 800 && oo) {
        inc(true);
        oo = false;
      }
      if (innerWidth > 800 && !oo) {
        inc(false);
        oo = true;
      }
    }
    window.addEventListener("resize", verificar);

    //Se remueve cuando se desmonta
    return () => {
      window.removeEventListener("resize", verificar);
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
          <p className="text-lg font-semibold -mb-1">Joel Urbina</p>
          <p className="text-slate-300">Administrador</p>
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
      </div>
    </div>
  );
};
