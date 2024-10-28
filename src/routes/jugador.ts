import { Router } from "express";
import jugadorController from "../controllers/jugador";


const jugadorRouter = Router();

//GET - http://localhost/jugador
jugadorRouter.get('/', jugadorController.getAll);

//GET - http://localhost/jugador/:id
jugadorRouter.get('/:id', jugadorController.getById);

//POST - http://localhost/jugador
jugadorRouter.post('/', jugadorController.create);

//DELETE - http://localhost/jugador/:id
jugadorRouter.delete('/:id', jugadorController.delete);

//PUT - http://localhost/jugador/:id
jugadorRouter.put('/:id', jugadorController.update);

export default jugadorRouter;