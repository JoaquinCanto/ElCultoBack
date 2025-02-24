import { Request, Response } from "express";
import { PrismaClient, Mesa } from "@prisma/client";

const prisma = new PrismaClient();

const mesaController = {
	// Obtener todos las mesas
	getAll: async (_req: Request, res: Response) => {
		try {
			const allmesas: Mesa[] = await prisma.mesa.findMany({
				include: {
					juego: true,
					lugar: true,
					narrador: true,
					jugadores: { // Incluye las inscripciones
						where: {
							baja: false
						},
						include: {
							jugador: { // Detalles del jugador inscrito
								select: {
									idPersona: true,
									nombre: true,
									apodo: true,
									email: true,
								},
							},
						},
					},
				},
			});
			return res.status(200).json({
				status: 200,
				total: allmesas.length,
				items: allmesas,
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

	// Obtener todas las mesas abiertas
	getAllOpen: async (_req: Request, res: Response) => {
		try {
			const allOpenGames: Mesa[] = await prisma.mesa.findMany({
				where: { estado: 'Abierta' },
				include: {
					juego: true,
					lugar: true,
					narrador: true,
					jugadores: { // Incluye las inscripciones
						where: {
							baja: false
						},
						include: {
							jugador: { // Detalles del jugador inscrito
								select: {
									idPersona: true,
									nombre: true,
									apodo: true,
									email: true,
								},
							},
						},
					},
				},
			});
			return res.status(200).json({
				status: 200,
				total: allOpenGames.length,
				items: allOpenGames,
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

	//Obtener todas las mesas narradas por un narrador por su id
	getAllNarratedByNarratorId: async (_req: Request, res: Response) => {
		try {
			const idNarrador = parseInt(_req.params.id);
			const mesasNarradas: Mesa[] | null = await prisma.mesa.findMany({
				where: { idNarrador: Number(idNarrador) },
				include: {
					juego: true,
					lugar: true,
					narrador: true,
					jugadores: { // Incluye las inscripciones
						where: {
							baja: false
						},
						include: {
							jugador: { // Detalles del jugador inscrito
								select: {
									idPersona: true,
									nombre: true,
									apodo: true,
									email: true,
								},
							},
						},
					},
				},
			});
			return res.status(200).json({
				status: 200,
				total: mesasNarradas.length,
				items: mesasNarradas,
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
			const idMesa: Mesa | null = await prisma.mesa.findUnique({
				where: { idMesa: Number(id) },
				include: {
					juego: { select: { nombre: true, descripcion: true } },
					lugar: { select: { nombre: true, direccion: true } },
					narrador: { select: { apodo: true } },
					jugadores: { // Incluye las inscripciones
						where: {
							baja: false
						},
						include: {
							jugador: { // Detalles del jugador inscrito
								select: {
									idPersona: true,
									nombre: true,
									apodo: true,
									email: true,
								},
							},
						},
					},
				},
			});
			return res.status(200).json({
				status: 200,
				items: idMesa,
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
				items: newMesa,
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
				items: deleteMesa,
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
			const items = _req.body;
			const updateMesa: Mesa = await prisma.mesa.update({ where: { idMesa: Number(id) }, data: items });
			return res.status(200).json({
				status: 200,
				items: updateMesa,
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
