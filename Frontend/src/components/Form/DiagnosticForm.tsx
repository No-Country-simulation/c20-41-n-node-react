import { useForm } from "react-hook-form";
import TextAreaInput from "../Input/TextAreaInput";
import BorderedTextInput from "../Input/BorderedTextInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {getConsult, saveConsultNotes } from "../../api/auth";

type Props = {
  id_agendamiento: number;
};

function DiagnosticForm({ id_agendamiento }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const getData = async () => {
      const response = await getConsult(id_agendamiento);
      return response;
    };

    getData().then((res) => {
      if (!res.error) {
        res.data.fecha_inicio = new Date(
          res.data.fecha_inicio
        ).toLocaleDateString();
        setValue("fecha", res.data.fecha_inicio);
        setValue(
          "medico",
          res.data.nombre_medico + " " + res.data.apellido_medico
        );
        setValue(
          "paciente",
          res.data.nombre_paciente + " " + res.data.apellido_paciente
        );
      }
    });
  }, [id_agendamiento, setValue]);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    const response = await saveConsultNotes(id_agendamiento, values.diagnostico)
    if (!response.error){
      toast.success("El diagnóstico ha sido guardado exitosamente", {position: "bottom-right"})
      navigate("/medico/todas-las-citas");
    }
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
