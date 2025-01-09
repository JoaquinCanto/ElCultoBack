import { Request, Response } from "express";
import { PrismaClient, Juego } from "@prisma/client";

const prisma = new PrismaClient();

const juegoController = {
	// Obtener todos los juegos
	getAll: async (_req: Request, res: Response) => {
		try {
			const alljuegos: Juego[] = await prisma.juego.findMany();
			return res.status(200).json({
				status: 200,
				total: alljuegos.length,
				itmes: alljuegos,
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

	//Obtener un juego por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idJuego: Juego | null = await prisma.juego.findUnique({ where: { idJuego: Number(id) } });
			return res.status(200).json({
				status: 200,
				itmes: idJuego,
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

	//Crear un juego
	create: async (req: Request, res: Response) => {
		try {
			const newJuego: Juego = await prisma.juego.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Juego creado exitosamente.',
				status: 201,
				itmes: newJuego,
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

	//Borrar un juego por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteJuego = await prisma.juego.delete({ where: { idJuego: Number(id) } });
			return res.status(200).json({
				status: 200,
				itmes: deleteJuego,
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

	//Modificar un juego por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const itmes = _req.body;
			const updateJuego: Juego = await prisma.juego.update({ where: { idJuego: Number(id) }, data: itmes });
			return res.status(200).json({
				status: 200,
				itmes: updateJuego,
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

export default juegoController;
