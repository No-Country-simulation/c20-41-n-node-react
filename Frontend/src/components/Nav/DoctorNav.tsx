import UsersIcon from "../../icons/Users";
import SidebarNavItem from "./SidebarNavItem";
import DayIcon from "../../icons/Day";
import CalendarMonthIcon from "../../icons/CalendarMonth";
import TimeEditIcon from "../../icons/TimeEdit";

type Props = {
  state: boolean;
};

function DoctorNav({ state }: Props) {
  return (
    <>
      <SidebarNavItem title="Citas del Día" Icon={DayIcon} state={state} path="./citas-del-dia" />
      <SidebarNavItem
        title="Todas las Citas"
        Icon={CalendarMonthIcon}
        state={state}
        path="./todas-las-citas"
      />
      <SidebarNavItem
        title="Ajustar Horario"
        Icon={TimeEditIcon}
        state={state}
        path="./ajustar-horario"
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
