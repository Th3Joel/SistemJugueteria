import { SidebarState } from "@/modules/core/states/sidebar-state"
import { logoutFetch } from "@/modules/auth/utils/authFetch";
import { Tooltip } from "@mui/material";
import { FaBarsStaggered, FaQuestion, FaRightFromBracket } from "react-icons/fa6";
import { TitleState } from "../states/title-state";
import { StateDriver } from "../utils/driver";
import { AuthState } from "../states/auth-state";

export const Header = () => {
  const { estado, inc } = SidebarState();
  const { title } = TitleState();
  const {run} = StateDriver();
  const {user} = AuthState();
 

  return (
    <div className={` px-3 h-[50px]
     bg-slate-100 flex items-center justify-between`}>
      <div className="flex items-center">
          <Tooltip title="Abrir / cerrar menu" arrow>
            <div>
              <FaBarsStaggered
                className="cursor-pointer"
                onClick={() => inc(!estado)}
              />
            </div>
          </Tooltip>

        <p className="ml-2 text-xl font-semibold text-gray-700">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <Tooltip title="Información de pagina" arrow>
          <div>
            <FaQuestion className="cursor-pointer" onClick={() => run()} />
          </div>
        </Tooltip>
        <Tooltip title="Cerrar sesión" arrow>
          <div>
            <FaRightFromBracket
              className="cursor-pointer"
              onClick={()=>logoutFetch(user.Role)}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
