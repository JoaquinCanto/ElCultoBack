import { Request, Response } from "express";
import { PrismaClient, Lugar } from "@prisma/client";

const prisma = new PrismaClient();

const lugarController = {
	// Obtener todos los lugares
	getAll: async (_req: Request, res: Response) => {
		try {
			const allLugares: Lugar[] = await prisma.lugar.findMany();
			return res.status(200).json({
				status: 200,
				total: allLugares.length,
				itmes: allLugares,
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

	//Obtener un lugar por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idLugar: Lugar | null = await prisma.lugar.findUnique({ where: { idLugar: Number(id) } });
			return res.status(200).json({
				status: 200,
				itmes: idLugar,
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

	//Crear un lugar
	create: async (req: Request, res: Response) => {
		try {
			const newLugar: Lugar = await prisma.lugar.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Lugar creado exitosamente.',
				status: 201,
				itmes: newLugar,
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

	//Borrar un lugar por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteLugar = await prisma.lugar.delete({ where: { idLugar: Number(id) } });
			return res.status(200).json({
				status: 200,
				itmes: deleteLugar,
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

	//Modificar un lugar por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const itmes = _req.body;
			const updateLugar: Lugar = await prisma.lugar.update({ where: { idLugar: Number(id) }, data: itmes });
			return res.status(200).json({
				status: 200,
				itmes: updateLugar,
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

export default lugarController;
