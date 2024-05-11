import { Logout, Menu } from "@mui/icons-material"
import { SidebarState } from "@/modules/core/globalStates/sidebar-state"
import { logoutFetch } from "@/modules/auth/utils/authFetch";

export const Header = () => {
    const {estado ,inc} = SidebarState();
  return (
    <div className="border px-3 h-[50px] bg-white flex items-center justify-between">
      <div className="flex items-center">
        <Menu
        className="cursor-pointer"
          onClick={()=>inc(!estado)}
        />
        <p className="ml-2 text-xl font-semibold text-gray-500">Inicio</p>
      </div>
      <div>
        <Logout
        className="cursor-pointer"
        onClick={logoutFetch}
        />
      </div>
    </div>
  )
}
