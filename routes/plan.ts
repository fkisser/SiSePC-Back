import { Router } from "express";
import { errorsCollector } from "../middlewares/errorsCollector";
import { check } from "express-validator";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";
import {
	createPlan,
	deletePlan,
	getPlanPorId,
	getPlanes,
	getPlanesPorCarrera,
	updatePlan,
} from "../controllers/plan";
import { validarAsignaturas, validarPlan } from "../middlewares/validarPlan";

const router = Router();

router.get("/", getPlanes);
router.get("/carrera/:ID_CARRERA", getPlanesPorCarrera);
router.get("/plan/:ID", getPlanPorId);
router.post(
	"/",
	[
		jwtValidator,
		isAdmin,
		check("carrera", "El campo carrera es obligatorio").not().isEmpty(),
		check("año", "El año del plan es obligatorio").not().isEmpty(),
		check("año", "El año del plan debe contener solo números").isNumeric(),
		check("actual", "Debe señalarse si el plan creado es el actual")
			.not()
			.isEmpty(),
		check(
			"actual",
			"El valor del campo 'plan actual' debe ser de tipo booleano"
		).isBoolean(),
		validarPlan,
		validarAsignaturas,
		errorsCollector,
	],
	createPlan
);
router.patch(
	"/:ID",
	[jwtValidator, isAdmin, validarPlan, validarAsignaturas, errorsCollector],
	updatePlan
);
router.delete("/:ID", [jwtValidator, isAdmin, errorsCollector], deletePlan);

export default router;
