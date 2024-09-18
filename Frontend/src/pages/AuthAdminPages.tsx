import { Navigate, Outlet } from "react-router-dom";
import { authAdmin } from "../api/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading/Loading";

function AuthAdminPages() {
  const [adminValidation, setAdminValidation] = useState<JSX.Element>(
    <main className="min-h-screen flex">
      <Loading />
    </main>
  );

  useEffect(() => {
    const verifyAuth = async () => {
      const response = await authAdmin();
      return response;
    };

    verifyAuth().then((res) => {
      if (res?.error) {
        toast.error(res?.error, { position: "bottom-right" });
        setAdminValidation(<Navigate to="/login" />);
      } else if (typeof res === "undefined") {
        toast.error("Ha ocurrido un error al conectarse con el servidor", {
          position: "bottom-right",
        });
        setAdminValidation(<Navigate to="/" />);
      } else {
        setAdminValidation(<Outlet />);
      }
    });
  }, []);

  return <>{adminValidation}</>;
}

export default AuthAdminPages;
