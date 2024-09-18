import UsersIcon from "../../icons/Users";
import SidebarNavItem from "./SidebarNavItem";
import CalendarMonthIcon from "../../icons/CalendarMonth";
import TimeEditIcon from "../../icons/TimeEdit";

type Props = {
  state: boolean;
};

function DoctorNav({ state }: Props) {
  return (
    <>
      <SidebarNavItem
        title="Todas las Citas"
        Icon={CalendarMonthIcon}
        state={state}
        path="./todas-las-citas"
      />
      <SidebarNavItem
        title="Consultar Horario"
        Icon={TimeEditIcon}
        state={state}
        path="./consultar-horario"
      />
      <SidebarNavItem
        title="Lista de Pacientes"
        Icon={UsersIcon}
        state={state}
        path="./lista-de-pacientes"
      />
    </>
  );
}

export default DoctorNav;
