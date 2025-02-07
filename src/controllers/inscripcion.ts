import { Request, Response } from "express";
import { PrismaClient, Inscripcion } from "@prisma/client";

const prisma = new PrismaClient();

const inscripcionController = {
	// Obtener todos las inscripciones
	getAll: async (_req: Request, res: Response) => {
		try {
			const allinscripciones: Inscripcion[] = await prisma.inscripcion.findMany();
			return res.status(200).json({
				status: 200,
				total: allinscripciones.length,
				items: allinscripciones,
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

	//Obtener una inscripcion por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idInscripcion: Inscripcion | null = await prisma.inscripcion.findUnique({ where: { idInscripcion: Number(id) } });
			return res.status(200).json({
				status: 200,
				items: idInscripcion,
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

	//Obtener todas las inscripciones habilitadas de un solo jugador por su id
	getAllPlayerByPlayerId: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const inscripciones: Inscripcion[] | null = await prisma.inscripcion.findMany({
				where: { idJugador: Number(id), borrado: false },
				include: {
					mesa: {
						include: {
							juego: {
								select: {
									nombre: true,
								},
							},
							narrador: {
								select: {
									apodo: true,
								},
							},
							lugar: {
								select: {
									nombre: true,
									direccion: true
								}
							}
						},
					},
				},
			}
			)
			return res.status(200).json({
				status: 200,
				items: inscripciones,
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

	//Crear una inscripcion
	create: async (req: Request, res: Response) => {
		try {
			const newInscripcion: Inscripcion = await prisma.inscripcion.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Inscripcion creada exitosamente.',
				status: 201,
				items: newInscripcion,
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

	//Borrar una inscripcion por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deleteInscripcion = await prisma.inscripcion.delete({ where: { idInscripcion: Number(id) } });
			return res.status(200).json({
				status: 200,
				items: deleteInscripcion,
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

	//Modificar una inscripcion por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const items = _req.body;
			const updateInscripcion: Inscripcion = await prisma.inscripcion.update({ where: { idInscripcion: Number(id) }, data: items });
			return res.status(200).json({
				status: 200,
				items: updateInscripcion,
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

export default inscripcionController;
