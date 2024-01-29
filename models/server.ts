import express, { Express } from "express";
import cors from "cors";
import rutaPrincipal from "../routes/main";
import rutasAutenticacion from "../routes/autenticacion";
import rutasPlan from "../routes/plan";
import rutasCarrera from "../routes/carrera";

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
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.pathAutenticacion = "/autenticacion";
		this.pathCarrera = "/carreras";
		this.pathPlan = "/planes";
		this.pathEstudiante = "/estudiantes";
		this.pathTutores = "/tutores";
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
		this.app.use(cors());
	}

	routes(): void {
		this.app.use(this.pathPrincipal, rutaPrincipal);
		this.app.use(this.pathAutenticacion, rutasAutenticacion);
		this.app.use(this.pathPlan, rutasPlan);
		this.app.use(this.pathCarrera, rutasCarrera);
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Corriendo en puerto ${this.port}`);
		});
	}
}
