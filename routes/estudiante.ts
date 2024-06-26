import { Router } from "express";
import { errorsCollector } from "../middlewares/errorsCollector";
import { check } from "express-validator";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";
import {
	createEstudiante,
	getEstudianteByDNI,
	getEstudiantes,
	updateEstudiante,
} from "../controllers/estudiante";
import { validarDatosEstudiante } from "../middlewares/validarEstudiante";

const router = Router();

router.get("/", [jwtValidator /*,isAdmin*/], getEstudiantes);
router.get("/dni/:DNI", getEstudianteByDNI);
router.post(
	"/",
	[
		jwtValidator,
		isAdmin,
		check("apellido", "El campo apellido es obligatorio").not().isEmpty(),
		check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
		check("dni", "El campo dni es obligatorio").not().isEmpty(),
		check("dni", "El dni del plan debe contener solo números").isNumeric(),
		check("mail", "El campo mail es obligatorio").not().isEmpty(),
		check("mail", "El formato de mail es inválido").isEmail(),
		check(
			"trabaja",
			"El valor del campo 'trabaja' debe ser de tipo booleano"
		).isBoolean(),
		validarDatosEstudiante,
		errorsCollector,
	],
	createEstudiante
);
router.patch(
	"/:ID",
	[jwtValidator, /*isAdmin,*/ validarDatosEstudiante, errorsCollector],
	updateEstudiante
);
// router.delete("/:ID", [jwtValidator, isAdmin, errorsCollector], deletePlan);

export default router;
