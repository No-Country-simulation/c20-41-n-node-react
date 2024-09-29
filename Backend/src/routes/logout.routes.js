import { Router } from 'express'

const router = Router()

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.send('Sesión cerrada exitosamente');
  });
});
export default router