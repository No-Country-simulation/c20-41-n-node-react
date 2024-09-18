import { useContext } from "react";
import LoginForm from "../components/Form/LoginForm";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Nav/Navbar";

function LoginPage() {
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
        <LoginForm />
      </section>
    </main>
  );
}

export default LoginPage;
