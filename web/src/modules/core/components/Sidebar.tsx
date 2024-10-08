import { SidebarState } from "@/modules/core/states/sidebar-state";
import { Link, useLocation } from "react-router-dom";
import { AuthState } from "../states/auth-state";
import userImg from "@/assets/user.png";
import logoImg from "@/assets/logo.jpg";

import {
  FaBoxOpen,
  FaGauge,
  FaUserGroup,
  FaGear,
  FaTag,
  FaTruck,
  FaCashRegister,
  FaCartArrowDown,
  FaHandHoldingDollar,
  FaPeopleCarryBox,
  FaNewspaper,
  FaWallet,
  FaBriefcase
} from "react-icons/fa6";

export const Sidebar = () => {
  const { user, company } = AuthState();
  const { pathname } = useLocation();
  const { estado } = SidebarState();

  return (
    <div
      className={`fixed z-10 top-0 px-3 pb-[135px] w-[260px] animate__fadeInLeft text-white bg-slate-700 h-[100dvh] duration-300 ${estado ? "-ml-[260px]" : "ml-0"
        }`}
    >

      <div className="px-1 h-16 flex items-center">
        <img
          src={company.Logo == "" ? logoImg : `/api/settings/company/logo`}
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />
        <p className="pl-2">{company.Name}</p>
      </div>
      <hr className="border-gray-500" />
      <div className="px-1 h-16 flex items-center">
        <img
          src={user.Picture ? `/api/settings/users/picture/${user.Email}` : userImg}
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

      <div className="overflow-y-auto h-full">
        <div
          className={`border duration-300 border-[#0071BC] ${pathname === "/" && "bg-[#E261B1] border-[#E261B1]"
            } rounded-lg px-3 py-2 my-3`}
        >
          <Link to="/" className="flex">
            <FaGauge className="text-2xl" />
            <p className="pl-2">Dashboard</p>
          </Link>
        </div>

        {
          user.Role == "admin" &&
          <>
            <div
              className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/suppliers") && "bg-[#E261B1] border-[#E261B1]"
                } rounded-lg px-3 py-2 my-3`}
            >
              <Link to="/suppliers" className="flex">
                <FaPeopleCarryBox className="text-2xl" />
                <p className="pl-2">Proveedores</p>
              </Link>
            </div>
          </>
        }


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
          className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/petty-cash") &&
            "bg-[#E261B1] border-[#E261B1]"
            } rounded-lg px-3 py-2 my-3`}
        >
          <Link to="/petty-cash" className="flex">
            <FaWallet className="text-2xl" />
            <p className="pl-2">Caja chica</p>
          </Link>
        </div>
        {
          user.Role == "admin" &&
          <>

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

          </>
        }

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

        {
          user.Role == "admin" &&
          <>
            <div
              className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/reports") &&
                "bg-[#E261B1] border-[#E261B1]"
                } rounded-lg px-3 py-2 my-3`}
            >
              <Link to="/reports" className="flex">
                <FaNewspaper className="text-2xl" />
                <p className="pl-2">Reportes</p>
              </Link>
            </div>
          </>
        }

        <div
          className={`border duration-300 border-[#0071BC] ${pathname.startsWith("/business") &&
            "bg-[#E261B1] border-[#E261B1]"
            } rounded-lg px-3 py-2 my-3`}
        >
          <Link to="/business" className="flex">
            <FaBriefcase className="text-2xl" />
            <p className="pl-2">Negocio</p>
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
  );
};
