const TestimonialSection = () => {
  return (
    <section className="py-12 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-blue-500 text-center">
          Lo que dicen nuestros pacientes
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-beige-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <figure className="h-12 w-12 bg-[url('/images/Persona_2.webp')] bg-cover rounded-full"></figure>
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-900">Ana Pérez</p>
                <p className="text-sm text-gray-600">Paciente</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              "El servicio fue excelente, el médico fue muy atento y resolvió
              todas mis dudas."
            </p>
          </div>
          <div className="bg-beige-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <figure className="h-12 w-12 bg-[url('/images/Persona_1.webp')] bg-cover bg-center rounded-full"></figure>
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-900">
                  Carlos Ramírez
                </p>
                <p className="text-sm text-gray-600">Paciente</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              "La plataforma es de primera y el proceso de agendar fue muy
              sencillo."
            </p>
          </div>
          <div className="bg-beige-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <figure className="h-12 w-12 bg-[url('/images/Persona_3.webp')] bg-cover rounded-full"></figure>
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-900">
                  María López
                </p>
                <p className="text-sm text-gray-600">Paciente</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              "Me sentí muy cómoda durante la consulta y el personal fue muy
              amable."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
