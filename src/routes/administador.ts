import { Router } from "express";
import administradorController from "../controllers/administrador";


const adminRouter = Router();

//GET - http://localhost/admin
adminRouter.get('/', administradorController.getAll);

//GET - http://localhost/admin/:id
adminRouter.get('/:id', administradorController.getById);

//POST - http://localhost/admin
adminRouter.post('/', administradorController.create);

//DELETE - http://localhost/admin/:id
adminRouter.delete('/:id', administradorController.delete);

//PUT - http://localhost/admin/:id
adminRouter.put('/:id', administradorController.update);

export default adminRouter;