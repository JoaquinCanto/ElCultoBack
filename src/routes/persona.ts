import { Router } from "express";
import personaController from "../controllers/persona";


const personaRouter = Router();

//GET - http://localhost/persona
personaRouter.get('/', personaController.getAll);

//GET - http://localhost/persona/email/:email
personaRouter.get('/email/:email', personaController.getByEmail);

//GET - http://localhost/persona/:id
personaRouter.get('/:id', personaController.getById);

//POST - http://localhost/persona
personaRouter.post('/', personaController.create);

//DELETE - http://localhost/persona/:id
personaRouter.delete('/:id', personaController.delete);

//PUT - http://localhost/persona/:id
personaRouter.put('/:id', personaController.update);

export default personaRouter;