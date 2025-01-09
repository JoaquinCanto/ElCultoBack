import { Request, Response } from "express";
import { PrismaClient, Administrador } from "@prisma/client";

const prisma = new PrismaClient();

const administradorController = {
	// Obtener todos los administradores
	getAll: async (_req: Request, res: Response) => {
		try {
			const alladmins: Administrador[] = await prisma.administrador.findMany();
			return res.status(200).json({
				status: 200,
				total: alladmins.length,
				itmes: alladmins,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(204).json({
					message: error.message,
					error: true,
				});
			}
		}
	},

	//Obtener un administrador por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idAdministrador: Administrador | null = await prisma.administrador.findUnique({ where: { idAdministrador: Number(id) } });
			return res.status(200).json({
				status: 200,
				itmes: idAdministrador,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(204).json({
					message: error.message,
					error: true,
				});
			}
		}
	},

	//Crear un administrador
	create: async (req: Request, res: Response) => {
		try {
			const newAdmin: Administrador = await prisma.administrador.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Administrador creado exitosamente.',
				status: 201,
				itmes: newAdmin,
				error: false,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(400).json({
					message: error.message,
					error: true,
				});
			}
		}
	},

	//Borrar un administrador por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteAdmin = await prisma.administrador.delete({ where: { idAdministrador: Number(id) } });
			return res.status(200).json({
				status: 200,
				itmes: deleteAdmin,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(204).json({
					message: error.message,
					error: true,
				});
			}
		}
	},

	//Modificar un administrador por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const itmes = _req.body;
			const updateAdmin: Administrador = await prisma.administrador.update({ where: { idAdministrador: Number(id) }, data: itmes });
			return res.status(200).json({
				status: 200,
				itmes: updateAdmin,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(204).json({
					message: error.message,
					error: true,
				});
			}
		}
	},
};

export default administradorController;
