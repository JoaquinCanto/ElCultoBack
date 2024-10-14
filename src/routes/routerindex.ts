import { Router } from "express";
import juegoRouter from "./juego";
import lugarRouter from "./lugar";

const router = Router();

router.use('/juego', juegoRouter);
router.use('/lugar', lugarRouter);

export default router;