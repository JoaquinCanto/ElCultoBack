import { Router } from "express";
import juegoRouter from "../routes/juego";
import lugarRouter from "../routes/lugar";
import personaRouter from "../routes/persona";
import mesaController from "../routes/mesa";
import inscripcionController from "../routes/inscripcion";
import sugerenciaController from "../routes/sugerencia";

const router = Router();

router.use('/juego', juegoRouter);
router.use('/lugar', lugarRouter);
router.use('/persona', personaRouter);
router.use('/mesa', mesaController);
router.use('/inscripcion', inscripcionController);
router.use('/sugerencia', sugerenciaController);

export default router;