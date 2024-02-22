import { Router } from "express";
import { errorsCollector } from "../middlewares/errorsCollector";
import { check } from "express-validator";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";
import {
	getResoluciones,
	createResolucion,
	deleteResolucion,
	updateResolucion,
} from "../controllers/resolucion";

const router = Router();

router.get("/", getResoluciones);
router.post(
	"/",
	[
		jwtValidator,
		isAdmin,
		check("nombre", "El nombre de la carrera es obligatorio").not().isEmpty(),
		check("tipo", "El tipo de carrera es obligatorio").not().isEmpty(),
		check("duracion", "El campo duración es obligatorio").not().isEmpty(),
		errorsCollector,
	],
	createResolucion
);
router.patch(
	"/:ID",
	[jwtValidator, isAdmin, errorsCollector],
	updateResolucion
);
router.delete(
	"/:ID",
	[jwtValidator, isAdmin, errorsCollector],
	deleteResolucion
);

export default router;
