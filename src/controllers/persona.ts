import { Request, Response } from "express";
import { PrismaClient, Persona } from "@prisma/client";

const prisma = new PrismaClient();

const personaController = {
	// Obtener todos las personas
	getAll: async (_req: Request, res: Response) => {
		try {
			const allpersonas: Persona[] = await prisma.persona.findMany();
			return res.status(200).json({
				status: 200,
				total: allpersonas.length,
				data: allpersonas,
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

	//Obtener una persona por id
	getById: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const idPersona: Persona | null = await prisma.persona.findUnique({ where: { idPersona: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: idPersona,
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

	//Crear una persona
	create: async (req: Request, res: Response) => {
		try {
			const newPersona: Persona = await prisma.persona.create({
				data: {
					...req.body
				}
			});
			res.status(201).json({
				message: 'Persona creada exitosamente.',
				status: 201,
				data: newPersona,
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

	//Borrar una persona por id
	delete: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const deletePersona = await prisma.persona.delete({ where: { idPersona: Number(id) } });
			return res.status(200).json({
				status: 200,
				data: deletePersona,
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

	//Modificar una persona por id
	update: async (_req: Request, res: Response) => {
		try {
			const id = parseInt(_req.params.id);
			const data = _req.body;
			const updatePersona: Persona = await prisma.persona.update({ where: { idPersona: Number(id) }, data: data });
			return res.status(200).json({
				status: 200,
				data: updatePersona,
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

export default personaController;
