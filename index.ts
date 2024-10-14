import { Prisma, PrismaClient } from '@prisma/client';
import app from "./src/app";
import config from './src/config';

const port = 3000;
const prisma = new PrismaClient();

if (!config.PostgreSQLDB_URL) {
	console.error("URL is undeined or null.")
}
else {
	//console.log({ level: 'info', message: '✅ Database connected', label: 'postgres' });
	app.listen(port, () => {
		console.log({
			level: 'info',
			message: `Server listening on port ${port}`,
			label: 'server',
		});
	});
}