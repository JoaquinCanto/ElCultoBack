import { Router } from "express";
import narradorController from "../controllers/narrador";


const narradorRouter = Router();

//GET - http://localhost/narrador
narradorRouter.get('/', narradorController.getAll);

//GET - http://localhost/narrador/:id
narradorRouter.get('/:id', narradorController.getById);

//POST - http://localhost/narrador
narradorRouter.post('/', narradorController.create);

//DELETE - http://localhost/narrador/:id
narradorRouter.delete('/:id', narradorController.delete);

//PUT - http://localhost/narrador/:id
narradorRouter.put('/:id', narradorController.update);

export default narradorRouter;