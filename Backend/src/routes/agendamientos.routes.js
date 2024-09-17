import { Router } from 'express'
import { getAllAgendamientosController, getAgendamientoController,
	getAgendamientosDisponiblesController,
	getAgendamientosDisponiblesPorEspecialidadController,
	getAllAgendamientosDisponiblesController,
	agendarController,
	updateAgendamientoStateController, 
	getAgendamientosPacienteController}
	from '../controllers/agendamientosController.js';
import { validateGetAgendamiento,
	validateGetAgendamientosDisponibles, validateAgendar,
	validateGetAgendamientosDisponiblesPorEspecialidad,
	validateGetAllAgendamientosDisponibles,
	validateUpdateAgendamientoState}
	from '../middlewares/agendamientosMiddleware.js';

const router = Router()

router.get('/agendamientos',
	getAllAgendamientosController);
router.get('/agendamientos/:id_agendamiento',
	validateGetAgendamiento, getAgendamientoController);
router.get('/agendamientos/paciente/:id_paciente', getAgendamientosPacienteController)
router.put('/agendamientos/estado/:id_agendamiento',
	validateUpdateAgendamientoState, updateAgendamientoStateController);
router.post('/agendamientos/agendar/:id_medico',
	validateAgendar, agendarController);
router.get('/agendamientos/disponibles/todos',
	validateGetAllAgendamientosDisponibles,
	getAllAgendamientosDisponiblesController);
router.get('/agendamientos/disponibles/medico/:id_medico',
	validateGetAgendamientosDisponibles, getAgendamientosDisponiblesController);
router.get('/agendamientos/disponibles/especialidad/:id_especialidad',
	validateGetAgendamientosDisponiblesPorEspecialidad,
	getAgendamientosDisponiblesPorEspecialidadController);

export default router
