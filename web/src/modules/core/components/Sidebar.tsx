import { SidebarState } from "@/modules/core/globalStates/sidebar-state";
import logoImg from "@/assets/logo.jpg";
import userImg from "@/assets/user.png";
import { Link, useLocation } from "react-router-dom";
import { AuthState } from "../globalStates/auth-state";

import {
  FaBoxOpen,
  FaGauge,
  FaUserGroup,
  FaGear,
  FaTag,
  FaTruck,
  FaCashRegister,
  FaBoxesStacked,
  FaCartArrowDown,
  FaHandHoldingDollar,
  FaPeopleCarryBox
} from "react-icons/fa6";

export const Sidebar = () => {
  const { user } = AuthState();
  const { pathname } = useLocation();
  const { estado } = SidebarState();



  return (
    <div
      className={`fixed top-0 z-20 px-3 w-[260px] animate__fadeInLeft text-white bg-slate-700 h-[100dvh] duration-300 ${estado ? "-ml-[260px]" : "ml-0"
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
          <p className="text-lg font-semibold -mb-1">{user.Name}</p>
          <p className="text-slate-300">
            {user.Role === "admin" ? "Administrador" : "Vendedor"}
          </p>
        </div>
      </div>
      <hr className="border-gray-500" />
      <div className="overflow-y">
        <div className="my-6">
          <div
            className={`border duration-300 border-[#0071BC] ${pathname === "/" && "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/" className="flex">
              <FaGauge className="text-2xl" />
              <p className="pl-2">Dashboard</p>
            </Link>
          </div>

          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/suppliers") && "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/suppliers" className="flex">
              <FaPeopleCarryBox className="text-2xl" />
              <p className="pl-2">Proveedores</p>
            </Link>
          </div>

          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/cash-register") &&
              "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/cash-register" className="flex">
              <FaCashRegister className="text-2xl" />
              <p className="pl-2">Arqueo de caja</p>
            </Link>
          </div>

          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/clientes") && "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/clientes" className="flex">
              <FaUserGroup className="text-2xl" />
              <p className="pl-2">Clientes</p>
            </Link>
          </div>

          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/articles-box") &&
              "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/articles-box" className="flex">
              <FaBoxOpen className="text-2xl" />
              <p className="pl-2">Cajas de artículos</p>
            </Link>
          </div>

          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/categories") &&
              "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/categories" className="flex">
              <FaTag className="text-2xl" />
              <p className="pl-2">Categorías</p>
            </Link>
          </div>


          <div
            className={`border duration-300 border-[#0071BC] ${!pathname.includes("/articles-box") &&
              pathname.startsWith("/articles") &&
              "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/articles" className="flex">
              <FaTruck className="text-2xl" />
              <p className="pl-2">Artículos</p>
            </Link>
          </div>

          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/purchases") &&
              "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/purchases" className="flex">
              <FaCartArrowDown className="text-2xl" />
              <p className="pl-2">Compras</p>
            </Link>
          </div>
          
          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/sales") &&
              "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/sales" className="flex">
              <FaHandHoldingDollar className="text-2xl" />
              <p className="pl-2">Ventas</p>
            </Link>
          </div>

          <div
            className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/settings") &&
              "bg-[#E261B1] border-[#E261B1]"
              } rounded-lg px-3 py-2 my-3`}
          >
            <Link to="/settings" className="flex">
              <FaGear className="text-2xl" />
              <p className="pl-2">Configuración</p>
            </Link>
          </div>


        </div>

      </div>
    </div>
  );
};
