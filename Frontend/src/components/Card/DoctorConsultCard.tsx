import { Link } from "react-router-dom";
import CalendarMonthIcon from "../../icons/CalendarMonth";
import LoginIcon from "../../icons/LogIn";
import TimeIcon from "../../icons/Time";
import { Consult } from "../Section/Doctor/DoctorConsultsSection";

type Props = {
  consult: Consult;
};

function DoctorConsultCard({ consult }: Props) {
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

  const today = new Date().toDateString();
  const elementDate = new Date(consult.fecha_inicio).toDateString();

  consult.paciente = consult.nombre_paciente + " " + consult.apellido_paciente;

  const patientsWithPhoto = {
    "Jaime Vargas": "bg-[url('/images/Jaime_Vargas.webp')]",
    "Ana Gómez": "bg-[url('/images/Ana_Gomez.webp')]",
    "Laura Fernández": "bg-[url('/images/Laura_Fernandez.webp')]",
    "Rebeca Pereira": "bg-[url('/images/Rebeca_Pereira.webp')]",
  };

  return (
    <li className="p-4 mx-auto w-full bg-white shadow-lg flex flex-col rounded-xl gap-2 max-w-80 border-2 hover:border-black transition-all duration-300 select-none">
      <header className="bg-[url('/images/bg-tele.jpg')] bg-cover bg-center relative py-10 rounded-lg flex items-center justify-center">
        <figure
          className={
            "absolute top-6 p-1 rounded-full bg-white text-blue-600 border shadow-lg size-20 bg-center bg-cover " +
            patientsWithPhoto[consult.paciente as "Jaime Vargas" | "Ana Gómez" | "Laura Fernández" | "Rebeca Pereira"]
          }
        ></figure>
      </header>
      <section className="mt-6">
        <h2 className="text-xl text-center tracking-wider">
          {consult.paciente}
        </h2>
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
          {consult.estado === "RESERVADO" && today == elementDate && (
            <Link
              className="px-2 py-2 text-base bg-blue-600 hover:bg-blue-800 text-white rounded-md flex gap-2 items-center justify-center transition-all duration-300"
              to={`/videollamada/${consult.id_agendamiento}`}
            >
              <LoginIcon /> Crear Sala
            </Link>
          )}
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

export default DoctorConsultCard;
