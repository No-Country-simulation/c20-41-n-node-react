import "../../styles/HeroSection.css";
import mental from "../../images/production2Ftreatment2FmentalHealth-removebg-preview.png";
import { Link } from "react-router-dom";
import HappyChatboxIcon from "../../icons/HappyChatbox";

const Hero = () => {
  return (
    <section className="bg-[url('/images/bg-tele.jpg')] bg-cover flex">
      <div className="flex w-full xl:justify-start">
        <figure className="max-w-screen-md flex items-center justify-center">
          <img
            src={mental}
            alt="Doctor"
            className="hidden md:flex md:w-full"
          />
        </figure>
        <div className="flex flex-col justify-around gap-10 py-10 px-6">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-3xl tracking-wider text-white flex gap-3 items-center">
            <HappyChatboxIcon className="text-white size-8 mb-2"/>  Emoticare 
            </h2>
            <h1 className="text-2xl font-bold text-white">
              Citas Rápidas para un cuidado emocional eficaz
            </h1>
            <p className="text-xl text-gray-100 ">
              Accede a un cuidado profesional desde la comodidad de tu hogar,
              cuando lo necesites
            </p>
          </div>
          <div className="flex justify-end">
            <Link to="/login" className="hero-button md:me-6 italic">
              <p>¡Agenda tu Cita!</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
