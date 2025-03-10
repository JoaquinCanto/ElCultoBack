import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient().$extends({
	query: {
		inscripcion: {

			async create({ args, query }) {
				const inscription = await query(args);

				const mesaId = inscription.idMesa;

				const inscriptionCount = await prisma.inscripcion.count({
					where: { idMesa: mesaId, baja: false },
				});

				const mesa = await prisma.mesa.findUnique({
					where: { idMesa: mesaId },
				});

				if (mesa && inscriptionCount >= mesa.cupoMax) {
					await prisma.mesa.update({
						where: { idMesa: mesaId },
						data: { estado: "Cerrada" },
					});
				}

				return inscription;
			},

			async update({ args, query }) {
				const inscription = await query(args);

				if (args.data && args.data.baja === true) {
					const mesaId = inscription.idMesa;

					const activeInscriptionCount = await prisma.inscripcion.count({
						where: { idMesa: mesaId, baja: false },
					});

					const mesa = await prisma.mesa.findUnique({
						where: { idMesa: mesaId },
					});

					if (mesa && mesa.estado === "Cerrada" && activeInscriptionCount < mesa.cupoMax) {
						await prisma.mesa.update({
							where: { idMesa: mesaId },
							data: { estado: "Abierta" },
						});
					}
				}
				return inscription;
			},
		},
	},
});