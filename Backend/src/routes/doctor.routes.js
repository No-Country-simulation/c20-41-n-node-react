import { Router } from 'express'

const router = Router()

router.get('/doctor', (req, res) => {
  if (req.isAuthenticated() && req.user.rol === 'medico') {
    res.status(200).send({message: "Autorizado"})
  } else {
    res.status(401).send({ error: "No autorizado" })
  }
})

export default router