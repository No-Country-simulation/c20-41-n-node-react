import CalendarMonthIcon from "../../icons/CalendarMonth";
import HospitalIcon from "../../icons/Hospital";
import ProfileIcon from "../../icons/Profile";
import TimeIcon from "../../icons/Time";
import { Consult } from "../Section/Patient/MyConsultsSection";

type Props = {
  consult: Consult;
};

function MyConsultCard({ consult }: Props) {
  const statusClasses = {
    CANCELADO:
      "p-2 rounded-full text-sm max-w-fit justify-self-end bg-red-300 text-red-900 lowercase first-letter:uppercase",
    RESERVADO:
      "p-2 rounded-full text-sm max-w-fit justify-self-end bg-sky-300 text-sky-900 lowercase first-letter:uppercase",
    FINALIZADO:
      "p-2 rounded-full text-sm max-w-fit justify-self-end bg-green-300 text-green-900 lowercase first-letter:uppercase",
    INICIADO:
      "p-2 rounded-full text-sm max-w-fit justify-self-end bg-yellow-300 text-yellow-900 lowercase first-letter:uppercase",
  };

  return (
    <li className="p-4 mx-auto w-full bg-white shadow-lg flex flex-col rounded-xl gap-2 max-w-80 border-2 hover:border-black transition-all duration-300 select-none">
      <header className="grid gap-4 items-center sm:flex sm:flex-row-reverse sm:justify-between ">
        <span className={statusClasses[consult.estado]}>{consult.estado}</span>
        <h2 className="flex gap-2">
          <CalendarMonthIcon className="text-blue-600" />
          {consult.fechahora_inicio.split("T")[0]}
        </h2>
      </header>
      <span className="flex gap-2">
        <HospitalIcon className="text-blue-600" /> {consult.medico}
      </span>
      <span className="flex gap-2">
        <ProfileIcon className="text-blue-600" /> Psicología
      </span>
      <span className="flex gap-2">
        <TimeIcon className="text-blue-600" />
        {consult.fechahora_inicio.split("T")[1].slice(0, 5)} -{" "}
        {consult.fechahora_fin.split("T")[1].slice(0, 5)}
      </span>
    </li>
  );
}

export default MyConsultCard;
