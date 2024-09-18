import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { toast } from "react-toastify";

import EmailInput from "../Input/EmailInput";
import PasswordInput from "../Input/PasswordInput";
import FullButton from "../Button/FullButton";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import ButtonLoading from "../Loading/ButtonLoading";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<JSX.Element | undefined>()

  const { handleLogin } = useContext(UserContext);

  const onSubmit = handleSubmit(async (values) => {
    try {
      setIsLoading(<ButtonLoading classes="border-white border-t-blue-300"/>)
      const result = await loginUser(values);
      if (result.message) {
        // Si todo salió bien
        handleLogin(result.user);
        toast.success(result.message, { position: "bottom-right" });
        const { rol } = result.user;
        navigate(`/${rol}`);
      }

      if (result.error) {
        // Si hubo un error
        setIsLoading(undefined)
        toast.error(result.error, { position: "bottom-right" });
      }
    } catch (error) {
      if (error) {
        toast.error("Ha ocurrido un error al conectarse con el servidor", {
          position: "bottom-right",
        });
      }
    }
  });
  return (
    <form
      className="shadow-lg grid md:grid-cols-2 max-w-5xl"
      onSubmit={onSubmit}
    >
      <section className="flex flex-col bg-blue-700 rounded-t-lg md:rounded-s-lg md:rounded-e-none p-4 gap-10 justify-center">
        <h2 className="max-w-[24ch] md:text-2xl text-white text-center md:max-w-[24ch]">
          Tu salud, nuestra prioridad ¡Agenda tu cita médica!
        </h2>
      </section>
      <section className="flex flex-col bg-white rounded-b-lg md:rounded-e-lg md:rounded-s-none p-8 md:p-10 gap-10 relative">
        <h2 className="font-semibold text-xl">Iniciar Sesión</h2>
        <EmailInput
          name="email"
          placeholder="Correo Electrónico"
          register={register}
          errors={errors}
          classes="autofill:input-light-background"
        />

        <PasswordInput
          name="password"
          placeholder="Contraseña"
          register={register}
          errors={errors}
          classes="autofill:input-light-background"
        />

        <footer className="flex flex-col gap-4">
          <Link
            to="/forgot-password"
            className="text-end text-blue-500 text-sm"
          >
            ¿Olvistaste tu contraseña?
          </Link>
          <FullButton title="Iniciar Sesión" color="blue" type="submit" loading={isLoading} />
        </footer>

        <span className="text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500">
            Regístrate
          </Link>
        </span>
      </section>
    </form>
  );
}

export default LoginForm;
