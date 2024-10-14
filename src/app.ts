import express from "express";
import cors from "cors";
import router from "./routes/routerindex";

const app = express();

app.use(express.json());
app.use(cors());

// Rutas de la app
app.use('', router);

app.get('/', (req, res) => {
	res.status(200).send({
		message: 'Server is up ✅ - Environment: develop',
		data: undefined,
		error: false,
	});
});

export default app;