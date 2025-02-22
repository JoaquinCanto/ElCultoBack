import { Router } from "express";
import juegoRouter from "./juego";
import lugarRouter from "./lugar";
import personaRouter from "./persona";
import mesaController from "./mesa";
import inscripcionController from "./inscripcion";
import sugerenciaController from "./sugerencia";

const router = Router();

router.use('/juego', juegoRouter);
router.use('/lugar', lugarRouter);
router.use('/persona', personaRouter);
router.use('/mesa', mesaController);
router.use('/inscripcion', inscripcionController);
router.use('/sugerencia', sugerenciaController);

export default router;