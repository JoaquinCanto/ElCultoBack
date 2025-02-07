import { Router } from "express";
import inscripcionController from "../controllers/inscripcion";


const inscripcionRouter = Router();

//GET - http://localhost/inscripcion
inscripcionRouter.get('/', inscripcionController.getAll);

//GET - http://localhost/inscripcion/:id
inscripcionRouter.get('/:id', inscripcionController.getById);

//GET - http://localhost/inscripcion/jugador/:id
inscripcionRouter.get('/jugador/:id', inscripcionController.getAllPlayerByPlayerId);

//POST - http://localhost/inscripcion
inscripcionRouter.post('/', inscripcionController.create);

//DELETE - http://localhost/inscripcion/:id
inscripcionRouter.delete('/:id', inscripcionController.delete);

//PUT - http://localhost/inscripcion/:id
inscripcionRouter.put('/:id', inscripcionController.update);

export default inscripcionRouter;