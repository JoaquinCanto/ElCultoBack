import { Request, Response } from "express";
import { PrismaClient, Narrador } from "@prisma/client";

const prisma = new PrismaClient();

const narradorController = {
	// Obtener todos los narradores
	getAll: async (_req: Request, res: Response) => {
		try {
			const allnarradores: Narrador[] = await prisma.narrador.findMany();
			return res.status(200).json({
				status: 200,
				total: allnarradores.length,
				data: allnarradores,
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

	//Obtener un narrador por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idNarrador: Narrador | null = await prisma.narrador.findUnique({ where: { idNarrador: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: idNarrador,
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

	//Crear un narrador
	create: async (req: Request, res: Response) => {
		try {
			const newNarrador: Narrador = await prisma.narrador.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Narrador creado exitosamente.',
				status: 201,
				data: newNarrador,
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

	//Borrar un narrador por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteNarrador = await prisma.narrador.delete({ where: { idNarrador: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: deleteNarrador,
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

	//Modificar un narrador por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const data = _req.body;
			const updateNarrador: Narrador = await prisma.narrador.update({ where: { idNarrador: Number(id) }, data: data });
			return res.status(200).json({
				status: 200,
				data: updateNarrador,
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

export default narradorController;
