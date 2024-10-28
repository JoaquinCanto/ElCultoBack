import { Request, Response } from "express";
import { PrismaClient, Mesa } from "@prisma/client";

const prisma = new PrismaClient();

const mesaController = {
	// Obtener todos las mesas
	getAll: async (_req: Request, res: Response) => {
		try {
			const allmesas: Mesa[] = await prisma.mesa.findMany();
			return res.status(200).json({
				status: 200,
				total: allmesas.length,
				data: allmesas,
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

	//Obtener una mesa por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idMesa: Mesa | null = await prisma.mesa.findUnique({ where: { idMesa: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: idMesa,
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

	//Crear una mesa
	create: async (req: Request, res: Response) => {
		try {
			const newMesa: Mesa = await prisma.mesa.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Mesa creada exitosamente.',
				status: 201,
				data: newMesa,
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

	//Borrar una mesa por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteMesa = await prisma.mesa.delete({ where: { idMesa: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: deleteMesa,
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

	//Modificar una mesa por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const data = _req.body;
			const updateMesa: Mesa = await prisma.mesa.update({ where: { idMesa: Number(id) }, data: data });
			return res.status(200).json({
				status: 200,
				data: updateMesa,
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

export default mesaController;
