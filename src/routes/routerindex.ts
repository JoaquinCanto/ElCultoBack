import { Router } from "express";
import juegoRouter from "./juego";
import lugarRouter from "./lugar";
import personaRouter from "./persona";
import adminRouter from "./administador";
import narradorRouter from "./narrador";
import jugadorController from "./jugador";
import mesaController from "./mesa";
import inscripcionController from "./inscripcion";

const router = Router();

router.use('/juego', juegoRouter);
router.use('/lugar', lugarRouter);
router.use('/persona', personaRouter);
router.use('/admin', adminRouter);
router.use('/narrador', narradorRouter);
router.use('/jugador', jugadorController);
router.use('/mesa', mesaController);
router.use('/inscripcion', inscripcionController);

export default router;