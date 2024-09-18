import FeatureCard from "../Card/FeatureCard";
import VideocameraIcon from "../../icons/Videocamera";
import TimeIcon from "../../icons/Time"
import UsersIcon from "../../icons/Users";
import HistoryIcon from "../../icons/History";

function FeatureSection() {
  return (
    <section className="px-6 lg:px-10 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center py-6 text-blue-500 mb-4">
        Nuestros Servicios de Telemedicina
      </h2>
      <ul className="grid gap-16 sm:grid-cols-2 lg:grid-cols-2 ">
        <li>
          <FeatureCard
            title="Horario Flexible"
            desc="Agenda tu cita en el horario que mejor se adapte a tu rutina."
          >
            <TimeIcon className="text-blue-400 size-20" />
          </FeatureCard>
        </li>
        <li>
          <FeatureCard
            title="Atención Personalizada"
            desc="Consultas privadas y seguras con médicos desde cualquier parte del mundo."
          >
            <VideocameraIcon className="text-blue-400 size-20" />
          </FeatureCard>
        </li>
        <li>
          <FeatureCard
            title="Expertos Especialistas"
            desc="Escoge entre una variedad de especialistas el más conveniente a tus necesidades."
          >
            <UsersIcon className="text-blue-400 size-20" />
          </FeatureCard>
        </li>
        <li>
          <FeatureCard
            title="Historial Médico Digital"
            desc="Lleva en un solo lugar tu historial médico para que puedas observar tu progreso."
          >
            <HistoryIcon className="text-blue-400 size-20" />
          </FeatureCard>
        </li>
      </ul>
    </section>
  );
}

export default FeatureSection;
