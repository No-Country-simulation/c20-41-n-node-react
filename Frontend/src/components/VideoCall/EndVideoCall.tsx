import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import DiagnosticForm from "../Form/DiagnosticForm";

function EndVideoCall() {
  const { userState } = useContext(UserContext);
  const { authenticated, user } = userState;
  if (!authenticated) return <Navigate to={"/"} />;
  if (user?.rol == "paciente") return <Navigate to={"/paciente/mis-citas"} />;
  return (
    <main className="flex items-center justify-center min-h-screen flex-col py-8">
      <h1 className="text-2xl text-center font-medium tracking-wider mb-6">
        Informe Médico de la Consulta
      </h1>
      <article className="px-8 flex w-full">{user?.rol === "medico" && <DiagnosticForm />}</article>
    </main>
  );
}

export default EndVideoCall;
