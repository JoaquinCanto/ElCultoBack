import { Request, Response } from "express";
import { PrismaClient, Jugador } from "@prisma/client";

const prisma = new PrismaClient();

const jugadorController = {
	// Obtener todos los jugadores
	getAll: async (_req: Request, res: Response) => {
		try {
			const alljugadores: Jugador[] = await prisma.jugador.findMany();
			return res.status(200).json({
				status: 200,
				total: alljugadores.length,
				data: alljugadores,
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

	//Obtener un jugador por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idJugador: Jugador | null = await prisma.jugador.findUnique({ where: { idJugador: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: idJugador,
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

	//Crear un jugador
	create: async (req: Request, res: Response) => {
		try {
			const newJugador: Jugador = await prisma.jugador.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Jugador creado exitosamente.',
				status: 201,
				data: newJugador,
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

	//Borrar un jugador por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteJugador = await prisma.jugador.delete({ where: { idJugador: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: deleteJugador,
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

	//Modificar un jugador por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const data = _req.body;
			const updateJugador: Jugador = await prisma.jugador.update({ where: { idJugador: Number(id) }, data: data });
			return res.status(200).json({
				status: 200,
				data: updateJugador,
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

export default jugadorController;
