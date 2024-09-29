import { getAllAgendamientos, getAllAgendamientosPaciente,
	getAgendamiento, agendar, getAllAgendamientosDisponibles,
	getAgendamientosDisponibles, getAgendamientosDisponiblesPorEspecialidad,
	updateAgendamientoState, 
	getAllAgendamientosMedico,
	getNotaConclusion, postNotaConclusion }
	from '../models/agendamientosModel.js';

export const getAllAgendamientosController = async (req, res) => {
	const { id_paciente } = req.query;

	console.log({id_paciente});

	try {
		let agendamientos;

		if (id_paciente) 
			agendamientos = await getAllAgendamientosPaciente(id_paciente);
		else 
			agendamientos = await getAllAgendamientos();

		return res.status(200).json(agendamientos);
	} catch (error) {
		console.error('Error al buscar agendamiento');
		console.error(error);
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const getAgendamientosPacienteController = async (req, res) => {
	const { id_paciente } = req.params;

	try {
		const agendamientos = await getAllAgendamientosPaciente(id_paciente);

		if (agendamientos) {
			return res.json(agendamientos);
		} else {
			return res.json({error: "?"});
		}
	} catch (error) {
		console.error(error);
		console.error('Error al buscar agendamiento');
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const getAgendamientosMedicoController = async (req, res) => {
	const { id_medico } = req.params;

	try {
		const agendamientos = await getAllAgendamientosMedico(id_medico);

		if (agendamientos) {
			return res.json(agendamientos);
		} else {
			return res.json({error: "?"});
		}
	} catch (error) {
		console.error(error);
		console.error('Error al buscar agendamiento');
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const getAgendamientoController = async (req, res) => {
	const { id_agendamiento } = req.params;

	try {
		const agendamiento = await getAgendamiento(id_agendamiento);

		if (agendamiento) {
			return res.status(200).json(agendamiento);
		} else {
			return res.status(404).json({error: "agendamiento no existe"});
		}
	} catch (error) {
		console.error('Error al buscar agendamiento');
		console.error(error);
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const getAgendamientosDisponiblesController = async (req, res) => {
	const { id_medico }  = req.params;
	const { fechahora_inicio, fechahora_fin } = req.query;

	try {
		const agendamientosDisponibles = await getAgendamientosDisponibles(id_medico,
			fechahora_inicio, fechahora_fin);

		return res.status(200).json(agendamientosDisponibles);
	} catch(error) {
		console.log('Error al buscar agendamientos disponibles');
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const getAllAgendamientosDisponiblesController = async (req, res) => {
	const { fechahora_inicio, fechahora_fin } = req.query;

	try {
		const agendamientosDisponibles = await getAllAgendamientosDisponibles(
			fechahora_inicio, fechahora_fin);

		return res.status(200).json(agendamientosDisponibles);
	} catch(error) {
		console.log('Error al buscar agendamientos disponibles');
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const getAgendamientosDisponiblesPorEspecialidadController = async (req, res) => {
	const { id_especialidad } = req.params;
	const { fechahora_inicio, fechahora_fin } = req.query;

	try {
		const agendamientosDisponibles = await getAgendamientosDisponiblesPorEspecialidad(id_especialidad, fechahora_inicio, fechahora_fin);

		return res.status(200).json(agendamientosDisponibles);
	} catch(error) {
		console.log('Error al buscar agendamientos disponibles');
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const agendarController = async (req, res) => {
	const { id_medico } = req.params;
	const { id_paciente, fechahora_inicio, fechahora_fin } = req.body;

	try {
		const turno = await agendar(id_medico, id_paciente,
			fechahora_inicio, fechahora_fin);

		if (turno) {
			return res.status(201).json(turno);
		} else {
			return res.status(400).json({error: 'no se puede agendar el turno'});
		}
	} catch(error) {
		console.log('Error al agendar turno');
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const updateAgendamientoStateController = async (req, res) => {
	const { id_agendamiento } = req.params;
	const { estado, url_videollamada  } = req.body;

	try {
		const agendamiento = await updateAgendamientoState(id_agendamiento, estado, url_videollamada);

		if (agendamiento) {
			return res.status(200).json(agendamiento);
		} else {
			return res.status(400).json({error: 'no se pudo cambiar el estado'});
		}
	} catch(error) {
		console.log('Error al cambiar estado de agendamiento');
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}


export const getNotaConclusionController = async (req, res) => {
	const { id_agendamiento } = req.params;

	try {
		const nota = await getNotaConclusion(id_agendamiento);

		return res.status(200).json(nota);
	} catch(error) {
		console.error(error);
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

export const postNotaConclusionController = async (req, res) => {
	const { id_agendamiento } = req.params;
	const { nota } = req.body;

	try {
		const conclusion = await postNotaConclusion(id_agendamiento, nota);

		return res.status(201).json(conclusion);
	} catch(error) {
		console.error(error);
		res.status(500).json({ error: 'Error interno del servidor.' });
	}
}

