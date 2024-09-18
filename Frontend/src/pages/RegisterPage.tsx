import { useContext } from "react";
import RegisterForm from "../components/Form/RegisterForm";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Nav/Navbar";

function RegisterPage() {
  const { userState } = useContext(UserContext);
  const { authenticated, user } = userState;

  if (authenticated && user) {
    toast.info("Ya tiene una sección activa", { position: "bottom-right" });
    return <Navigate to={`/${user.rol}`} replace />;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="p-4 flex flex-1 flex-col justify-center items-center bg-[url('/images/bg-tele.jpg')] bg-cover">
        <RegisterForm rol="paciente" />
      </section>
    </main>
  );
}

<RegisterForm rol="paciente" />;

export default RegisterPage;
