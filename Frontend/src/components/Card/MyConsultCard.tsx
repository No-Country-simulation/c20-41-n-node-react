import { Link } from "react-router-dom";
import BrainIcon from "../../icons/Brain";
import CalendarMonthIcon from "../../icons/CalendarMonth";
import LoginIcon from "../../icons/LogIn";
import TimeIcon from "../../icons/Time";
import { Consult } from "../Section/Patient/MyConsultsSection";

type Props = {
  consult: Consult;
};

function MyConsultCard({ consult }: Props) {

  consult.medico = consult.nombre_medico + " " + consult.apellido_medico;

  return (
    <li className="p-4 mx-auto w-full bg-white shadow-lg flex flex-col rounded-xl gap-2 max-w-80 border-2 hover:border-black transition-all duration-300 select-none">
      <header className="bg-[url('/images/bg-tele.jpg')] bg-cover bg-center relative py-10 rounded-lg flex items-center justify-center">
        <figure className="absolute top-12 p-1 rounded-full bg-white text-blue-600 border shadow-lg">
          <BrainIcon className="size-12" />
        </figure>
      </header>
      <section className="mt-6">
        <h2 className="text-xl text-center tracking-wider">{consult.medico}</h2>
        <p className="text-lg text-center text-slate-700 font-semibold">
          {consult.nombre_esp_medico}
        </p>
        <span className="flex gap-2 mt-2 ps-2">
          <CalendarMonthIcon className="text-blue-600" />
          {consult.fecha_inicio.split("T")[0].split("-").reverse().join("-")}
        </span>
        <span className="flex gap-2 mt-2 ps-2">
          <TimeIcon className="text-blue-600" />
          {consult.fechahora_inicio.split("T")[1].slice(0, 5)} -{" "}
          {consult.fechahora_fin.split("T")[1].slice(0, 5)}
        </span>
        <footer className="flex items-center justify-center mt-4">
          {consult.estado === "INICIADO" && (
            <Link
              className="px-2 py-2 text-base bg-blue-600 hover:bg-blue-800 text-white rounded-md flex gap-2 items-center justify-center transition-all duration-300"
              to={"/videollamada"}
            >
              <LoginIcon/> Ingresar a la Sala
            </Link>
          )}
        </footer>
      </section>
    </li>
  );
}

export default MyConsultCard;
