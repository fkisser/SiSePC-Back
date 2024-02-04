import { Router } from "express";
import { login, register } from "../controllers/autenticacion";
import { check } from "express-validator";
import { errorsCollector } from "../middlewares/errorsCollector";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";

const router = Router();

router.post(
	"/login",
	[
		check("dni", "El campo DNI debe ser un número").isNumeric(),
		check("dni", "El campo DNI es obligatorio").not().isEmpty(),
		check("contraseña", "El campo contraseña es obligatorio").not().isEmpty(),
		errorsCollector,
	],
	login
);
router.post(
	"/register",
	[
		jwtValidator,
		isAdmin,
		check("apellido", "El apellido es obligatorio").not().isEmpty(),
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("dni", "El DNI es obligatorio").not().isEmpty(),
		check("dni", "El DNI debe contener solo números").isNumeric(),
		check("mail", "El mail es obligatorio").not().isEmpty(),
		check("mail", "El mail debe tener un formato válido").isEmail(),
		check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
		check(
			"contraseña",
			"La contraseña debe tener al menos 6 caracteres"
		).isLength({ min: 6 }),
		errorsCollector,
	],
	register
);

export default router;
