import pool from '../config/config.js'
import format from 'pg-format';

// poblar horarios habilitados por medico
export const poblarHorarios = async (
	id_medico, dias_disponibles,
	horario_inicio_jornada, horario_fin_jornada,
	minutos_sesion, minutos_descanso) => {
	try {
		const queryString = format(
			`DELETE FROM horarios WHERE id_medico=%s;
 			 INSERT INTO horarios
			  (id_medico, dia_semana, hora_inicio, hora_fin) VALUES %L
     			RETURNING *`,
			id_medico,
			horariosToInsert(id_medico, dias_disponibles,
				horario_inicio_jornada, horario_fin_jornada,
				minutos_sesion, minutos_descanso)
		);

    const result = await pool.query(queryString);
		const horarios = result[1].rows; // [1] porque [0] son returns de DELETE

		return horarios;
  } catch (error) {
    console.log(error);
  }
}

export const getHorarios = async (id_medico) => {
	try {
    const query = await pool.query(
			`SELECT * from horarios WHERE id_medico=$1;`,
			[id_medico]
		);
		return query.rows;
  } catch (error) {
    console.log(error);
  }
}

export const getHorariosBySpeciality = async (id_especialidad) => {
	try {
    const query = await pool.query(
			`SELECT horarios.hora_inicio, horarios.hora_fin, horarios.id_medico, horarios.dia_semana, especialidades.nombre AS especialidad, (usuarios.nombre || ' ' || usuarios.apellido) AS nombre_completo from horarios
			INNER JOIN medicos ON horarios.id_medico = medicos.id
			INNER JOIN usuarios ON medicos.usuario_id = usuarios.nro_documento
			INNER JOIN especialidades ON especialidades.id = medicos.especialidad_id 
			WHERE medicos.especialidad_id = $1
			ORDER BY horarios.hora_inicio;`,
			[id_especialidad]
		);
		return query.rows;
  } catch (error) {
    console.log(error);
  }
}

export const getAllHorarios = async () => {
	try {
    const query = await pool.query(
			`SELECT * from horarios`
		);
		return query.rows;
  } catch (error) {
    console.log(error);
  }
}


// genera lista de objetos de la forma {hora_inicio, hora_fin}
// input:
//   hora de inicio de jornada (string, 'hh:mm'), hora fin de jornada (same),
//   duracion de sesion (en minutos), duracion de descanso (same) 
function generarHorarios(
	horario_inicio_jornada, horario_fin_jornada,
	minutos_sesion, minutos_descanso) {
  function timeToDate(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  function dateToTime(date) {
    return date.toTimeString().slice(0, 5);
  }

  let hora = timeToDate(horario_inicio_jornada);
  const hora_cierre = timeToDate(horario_fin_jornada);

  const lista_horarios = [];

  while (hora < hora_cierre) {
    const hora_fin_sesion = new Date(hora.getTime() + minutos_sesion*60*1000);

    if (hora_fin_sesion > hora_cierre) break;

    lista_horarios.push({
      hora_inicio: dateToTime(hora),
      hora_fin: dateToTime(hora_fin_sesion)
    });

    hora = new Date(hora_fin_sesion.getTime() + minutos_descanso*60*1000);
  }

  return lista_horarios;
}

function horariosToInsert(
	id_medico, dias_disponibles,
	horario_inicio_jornada, horario_fin_jornada,
	minutos_sesion, minutos_descanso) {
	return dias_disponibles.map(dia =>
		generarHorarios(
				horario_inicio_jornada, horario_fin_jornada,
				minutos_sesion, minutos_descanso)
			.map(h => ({dia, id_medico, ...h})))
			.reduce((t, d) => t.concat(d), [])
			.map(e => [e.id_medico, e.dia, e.hora_inicio, e.hora_fin]);
}
