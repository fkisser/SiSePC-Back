import { Router, NextFunction, Request, Response } from "express";
import { errorsCollector } from "../middlewares/errorsCollector";
import { check } from "express-validator";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";
import {
	createAccion,
	deleteAccion,
	getAccionesGenerales,
	updateAccion,
} from "../controllers/accion";

const router = Router();
router.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "https://sisepc.vercel.app/"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

router.get("/", [jwtValidator, errorsCollector], getAccionesGenerales);
router.post(
	"/",
	[
		jwtValidator,
		check("fecha", "La fecha de la acción es obligatoria").not().isEmpty(),
		check("descripcion", "La descripción de la acción es obligatoria")
			.not()
			.isEmpty(),
		errorsCollector,
	],
	createAccion
);
router.patch("/:ID", [jwtValidator, isAdmin, errorsCollector], updateAccion);
router.delete("/:ID", [jwtValidator, isAdmin, errorsCollector], deleteAccion);

export default router;
