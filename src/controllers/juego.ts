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
				items: alljuegos,
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

	// Obtener todos los juegos habilitados
	getAllowed: async (_req: Request, res: Response) => {
		try {
			const juegosHabilitados: Juego[] = await prisma.juego.findMany({
				where: {
					estado: true
				}
			});
			return res.status(200).json({
				status: 200,
				total: juegosHabilitados.length,
				items: juegosHabilitados,
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

	//Obtener los 10 juegos más jugados
	getTopPlayedGames: async (_req: Request, res: Response) => {
		try {
			// Raw SQL query: join Inscripcion and Mesa to group by idJuego and count inscriptions
			const topGames = await prisma.$queryRaw<
				{ idJuego: number; inscriptionCount: string }[]
			>`
			SELECT m."idJuego", COUNT(*) as "inscriptionCount"
			FROM "Inscripcion" i
			INNER JOIN "Mesa" m ON i."idMesa" = m."idMesa"
			GROUP BY m."idJuego"
			ORDER BY "inscriptionCount" DESC
			LIMIT 10;`
				;

			// Fetch full game details for each group
			const topGamesDetailed = await Promise.all(
				topGames.map(async (group) => {
					const juego = await prisma.juego.findUnique({
						where: { idJuego: group.idJuego },
					});
					return {
						nombre: juego!.nombre,
						cantidadInscripciones: parseInt(group.inscriptionCount, 10), // number of inscriptions
					};
				})
			);

			return res.status(200).json({
				status: 200,
				total: topGamesDetailed.length,
				items: topGamesDetailed,
			});
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json({
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
				items: idJuego,
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
				items: newJuego,
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
				items: deleteJuego,
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
			const items = _req.body;
			const updateJuego: Juego = await prisma.juego.update({ where: { idJuego: Number(id) }, data: items });
			return res.status(200).json({
				status: 200,
				items: updateJuego,
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
