import { Link } from "react-router-dom";
import CalendarMonthIcon from "../../icons/CalendarMonth";
import LoginIcon from "../../icons/LogIn";
import TimeIcon from "../../icons/Time";
import { Consult } from "../Section/Patient/MyConsultsSection";

type Props = {
  consult: Consult;
};

function MyConsultCard({ consult }: Props) {
  const statusClasses = {
    CANCELADO:
      "p-2 rounded-lg text-sm max-w-fit justify-self-end bg-red-200 text-red-900 lowercase first-letter:uppercase",
    RESERVADO:
      "p-2 rounded-lg text-sm max-w-fit justify-self-end bg-sky-200 text-sky-900 lowercase first-letter:uppercase",
    FINALIZADO:
      "p-2 rounded-lg text-sm max-w-fit justify-self-end bg-green-200 text-green-900 lowercase first-letter:uppercase",
    INICIADO:
      "p-2 rounded-lg text-sm max-w-fit justify-self-end bg-yellow-200 text-yellow-900 lowercase first-letter:uppercase",
  };

  const doctorsWithPhoto = {
    "Martha Alvarez": "bg-[url('/images/Martha_Alvarez.webp')]",
    "Juan Pérez": "bg-[url('/images/Juan_Perez.webp')]",
    "Carlos Vargas": "bg-[url('/images/Carlos_Vargas.webp')]",
    "Joey Tribbiani": "bg-[url('/images/Joey_Tribbiani.webp')]",
  };

  consult.medico = consult.nombre_medico + " " + consult.apellido_medico;

  return (
    <li className="p-4 mx-auto w-full bg-white shadow-lg flex flex-col rounded-xl gap-2 max-w-80 border-2 hover:border-black transition-all duration-300 select-none">
      <header className="bg-[url('/images/bg-tele.jpg')] bg-cover bg-center relative py-10 rounded-lg flex items-center justify-center">
        <figure
          className={
            "absolute top-6 p-1 rounded-full bg-white text-blue-600 border shadow-lg size-20 bg-center bg-cover " +
            doctorsWithPhoto[
              consult.medico as
                | "Martha Alvarez"
                | "Juan Pérez"
                | "Carlos Vargas"
                | "Joey Tribbiani"
            ]
          }
        ></figure>
      </header>
      <section className="mt-6">
        <h2 className="text-xl text-center tracking-wider">{consult.medico}</h2>
        <p className="text-lg text-center text-slate-700 font-semibold">
          {consult.nombre_esp_medico}
        </p>
        <section className="flex justify-between mt-2 items-center">
          <span className="flex gap-2  ps-2">
            <CalendarMonthIcon className="text-blue-600" />
            {new Date(consult.fechahora_inicio).toLocaleDateString()}
          </span>
          <span className={statusClasses[consult.estado]}>
            {consult.estado}
          </span>
        </section>

        <span className="flex gap-2 mt-2 ps-2">
          <TimeIcon className="text-blue-600" />
          {new Date(consult.fechahora_inicio).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(consult.fechahora_fin).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <footer className="flex items-center justify-center mt-4">
          {consult.estado === "INICIADO" && (
            <Link
              className="px-2 py-2 text-base bg-blue-600 hover:bg-blue-800 text-white rounded-md flex gap-2 items-center justify-center transition-all duration-300"
              to={consult.url_videollamada}
            >
              <LoginIcon /> Ingresar a la Sala
            </Link>
          )}
        </footer>
      </section>
    </li>
  );
}

export default MyConsultCard;
