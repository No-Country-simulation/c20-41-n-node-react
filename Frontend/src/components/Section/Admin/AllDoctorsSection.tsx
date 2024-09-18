import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "../../../icons/Search";
import Loading from "../../Loading/Loading";
import { getAllDoctors } from "../../../api/auth";

export type Doctor = {
  nombre: string,
  apellido: string,
  especialidad: string
};

function AllDoctorsSection() {
  const [doctors, setDoctors] = useState<Doctor[] | []>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const response = await getAllDoctors();
      return response;
    };

    getData().then((res) => {
      setIsLoading(false)
      setDoctors(res.data as Doctor[]);
    });
  }, []);
  const lastPage = doctors.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filterData = () => {
    if (search.length === 0 || filter === "") {
      return doctors.slice(currentPage, currentPage + 15);
    }
    const filtered = doctors
      .filter((element) =>
        element[
          filter as
            | "nombre"
            | "apellido"
            | "especialidad"
        ].includes(search)
      )
      .slice(currentPage, currentPage + 15);
    return filtered;
  };

  const nextPage = () => {
    if (currentPage + 15 < lastPage && filter === "") {
      setCurrentPage(currentPage + 15);
    }
    const filtered = doctors.filter((element) =>
      element[
        filter as
          | "nombre"
          | "apellido"
          | "especialidad"
      ]?.includes(search)
    );

    if (filtered && currentPage + 15 < filtered.length) {
      setCurrentPage(currentPage + 15);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 15);
    }
  };

  const onSearchCharge = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  const tableClasses = {
    0: "bg-white whitespace-nowrap p-1 border-x border-black text-center",
    1: "bg-sky-100 whitespace-nowrap p-1 border-x border-black text-center",
  };

  return (
    <section className="flex flex-col items-center justify-start min-h-full py-6">
      <h1 className="text-2xl font-medium tracking-wider">Lista de Médicos</h1>
      <header className="flex flex-col md:flex-row md:items-center w-full gap-y-2 gap-x-8 p-4  md:py-4 md:px-10 transition-all duration-300">
        <select
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
          className="ps-4 pe-8 py-2 border-2 border-black rounded-xl"
        >
          <option value="" disabled>
            Filtrar por...
          </option>
          <option value="nombre">Nombre</option>
          <option value="apellido">Apellido</option>
          <option value="especialidad">Especialidad</option>
        </select>
        <label className="relative flex items-center flex-1 gap-4">
          <input
            title="Selecciona un filtro y escribe tu búsqueda..."
            type="text"
            placeholder="Selecciona un filtro y escribe tu búsqueda..."
            className=" ps-4 pe-8 py-2 w-full border-2 border-black rounded-xl"
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
        <article className="flex justify-center min-w-full py-4 md:py-8 px-16 overflow-x-auto">
          <table className="flex-1 border border-black text-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="whitespace-nowrap p-1">Nombre</th>
                <th className="whitespace-nowrap p-1">Apellido</th>
                <th className="whitespace-nowrap p-1">Especialidad</th>
              </tr>
            </thead>
            <tbody>
              {filterData().map((element, id) => {
                return (
                  <tr key={id}>
                    <td className={tableClasses[(id % 2) as 0 | 1]}>
                      {element.nombre}
                    </td>
                    <td className={tableClasses[(id % 2) as 0 | 1]}>
                      {element.apellido}
                    </td>
                    <td className={tableClasses[(id % 2) as 0 | 1]}>
                      {element.especialidad}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
      ) : (
        <p className="text-lg font-semibold text-center mt-4">
          No se encontró ningún médico
        </p>
      )}
    </section>
  );
}

export default AllDoctorsSection;
