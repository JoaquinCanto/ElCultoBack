import { Router } from "express";
import sugerenciaController from "../controllers/sugerencia";


const sugerenciaRouter = Router();

//GET - http://localhost/sugerencia
sugerenciaRouter.get('/', sugerenciaController.getAll);

//GET - http://localhost/sugerencia/relevante
sugerenciaRouter.get('/relevante', sugerenciaController.getRelevant);

//GET - http://localhost/sugerencia/:id
sugerenciaRouter.get('/:id', sugerenciaController.getById);

//POST - http://localhost/sugerencia
sugerenciaRouter.post('/', sugerenciaController.create);

//DELETE - http://localhost/sugerencia/:id
sugerenciaRouter.delete('/:id', sugerenciaController.delete);

//PUT - http://localhost/sugerencia/:id
sugerenciaRouter.put('/:id', sugerenciaController.update);

export default sugerenciaRouter;