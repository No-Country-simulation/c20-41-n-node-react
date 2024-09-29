import FeatureSection from "../components/Section/FeatureSection.js";
import HeroSection from "../components/Section/HeroSection.js";
import Navbar from "../components/Nav/Navbar.js";
import TestimonialsSection from "../components/Section/TestimonialsSection.js";
import WhyUsSection from "../components/Section/WhyUsSection.js";
import AboutUs from "../components/Section/Dashboard-Dr.tsx/AboutUs.js";
import HappyChatboxIcon from "../icons/HappyChatbox.js";
import LinkedInIcon from "../icons/LinkedIn.js";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <FeatureSection />
      <WhyUsSection />
      <TestimonialsSection />
      <footer className="bg-black grid grid-cols-[2fr_1fr_1fr] gap-10 p-20 py-10 text-white">
        <section className="flex flex-col">
          <h1 className="text-2xl font-semibold flex gap-2 tracking-wider mb-4">
            <HappyChatboxIcon/> Emoticare</h1>
          <p className="text-sm max-w-[60ch]">Una iniciativa que a través de la tecnología busca mejorar la accesibilidad para que las personas puedan conectar con especialistas de la salud mental.</p>
        </section>
        <section className="flex flex-col px-10">
          <h2 className="font-semibold uppercase mb-4">Contacto</h2>
          <ul className="flex flex-col gap-2 justify-center">
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer"><LinkedInIcon/> Angel Añez</li>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer"><LinkedInIcon/> Dan Derbas</li>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer"><LinkedInIcon/> Erich Armijo</li>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer">
            <LinkedInIcon/> Rafael García
            </li>
            <li className="flex gap-2 hover:text-blue-400 cursor-pointer">
            <LinkedInIcon/> Victor Murcio
            </li>
          </ul>
        </section>
        <section className="flex flex-col px-10">
          <h2 className="font-semibold uppercase mb-4">Explora</h2>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-blue-400 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 cursor-pointer">
              Nuestros Servicios
            </li>
            <li className="hover:text-blue-400 cursor-pointer">
              ¿Por qué elegirnos?
            </li>
            <li className="hover:text-blue-400 cursor-pointer">
              Lo que dicen nuestros pacientes
            </li>
          </ul>
        </section>
      </footer>
    </>
  );
}

export default LandingPage;
