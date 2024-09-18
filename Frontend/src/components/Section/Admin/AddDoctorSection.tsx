import RegisterForm from "../../Form/RegisterForm";

function AddDoctorSection() {
  return (
    <main className="flex flex-col items-center justify-start min-h-full md:gap-10">
      <section className="flex flex-col gap-8 items-center px-4 py-6">
      <h1 className="text-2xl font-medium tracking-wider">Registrar Médico</h1>
        <RegisterForm rol="medico" />
      </section>
    </main>
  );
}

export default AddDoctorSection;
