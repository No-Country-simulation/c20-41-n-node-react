import { useForm } from "react-hook-form";
import TextAreaInput from "../Input/TextAreaInput";
import BorderedTextInput from "../Input/BorderedTextInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DiagnosticForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = handleSubmit((values) => {
    alert(`Informe Médico de la Consulta
        Fecha: ${values.fecha}
        Médico: ${values.medico}
        Paciente: ${values.paciente}
        Diagnóstico: ${values.diagnostico}`);
    // Petición POST al Backend
    // Si todo sale bien:
    toast.success("Informe médico guardado exitosamente", { position: "bottom-right" });
    navigate("/medico/citas-del-dia")
  });

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-black max-w-5xl shadow-focused w-full mx-auto"
    >
      <header className="grid lg:grid-cols-3 gap-4 bg-blue-600 p-8 pb-4 text-white rounded-t-lg">
        <BorderedTextInput
          title="Fecha"
          errors={errors}
          name="fecha"
          placeholder="Fecha"
          register={register}
          error_color="yellow"
          classes="autofill:input-light-background"
        />
        <BorderedTextInput
          title="Médico"
          errors={errors}
          name="medico"
          placeholder="Médico"
          register={register}
          error_color="yellow"
          classes="autofill:input-light-background"
        />
        <BorderedTextInput
          title="Paciente"
          errors={errors}
          name="paciente"
          placeholder="Paciente"
          register={register}
          error_color="yellow"
          classes="autofill:input-light-background"
        />
      </header>
      <section className="px-8 py-4">
        <TextAreaInput
          errors={errors}
          name="diagnostico"
          placeholder="Diagnóstico..."
          register={register}
          classes="autofill:input-light-background"
        />
      </section>
      <footer className="flex w-full pb-4 px-8 justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
        >
          Enviar Informe
        </button>
      </footer>
    </form>
  );
}

export default DiagnosticForm;
