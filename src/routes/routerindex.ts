import { Router } from "express";
import juegoRouter from "./juego";
import lugarRouter from "./lugar";
import personaRouter from "./persona";
import adminRouter from "./administador";
import narradorRouter from "./narrador";

const router = Router();

router.use('/juego', juegoRouter);
router.use('/lugar', lugarRouter);
router.use('/persona', personaRouter);
router.use('/admin', adminRouter);
router.use('/narrador', narradorRouter);

export default router;