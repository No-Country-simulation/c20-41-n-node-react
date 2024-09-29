import axios from "axios";
import { FieldValues } from "react-hook-form";

const frontend = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

export const registerUser = async (values: FieldValues) => {
  try {
    const response = await frontend.post(`/register`, values);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const loginUser = async (values: FieldValues) => {
  try {
    const response = await frontend.post(`/login`, values);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const logoutUser = async () => {
  try {
    const response = await frontend.post(`/logout`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const authenticate = async () => {
  try {
    const response = await frontend.get(`/auth/status`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const authPatient = async () => {
  try {
    const response = await frontend.get(`/patient`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const authDoctor = async () => {
  try {
    const response = await frontend.get(`/doctor`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const authAdmin = async () => {
  try {
    const response = await frontend.get(`/admin`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getSchedule = async (id) => {
  try {
    const response = await frontend.get(`/horarios/${id}`);
    return response;
  }catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
};
}


export const getConsult = async (id_agendamiento: number) => {
  try {
    const response = await frontend.get(`/agendamientos/${id_agendamiento}`)
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
}

export const getAllConsult = async () => {
  try {
    const response = await frontend.get(`/agendamientos`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getPatientConsults = async (nro_documento: number = 0) => {
  try {
    const response = await frontend.get(`/agendamientos/paciente/${nro_documento}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getDoctorConsults = async (nro_documento: number = 0) => {
  try {
    const response = await frontend.get(`/agendamientos/medico/${nro_documento}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await frontend.get(`/admin/doctors`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getAvailableConsult = async (id_especialidad: number) => {
  try {
    const response = await frontend.get(`/horarios/especialidad/${id_especialidad}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const startConsult = async (id_agendamiento: number, url_videollamada: string) => {
  try {
    const response = await frontend.put(`/agendamientos/estado/${id_agendamiento}`, {estado: "INICIADO", url_videollamada});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const endConsult = async (id_agendamiento: number) => {
  try {
    const response = await frontend.put(`/agendamientos/estado/${id_agendamiento}`, {estado: "FINALIZADO", url_videollamada: " "});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const cancelConsult = async (id_agendamiento: number) => {
  try {
    const response = await frontend.put(`/agendamientos/estado/${id_agendamiento}`, {estado: "CANCELADO", url_videollamada: " "});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const scheduleConsult = async (id_medico: number, id_paciente: number, fechahora_inicio: Date, fechahora_fin: Date ) => {
  try {
    const response = await frontend.post(`/agendamientos/agendar/${id_medico}`, {id_paciente, fechahora_inicio, fechahora_fin});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const saveConsultNotes = async (id_agendamiento: number, nota: string ) => {
  try {
    const response = await frontend.post(`/agendamientos/${id_agendamiento}/nota_conclusion`, {nota});
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};