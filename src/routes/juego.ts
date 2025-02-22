import { Router } from "express";
import juegoController from "../controllers/juego";


const juegoRouter = Router();

//GET - http://localhost/juego
juegoRouter.get('/', juegoController.getAll);

//GET - http://localhost/juego/habilitado
juegoRouter.get('/habilitado', juegoController.getAllowed);

//GET - http://localhost/juego/top
juegoRouter.get('/top', juegoController.getTopPlayedGames);

//GET - http://localhost/juego/:id
juegoRouter.get('/:id', juegoController.getById);

//POST - http://localhost/juego
juegoRouter.post('/', juegoController.create);

//DELETE - http://localhost/juego/:id
juegoRouter.delete('/:id', juegoController.delete);

//PUT - http://localhost/juego/:id
juegoRouter.put('/:id', juegoController.update);

export default juegoRouter;