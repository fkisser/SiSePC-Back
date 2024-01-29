import { Router } from "express";
import { errorsCollector } from "../middlewares/errorsCollector";
import { check } from "express-validator";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";
import {
	createCarrera,
	deleteCarrera,
	getCarreraPorId,
	getCarreras,
	updateCarrera,
} from "../controllers/carrera";

const router = Router();

router.get("/", getCarreras);
router.get("/:ID", getCarreraPorId);
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
	createCarrera
);
router.patch("/:ID", [jwtValidator, isAdmin, errorsCollector], updateCarrera);
router.delete("/:ID", [jwtValidator, isAdmin, errorsCollector], deleteCarrera);

export default router;
