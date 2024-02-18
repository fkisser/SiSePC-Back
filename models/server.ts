import express, { Express } from "express";
import cors from "cors";
import rutaPrincipal from "../routes/main";
import rutasAutenticacion from "../routes/autenticacion";
import rutasPlan from "../routes/plan";
import rutasCarrera from "../routes/carrera";
import rutasEstudiante from "../routes/estudiante";
import rutasAcciones from "../routes/accion";
import rutasTutores from "../routes/tutor";

import { dbConnection } from "../database/config";

export class Server {
	app: Express;
	port: string | number | undefined;
	pathPrincipal: string;
	pathAutenticacion: string;
	pathCarrera: string;
	pathPlan: string;
	pathEstudiante: string;
	pathTutores: string;
	pathAcciones: string;
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.pathAutenticacion = "/autenticacion";
		this.pathCarrera = "/carreras";
		this.pathPlan = "/planes";
		this.pathEstudiante = "/estudiantes";
		this.pathTutores = "/tutores";
		this.pathAcciones = "/acciones";
		this.pathPrincipal = "/";
		this.dbConnect();
		this.middlewares();
		this.routes();
	}

	async dbConnect(): Promise<void> {
		await dbConnection();
	}
	middlewares(): void {
		this.app.use(express.json());
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
			);
			res.header(
				"Access-Control-Allow-Methods",
				"GET, POST, OPTIONS, PUT, DELETE"
			);
			res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
			next();
		});
		this.app.use(cors({ origin: true, credentials: true }));
	}

	routes(): void {
		this.app.use(this.pathPrincipal, rutaPrincipal);
		this.app.use(this.pathAutenticacion, rutasAutenticacion);
		this.app.use(this.pathPlan, rutasPlan);
		this.app.use(this.pathCarrera, rutasCarrera);
		this.app.use(this.pathEstudiante, rutasEstudiante);
		this.app.use(this.pathAcciones, rutasAcciones);
		this.app.use(this.pathTutores, rutasTutores);
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Corriendo en puerto ${this.port}`);
		});
	}
}
