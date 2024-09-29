import { useContext, useEffect, useState } from "react";
import { getAvailableConsult, scheduleConsult } from "../../../api/auth";
import Calendar from "react-calendar";
import "../../../styles/ReactCalendar.css";
import TimeIcon from "../../../icons/Time";
import { UserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type infoDays = {
  hora_inicio: string;
  hora_fin: string;
  id_medico: number;
  dia_semana: number;
  especialidad: string;
  nombre_completo: string;
  fecha: string;
};

type Especialidad = number;

function ScheduleConsult() {
  const [value, onChange] = useState<Value>(new Date()); // Estado que viene con React-calendar

  const [especialidad, setEspecialidad] = useState<Especialidad>(); // Estado que almacena el valor seleccionado en el Select de cada especialidad. Puede ser 1 o 2

  const [infoDays, setInfoDays] = useState<infoDays[] | []>([]); // Estado que almacena un arreglo con todos los horarios que corresponden con la especialidad

  const [daysAvailable, setDaysAvailable] = useState<string[]>([]); // Estado que almacena un arreglo con unicamente la fecha en formato string de cada horario que corresponde con la especialidad

  const [daySelected, setDaySelected] = useState<infoDays[] | []>([]); // Estado que almacena un arreglo con los horarios que correspondan con la fecha seleccionada por el usuario

  const [selection, setSelection] = useState(
    `${new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`
  );

  const { userState } = useContext(UserContext);
  const { user } = userState;
  const navigate = useNavigate();

  // Función que recibe el dia de la semana como un numero y devuelve la fecha más próxima de ese dia
  const whatDayIs = (day: number) => {
    const date = new Date();
    const Nday = date.getDay() == 0 ? 7 : date.getDay();
    const SumDay = day - Nday < 0 ? 7 + (day - Nday) : day - Nday;
    const result = date.getDate() + SumDay;
    date.setDate(result < date.getDate() ? result + 7 : result);
    return date.toLocaleDateString();
  };

  // UseEffect que se dispara cada vez que se selecciona una especialidad. En el mismo se realiza la petición al Backend para que devuelva los horarios que correspondan con la especialidad seleccionada
  useEffect(() => {
    if (especialidad) {
      const getData = async () => {
        const response = await getAvailableConsult(especialidad);
        return response;
      };

      getData().then((res) => {
        const horarios = res.data.map((element: infoDays) => {
          return whatDayIs(element.dia_semana);
        });
        const infoWithDate = res.data.map((element: infoDays) => {
          return { ...element, fecha: whatDayIs(element.dia_semana) };
        });
        setDaysAvailable(horarios);
        setInfoDays(infoWithDate);
      });
    }
  }, [especialidad]);

  // Función propia de React Calendar que permite cambiar el estilo de ciertos días en el calendario. Recibe como parámetros el día y la vista del calendario, y, si se cumple determinada condición, se estiliza el día
  const stylingAvailableDays = ({
    date,
    view,
  }: {
    date: { toLocaleDateString: () => string };
    view: string;
  }) => {
    return view === "month" && daysAvailable.includes(date.toLocaleDateString())
      ? "text-white bg-blue-600 rounded-full flex items-center justify-center"
      : null;
  };

  // Función propia de React Calendar que permite ejecutar una determinada lógica cuando se hace click a ciertos días en el calendario. Recibe como parámetros el valor del día y, si se cumple determinada condición, se ejecuta la lógica establecida
  const showInfoAvailableDays = (value: {
    toLocaleDateString: (
      locale?: string,
      options?: { weekday: string; year: string; month: string; day: string }
    ) => string;
  }) => {
    setSelection(
      `${value.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`
    );
    if (daysAvailable.includes(value.toLocaleDateString())) {
      const infodeldia = infoDays.filter(
        (element) => element.fecha === value.toLocaleDateString()
      );
      setDaySelected(infodeldia);
    } else {
      setDaySelected([]);
    }
  };

  // Función que se ejecuta cuando se hace click en uno de los horarios que se muestran tras seleccionar la especialidad y el día
  const agendar = async (cita: infoDays) => {
    const message = `¿Desea agendar una cita con ${cita.nombre_completo} el día ${cita.fecha} desde las ${cita.hora_inicio} hasta las ${cita.hora_fin}?`;
    if (confirm(message) && user?.id_paciente) {
      const [day, month, year] = cita.fecha.split("/");
      const [hoursInit, minutesInit] = cita.hora_inicio.split(":");
      const [hoursEnd, minutesEnd] = cita.hora_fin.split(":");
      const fechahora_inicio = new Date(
        Date.UTC(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hoursInit),
          Number(minutesInit)
        )
      );
      const fechahora_fin = new Date(
        Date.UTC(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hoursEnd),
          Number(minutesEnd)
        )
      );
      const response = await scheduleConsult(
        cita.id_medico,
        user.id_paciente,
        fechahora_inicio,
        fechahora_fin
      );
      if (!response.error) {
        toast.success("Cita agendada exitosamente", {
          position: "bottom-right",
        });
        navigate("/paciente/mis-citas");
      } else {
        toast.error("Ha ocurrido un error al agendar su cita", {
          position: "bottom-right",
        });
      }
    }
  };

  const doctorsWithPhoto = {
    "Martha Alvarez": "bg-[url('/images/Martha_Alvarez.webp')]",
    "Juan Pérez": "bg-[url('/images/Juan_Perez.webp')]",
    "Carlos Vargas": "bg-[url('/images/Carlos_Vargas.webp')]",
    "Joey Tribbiani": "bg-[url('/images/Joey_Tribbiani.webp')]",
  };

  return (
    <main className="flex flex-col gap-4 items-center justify-center py-6 ">
      <section className="grid grid-cols-[1.5fr_1fr] justify-center w-full px-8 gap-x-12 gap-y-4">
        <h1 className="text-2xl font-medium tracking-wider text-center">
          Seleccione la especialidad y la fecha
        </h1>
        <h1 className="text-2xl font-medium tracking-wider text-center">
          Seleccione un horario
        </h1>
        <article className="flex flex-col max-w-xl shadow-focused rounded-lg w-full mx-auto">
          <header className="bg-blue-600 py-4 px-12 flex items-center justify-center rounded-t-lg">
            <select
              className="p-2 text-lg text-white border flex-1 border-white bg-transparent rounded-lg max-w-80"
              defaultValue=""
              onChange={(e) => setEspecialidad(Number(e.target.value))}
              name=""
              id=""
            >
              <option disabled value="">
                Especialidad
              </option>
              <option className="text-black" value={1}>
                Psicología
              </option>
              <option className="text-black" value={2}>
                Psiquiatría
              </option>
            </select>
          </header>
          <Calendar
            className="p-8"
            tileClassName={stylingAvailableDays}
            onClickDay={showInfoAvailableDays}
            minDate={new Date()}
            onChange={onChange}
            value={value}
          />
        </article>
        <article className="bg-white rounded-lg shadow-focused mx-auto w-[400px]">
          <header className="bg-blue-600 text-white rounded-t-md py-2">
            <h1 className="text-center text-2xl tracking-wider capitalize">
              {selection?.split(" de ")[0]}
            </h1>
            <h1 className="text-center text-base tracking-wide">
              {selection !== "" &&
                `${selection?.split(" de ")[1]} ${selection?.split(" de ")[2]}`}
            </h1>
          </header>
          <ul className="flex flex-col gap-4 overflow-y-scroll py-8 px-4">
            {daySelected.length > 0 ? (
              daySelected.map((disponibilidad, id) => {
                return (
                  <li
                    onClick={() => agendar(disponibilidad)}
                    className="shadow-md text-black rounded-lg mx-4 px-2 py-2 flex items-center gap-2 border border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-300"
                    key={id}
                  >
                    <TimeIcon />
                    <span className="">
                      {disponibilidad.hora_inicio.slice(0, 5)} -{" "}
                      {disponibilidad.hora_fin.slice(0, 5)}
                    </span>
                    <figure
                      className={
                        "h-8 w-8 bg-cover bg-center rounded-full " +
                        doctorsWithPhoto[
                          disponibilidad.nombre_completo as
                            | "Martha Alvarez"
                            | "Juan Pérez"
                            | "Carlos Vargas"
                            | "Joey Tribbiani"
                        ]
                      }
                    ></figure>
                    <span>{disponibilidad.nombre_completo}</span>
                  </li>
                );
              })
            ) : (
              <p className="text-center font-semibold text-lg">
                {especialidad && daySelected.length > 0
                  ? "No hay disponibilidad para este día"
                  : ""}
              </p>
            )}
          </ul>
        </article>
      </section>
    </main>
  );
}

export default ScheduleConsult;
