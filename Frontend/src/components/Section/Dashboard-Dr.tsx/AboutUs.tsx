import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us-container">
        <div className="secondary_container">
        <img className="side_image" src="src/images/mspbjtoementalhealth1200x667-01-01_900xx4939-2780-0-0.jpg" alt="image"/>
      <div className="about-us-content">
        <h2 className="about-us-title">Conoce Nuestro Compromiso con el Cuidado Mental</h2>
        <p className="about-us-description">
          En EmotiCare, nos enfocamos en brindar un cuidado mental integral. Nuestro objetivo es ofrecer consultas de 
          <strong> psicología</strong> y <strong>psiquiatría</strong> con un enfoque humano y terapias personalizadas para cada paciente.
        </p>
        <p className="about-us-values">
          Valoramos la <strong>empatía</strong>, la <strong>confianza</strong> y el <strong>bienestar</strong> como pilares fundamentales para el crecimiento mental y emocional.
        </p>
        <h3 className="specialties-title">Nuestras Especialidades</h3>
        <ul className="specialties-horizontal-list">
          <li>Psicología</li>
          <li>Psiquiatría</li>
          <li>Terapias Cognitivo Conductuales</li>
          <li>Terapia Ocupacional</li>
          <li>Psicoterapia Familiar</li>
          <li>Terapia para el Estrés</li>
        </ul>
        </div>
      </div>

      {/* <div className="services-bar">
        <h3 className="services-title">Nuestros Servicios</h3>
        <ul className="services-list">
          <li>Psicología</li>
          <li>Psiquiatría</li>
          <li>Terapias Cognitivo Conductuales</li>
          <li>Terapia Ocupacional</li>
          <li>Psicoterapia Familiar</li>
          <li>Terapia para el Estrés</li>
          <li>Consultas Online</li>
        </ul>
      </div> */}
    </section>
  );
};

export default AboutUs;
