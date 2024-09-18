import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

import PatientNav from "./PatientNav";
import DoctorNav from "./DoctorNav";
import AdminNav from "./AdminNav";
import SidebarNavItem from "./SidebarNavItem";

import ProfileIcon from "../../icons/Profile";
import LogoutIcon from "../../icons/Logout";
import MenuIcon from "../../icons/Menu";
import CloseIcon from "../../icons/Close";
import { logoutUser } from "../../api/auth";
import { toast } from "react-toastify";
import HappyChatboxIcon from "../../icons/HappyChatbox";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userState, handleLogout } = useContext(UserContext);

  const { user } = userState;


  const userLogout = async () => {
    const response = await logoutUser()
    toast.success(response, { position: "bottom-right" });
    handleLogout();
  };
  return (
    <aside
      className={
        isExpanded
          ? "fixed z-50 left-2 min-h-[98vh] flex flex-col justify-between items-center bg-blue-600 text-white border rounded-xl ps-2 pe-4 w-[240px]"
          : "fixed z-50 left-2 min-h-[98vh] flex flex-col justify-between items-center bg-blue-600 text-white border rounded-xl px-2"
      }
    >
      <nav
        className={
          isExpanded
            ? "flex flex-1 flex-col py-4 gap-4 w-full"
            : "flex flex-1 flex-col py-4 gap-4"
        }
      >
        <header
          className={
            isExpanded
              ? "flex items-center border-b gap-4 ps-2 pt-1 pb-3 select-none"
              : "flex items-center justify-center border-b pt-1 pb-3 select-none px-2"
          }
        >
          <HappyChatboxIcon className="size-6 md:size-8" />
          <h1 className={isExpanded ? "text-base md:text-lg flex gap-2 font-semibold tracking-widest" : "hidden"}>
            EmotiCare
          </h1>
        </header>
        {user?.rol === "paciente" ? (
          <PatientNav state={isExpanded} />
        ) : user?.rol === "medico" ? (
          <DoctorNav state={isExpanded} />
        ) : (
          <AdminNav state={isExpanded} />
        )}

        <SidebarNavItem
          title="Ver Perfil"
          Icon={ProfileIcon}
          state={isExpanded}
          path="./ver-perfil"
        />
        <SidebarNavItem
          title="Cerrar Sesión"
          Icon={LogoutIcon}
          event={userLogout}
          state={isExpanded}
          path="/"
        />
      </nav>
      <footer className="flex items-center justify-end w-full py-4">
        <label
          title="Abrir/Cerrar Menú"
          className="rounded-full bg-white text-black p-2 hover:bg-opacity-50 cursor-pointer transition-all duration-300"
        >
          <input
            type="checkbox"
            className="hidden"
            onChange={() => setIsExpanded(!isExpanded)}
          />
          {isExpanded ? (
            <CloseIcon className="size-6 md:size-8" />
          ) : (
            <MenuIcon className="size-6 md:size-8" />
          )}
        </label>
      </footer>
    </aside>
  );
}

export default Sidebar;
