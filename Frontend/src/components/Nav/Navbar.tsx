import "./Navbar.css";

import LoginIcon from "../../icons/LogIn";
import { NavLink } from "react-router-dom";
import MenuIcon from "../../icons/Menu";
import ProfileIcon from "../../icons/Profile";
import { useEffect, useState } from "react";
import EmoticareHeaderIcon from "../../images/EmoticareHeaderIcon.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(false)
  }, [])
  

  return (
    <section>
      <div className="navbar flex flex-col md:flex-row justify-between px-4 py-2 md:px-5 md:py-1 md:gap-10 xl:px-20">
        <div className="flex justify-between flex-1 md:flex-none">
          <NavLink to="/" className="mobile_icon">
            <img
              src={EmoticareHeaderIcon}
              alt="icon"
              className="h-[48px] md:h-[68px]"
            />
            <div className="logo_announce">
              <span className="text-sm md:text-base font-bold tracking-widest">
                EmotiCare
              </span>
              <span className="sub_text">Telemedicina</span>
            </div>
          </NavLink>
          <div className="flex items-center justify-center md:hidden">
            <MenuIcon className="size-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}></MenuIcon>
          </div>
        </div>
        <nav
          className={
            isOpen
              ? "flex flex-col md:flex-row md:items-center md:justify-end gap-2 py-2 lg:grid lg:grid-cols-2 flex-1"
              : "hidden flex-col md:flex md:flex-row md:items-center md:justify-end gap-2 py-2 lg:grid lg:grid-cols-2 flex-1"
          }
        >
          <div className="flex flex-col gap-2 md:hidden lg:flex lg:flex-row lg:justify-end">
          </div>
          <section className="flex flex-col gap-2 md:flex-row lg:justify-end">
            <NavLink
              to="/login"
              className="flex px-3 py-2 items-center gap-2 cursor-pointer text-black hover:text-blue-600"
            >
              <LoginIcon className="size-7"></LoginIcon>
              <span className="text-lg md:text-xl">Iniciar Sesión</span>
            </NavLink>
            <NavLink
              to="/register"
              className="flex rounded-full px-4 py-2 items-center gap-2 cursor-pointer text-white bg-blue-600 hover:bg-blue-700"
            >
              <ProfileIcon className="size-7"></ProfileIcon>
              <span className="text-lg md:text-xl"> Registrarse </span>
            </NavLink>
          </section>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;
