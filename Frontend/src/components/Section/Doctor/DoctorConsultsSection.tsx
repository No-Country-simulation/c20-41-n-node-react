import { ChangeEvent, useContext, useEffect, useState } from "react";
import SearchIcon from "../../../icons/Search";
import { getDoctorConsults } from "../../../api/auth";
import Loading from "../../Loading/Loading";
import { UserContext } from "../../../context/UserContext";
import DoctorConsultCard from "../../Card/DoctorConsultCard";

export type Consult = {
  fechahora_inicio: string;
  fechahora_fin: string;
  fecha_inicio: string;
  fecha_fin: string;
  paciente: string;
  id_agendamiento: number
  nombre_paciente: string;
  apellido_paciente: string;
  estado: "RESERVADO" | "FINALIZADO" | "CANCELADO" | "INICIADO";
  url_videollamada: string
};

function DoctorConsultSection() {
  const [consults, setConsults] = useState<Consult[] | []>([]);
  const [isLoading, setIsLoading] = useState(true)
  const { userState } = useContext(UserContext);
  const { user } = userState;

  useEffect(() => {
    const getData = async () => {
      const response = await getDoctorConsults(user?.nro_documento);
      return response;
    };

    getData().then((res) => {
      setIsLoading(false)
      setConsults(res.data as Consult[]);
    });
  }, [user]);

  const lastPage = consults.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filterData = () => {
    if (search.length === 0 || filter === "") {
      return consults.slice(currentPage, currentPage + 12);
    }
    const filtered = consults
      .filter((element) =>
        element[
          filter as
            | "fechahora_inicio"
            | "fechahora_fin"
            | "paciente"
            | "estado"
        ]?.includes(search)
      )
      .slice(currentPage, currentPage + 12);
    return filtered;
  };

  const nextPage = () => {
    if (currentPage + 12 < lastPage && filter === "") {
      setCurrentPage(currentPage + 12);
    }
    const filtered = consults.filter((element) =>
      element[
        filter as
          | "fechahora_inicio"
          | "fechahora_fin"
          | "paciente"
          | "estado"
      ]?.includes(search)
    );

    if (filtered && currentPage + 12 < filtered.length) {
      setCurrentPage(currentPage + 12);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 12);
    }
  };

  const onSearchCharge = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <section className="flex flex-col items-center justify-start min-h-full py-6">
      <h1 className="text-2xl font-medium tracking-wider">Mis Citas</h1>
      <header className="flex flex-col md:flex-row md:items-center w-full gap-y-2 gap-x-8 p-4  md:py-4 md:px-10 transition-all duration-300">
        <select
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
          className="ps-4 pe-8 py-2 border-2 border-black rounded-xl"
        >
          <option value="" disabled>
            Filtrar por...
          </option>
          <option value="fecha">Fecha</option>
          <option value="fechahora_inicio">Hora Inicio</option>
          <option value="fechahora_fin">Hora Fin</option>
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
          <option value="estado">Estado</option>
        </select>
        <label className="relative flex items-center flex-1 gap-4 m-0">
          <input
            title="Selecciona un filtro y escribe tu búsqueda..."
            type="text"
            placeholder="Selecciona un filtro y escribe tu búsqueda..."
            className=" ps-4 pe-8 py-2 w-full border-2 border-black rounded-xl text-base"
            value={search}
            onChange={onSearchCharge}
          />
          <SearchIcon className="absolute right-2" />
        </label>
        <article className="text-white flex items-center justify-center gap-4 lg:gap-8 transition-all duration-300">
          <button
            onClick={prevPage}
            className="py-2 px-4 rounded-lg shadow-lg border-2 border-black bg-white text-black hover:bg-gray-200 transition-all duration-300"
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            className="py-2 px-4 rounded-lg shadow-lg border-2 border-black bg-white text-black hover:bg-gray-200 transition-all duration-300"
          >
            Siguiente
          </button>
        </article>
      </header>

      {isLoading ? (
        <Loading />
      ) : filterData().length > 0 ? (
        <ul className="p-4 min-w-full grid gap-8 sm:grid-cols-2 md:p-8 lg:px-10 lg:grid-cols-3 xl:px-20 xl:grid-cols-4 ">
          {filterData().map((element, id) => {
            return <DoctorConsultCard key={id} consult={element as Consult} />;
          })}
        </ul>
      ) : (
        <p className="text-lg font-semibold text-center mt-4">
          No se encontró ninguna cita
        </p>
      )}
    </section>
  );
}

export default DoctorConsultSection;
