import { Router } from 'express'
import { validateHorariosUpdate } from '../middlewares/horariosMiddleware.js'
import { updateHorariosController }  from '../controllers/horariosController.js'

const router = Router()

//router.post('/horarios', validateHorarios, createHorariosController )
//router.post('/horarios/disponibles', validateHorarios, createHorariosController )
router.post('/horarios/actualizar', validateHorariosUpdate, updateHorariosController )

export default router
