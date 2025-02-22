import { Request, Response } from "express";
import { PrismaClient, Sugerencia } from "@prisma/client";

const prisma = new PrismaClient();

const sugerenciaController = {
	// Obtener todos las sugerencias
	getAll: async (_req: Request, res: Response) => {
		try {
			const allSugerencias: Sugerencia[] = await prisma.sugerencia.findMany({
				include: {
					juego: true,
					persona: true,
				}
			});
			return res.status(200).json({
				status: 200,
				total: allSugerencias.length,
				items: allSugerencias,
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

	getRelevant: async (_req: Request, res: Response) => {
		try {
			const topGames = await prisma.sugerencia.groupBy({
				by: ['idJuego'],
				where: { vieja: false },
				_count: { idJuego: true },
				orderBy: { _count: { idJuego: 'desc' } },
				take: 10,

			});
			const topGamesWithDetails = await Promise.all(
				topGames.map(async (group) => {
					const juego = await prisma.juego.findUnique({
						where: { idJuego: group.idJuego },
					});
					return {
						juego: juego!.nombre,
						cantidad: group._count.idJuego,
					};
				})
			);
			return res.status(200).json({
				status: 200,
				total: topGamesWithDetails.length,
				items: topGamesWithDetails,
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

	//Obtener una sugerencia por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idSugerencia: Sugerencia | null = await prisma.sugerencia.findUnique({
				where: { idSugerencia: Number(id) },
				include: {
					juego: true,
					persona: true,
				}
			});
			return res.status(200).json({
				status: 200,
				items: idSugerencia,
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

	//Crear una sugerencia
	create: async (req: Request, res: Response) => {
		try {
			const newSugerencia: Sugerencia = await prisma.sugerencia.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Sugerencia creada exitosamente.',
				status: 201,
				items: newSugerencia,
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

	//Borrar una sugerencia por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteSugerencia = await prisma.sugerencia.delete({ where: { idSugerencia: Number(id) } });
			return res.status(200).json({
				status: 200,
				items: deleteSugerencia,
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

	//Modificar una sugerencia por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const items = _req.body;
			const updateSugerencia: Sugerencia = await prisma.sugerencia.update({ where: { idSugerencia: Number(id) }, data: items });
			return res.status(200).json({
				status: 200,
				items: updateSugerencia,
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

export default sugerenciaController;
