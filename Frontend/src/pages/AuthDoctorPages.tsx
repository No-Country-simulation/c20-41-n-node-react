import { Navigate, Outlet } from "react-router-dom";
import { authDoctor } from "../api/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading/Loading";

function AuthDoctorPages() {
  const [doctorValidation, setDoctorValidation] = useState<JSX.Element>(
    <main className="min-h-screen flex">
      <Loading />
    </main>
  );

  useEffect(() => {
    const verifyAuth = async () => {
      const response = await authDoctor();
      return response;
    };

    verifyAuth().then((res) => {
      if (res?.error) {
        toast.error(res?.error, { position: "bottom-right" });
        setDoctorValidation(<Navigate to="/login" />);
      } else if (typeof res === "undefined") {
        toast.error("Ha ocurrido un error al conectarse con el servidor", {
          position: "bottom-right",
        });
        setDoctorValidation(<Navigate to="/" />);
      } else {
        setDoctorValidation(<Outlet />);
      }
    });
  }, []);

  return <>{doctorValidation}</>;
}

export default AuthDoctorPages;
