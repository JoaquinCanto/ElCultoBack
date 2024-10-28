import { Router } from "express";
import juegoRouter from "./juego";
import lugarRouter from "./lugar";
import personaRouter from "./persona";

const router = Router();

router.use('/juego', juegoRouter);
router.use('/lugar', lugarRouter);
router.use('/persona', personaRouter);

export default router;