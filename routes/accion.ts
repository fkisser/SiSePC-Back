import { Router } from "express";
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
router.patch(
	"/:ID",
	[jwtValidator, /*isAdmin, */ errorsCollector],
	updateAccion
);
router.delete("/:ID", [jwtValidator, isAdmin, errorsCollector], deleteAccion);

export default router;
