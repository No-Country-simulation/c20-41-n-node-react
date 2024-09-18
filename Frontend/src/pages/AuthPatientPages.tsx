import { Navigate, Outlet } from "react-router-dom";
import { authPatient } from "../api/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading/Loading";

function AuthPatientPages() {
  const [patientValidation, setPatientValidation] = useState<JSX.Element>(
    <main className="min-h-screen flex">
    <Loading />
  </main>
  );

  useEffect(() => {
    const verifyAuth = async () => {
      const response = await authPatient();
      return response;
    };

    verifyAuth().then((res) => {
      if (res?.error) {
        toast.error(res?.error, { position: "bottom-right" });
        setPatientValidation(<Navigate to="/login" />);
      } else if (typeof res === "undefined") {
        toast.error("Ha ocurrido un error al conectarse con el servidor", {
          position: "bottom-right",
        });
        setPatientValidation(<Navigate to="/" />);
      } else {
        setPatientValidation(<Outlet />);
      }
    });
  }, []);

  return <>{patientValidation}</>;
}

export default AuthPatientPages;
