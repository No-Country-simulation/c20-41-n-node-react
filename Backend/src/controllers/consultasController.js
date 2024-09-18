import { getAllConsultas, getConsulta, startConsulta, endConsulta,
	getNotasConsulta, postNotaConsulta } from '../models/consultasModel.js';

export const getAllConsultasController = async (req, res) => {
	try {
		const consultas = await getAllConsultas();
		
		return res.status(200).json(consultas);
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}

export const getConsultaController = async (req, res) => {
	const { id_consulta } = req.params;
	
	try {
		const consulta = await getConsulta(id_consulta);
		
		return res.status(200).json(consulta);
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}

export const startConsultaController = async (req, res) => {
	const { id_agendamiento } = req.params;
	const { urlVideollamada } = req.body;
	
	try {
		const consulta = await startConsulta(id_agendamiento);
		const agendamiento = await setUrlVideollamada(
			id_agendamiento, urlVideollamada);
		
		if (consulta) {
			return res.status(200).json(consulta);
		} else {
			return res.status(400);
		}
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}

export const endConsultaController = async (req, res) => {
	const { id_consulta } = req.params;
	
	try {
		const consulta = await endConsulta(id_consulta);
		
		if (consulta) {
			return res.status(200).json(consulta);
		} else {
			return res.status(400);
		}
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}

export const getNotasConsultaController = async (req, res) => {
	const { id_consulta } = req.params;
	
	try {
		const notas = await getNotasConsulta(id_consulta);

		return res.status(200).json(notas);
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}

export const postNotaConsultaController = async (req, res) => {
	const { id_consulta } = req.params;
	const { nota } = req.body;
	
	try {
		const nota = await postNotaConsulta(id_consulta, nota);

		if (nota) {
			return res.status(201).json(nota);
		} else {
			return res.status(400);
		}
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}

export const getConclusionConsultaController = async (req, res) => {
	const { id_consulta } = req.params;

	try {
		const conclusion = await getConclusionesConsulta(id_consulta);
		
		return res.status(200).json(conclusion);
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}

export const postConclusionConsultaController = async (req, res) => {
	const { id_consulta } = req.params;
	const { conclusion } = req.body;
	
	try {
		const conclusion = await postConclusionConsulta(id_consulta, conclusion);
		
		if (conclusion) {
			return res.status(201).json(conclusion);
		} else {
			return res.status(400);
		}
	} catch(error) {
		console.error(error);
		return res.status(500).json(error);
	}
}
