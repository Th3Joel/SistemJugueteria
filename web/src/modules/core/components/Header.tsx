import { SidebarState } from "@/modules/core/globalStates/sidebar-state"
import { logoutFetch } from "@/modules/auth/utils/authFetch";
import { Tooltip } from "@mui/material";
import { FaBarsStaggered, FaRightFromBracket } from "react-icons/fa6";

export const Header = () => {
    const {estado ,inc} = SidebarState();
  return (
    <div className={`border px-3 h-[50px]
     bg-white flex items-center justify-between`}>
      <div className="flex items-center">
        <FaBarsStaggered
        className="cursor-pointer"
          onClick={()=>inc(!estado)}
        />
        <p className="ml-2 text-xl font-semibold text-gray-500">Inicio</p>
      </div>
      <Tooltip title="Cerrar sessión" arrow>
        <FaRightFromBracket
        className="cursor-pointer"
        onClick={logoutFetch}
        />
      </Tooltip>
    </div>
  )
}
