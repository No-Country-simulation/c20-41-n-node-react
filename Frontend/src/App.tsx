import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AuthPatientPages from "./pages/AuthPatientPages";
import FeatureSection from "./components/Section/FeatureSection";
import AuthDoctorPages from "./pages/AuthDoctorPages";
import AuthAdminPages from "./pages/AuthAdminPages";
import AddDoctorSection from "./components/Section/Admin/AddDoctorSection";
import AllConsultsSection from "./components/Section/Admin/AllConsultsSection";
import AllDoctorsSection from "./components/Section/Admin/AllDoctorsSection";
import MyConsultSection from "./components/Section/Patient/MyConsultsSection";
import VideoCall from "./components/VideoCall/VideoCall";
import EndVideoCall from "./components/VideoCall/EndVideoCall";
import DoctorConsultSection from "./components/Section/Doctor/DoctorConsultsSection";
import ScheduleConsult from "./components/Section/Patient/ScheduleConsult";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<AuthPatientPages />}>
            <Route path="paciente/*" element={<HomePage />}>
              <Route path="mis-citas" element={<MyConsultSection />} />
              <Route path="agendar-cita" element={<ScheduleConsult />} />
              <Route path="mis-resultados" element={<FeatureSection />} />
              <Route path="ver-perfil" element={<FeatureSection />} />
              <Route path="*" element={<Navigate to="mis-citas" />} />
            </Route>
          </Route>

          <Route element={<AuthDoctorPages />}>
            <Route path="medico/*" element={<HomePage />}>
              <Route
                path="todas-las-citas"
                element={<DoctorConsultSection />}
              />
              {/* <Route path="consultar-horario" element={<ScheduleAppointments />} /> */}
              <Route path="lista-de-pacientes" element={<FeatureSection />} />
              <Route path="ver-perfil" element={<FeatureSection />} />
              <Route path="*" element={<Navigate to="todas-las-citas" />} />
            </Route>
          </Route>

          <Route element={<AuthAdminPages />}>
            <Route path="admin/*" element={<HomePage />}>
              <Route path="lista-de-medicos" element={<AllDoctorsSection />} />
              <Route path="registrar-medico" element={<AddDoctorSection />} />
              <Route path="todas-las-citas" element={<AllConsultsSection />} />
              <Route path="ver-perfil" element={<FeatureSection />} />
              <Route path="*" element={<Navigate to="lista-de-medicos" />} />
            </Route>
          </Route>

          <Route path="/videollamada">
            <Route path=":id_agendamiento" element={<VideoCall />}></Route>
          </Route>
          <Route path="/informe-medico">
            <Route path=":id_agendamiento" element={<EndVideoCall />}></Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
