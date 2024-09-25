import { SidebarState } from "@/modules/core/states/sidebar-state"
import { logoutFetch } from "@/modules/auth/utils/authFetch";
import { Tooltip } from "@mui/material";
import { FaBarsStaggered, FaQuestion, FaRightFromBracket } from "react-icons/fa6";
import { TitleState } from "../states/title-state";

export const Header = () => {
  const { estado, inc } = SidebarState();
  const { title } = TitleState();
  const handleDriver = () => {
  };

  return (
    <div className={`border px-3 h-[50px]
     bg-white flex items-center justify-between`}>
      <div className="flex items-center">
          <Tooltip title="Abrir / cerrar menu" arrow>
            <div>
              <FaBarsStaggered
                className="cursor-pointer"
                onClick={() => inc(!estado)}
              />
            </div>
          </Tooltip>

        <p className="ml-2 text-xl font-semibold text-gray-500">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <Tooltip title="Información de pagina" arrow>
          <div>

            <FaQuestion className="cursor-pointer" onClick={handleDriver} />
          </div>
        </Tooltip>
        <Tooltip title="Cerrar sesión" arrow>
          <div>
            <FaRightFromBracket
              className="cursor-pointer"
              onClick={logoutFetch}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
