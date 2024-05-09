import { Logout, Menu } from "@mui/icons-material"
import { SidebarStore } from "../globalStates/sidebar-store"

export const Header = () => {
    const {estado ,inc} = SidebarStore();
  return (
    <div className="border px-3 h-[50px] bg-white flex items-center justify-between">
      <div className="flex items-center">
        <Menu
          onClick={()=>inc(!estado)}
        />
        <p className="ml-2 text-xl font-semibold text-gray-500">Inicio</p>
      </div>
      <div>
        <Logout
        />
      </div>
    </div>
  )
}
