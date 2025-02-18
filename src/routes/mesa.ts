import { Router } from "express";
import mesaController from "../controllers/mesa";


const mesaRouter = Router();

//GET - http://localhost/mesa
mesaRouter.get('/', mesaController.getAll);

//GET - http://localhost/mesa/abierta
mesaRouter.get('/abierta', mesaController.getAllOpen);

//GET - http://localhost/mesa/narrador/:id
mesaRouter.get('/narrador/:id', mesaController.getAllNarratedByNarratorId);

//GET - http://localhost/mesa/:id
mesaRouter.get('/:id', mesaController.getById);

//POST - http://localhost/mesa
mesaRouter.post('/', mesaController.create);

//DELETE - http://localhost/mesa/:id
mesaRouter.delete('/:id', mesaController.delete);

//PUT - http://localhost/mesa/:id
mesaRouter.put('/:id', mesaController.update);

export default mesaRouter;