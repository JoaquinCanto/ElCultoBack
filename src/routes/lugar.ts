import { Router } from "express";
import lugarController from "../controllers/lugar";


const lugarRouter = Router();

//GET - http://localhost/lugar
lugarRouter.get('/', lugarController.getAll);

//GET - http://localhost/lugar/:id
lugarRouter.get('/:id', lugarController.getById);

//POST - http://localhost/lugar
lugarRouter.post('/', lugarController.create);

//DELETE - http://localhost/lugar/:id
lugarRouter.delete('/:id', lugarController.delete);

//PUT - http://localhost/lugar/:id
lugarRouter.put('/:id', lugarController.update);

export default lugarRouter;