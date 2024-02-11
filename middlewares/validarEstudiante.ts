import { NextFunction, Request, Response } from "express";
import { IAsignatura } from "../models/asignatura";
import Plan, { IPlan } from "../models/plan";
import { IDetalleAsignatura, IEstudiante } from "../models/estudiante";
import Tutor, { ITutor } from "../models/tutor";
import { mailRegExp } from "../helpers/constants";

export const validarDetallePlan = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { plan, detallePlan }: IEstudiante = req.body;
	if (detallePlan && plan) {
		const planInscripto: IPlan | null = await Plan.findById("").populate(
			"carrera"
		);
		if (!planInscripto) {
			res.status(404).json({
				msg: "El Plan seleccionado no es válido o no existe",
			});
			return;
		}
		detallePlan.forEach(async (detalleAsignatura: IDetalleAsignatura) => {
			const { asignaturaOriginal, asignaturaActual }: IDetalleAsignatura =
				detalleAsignatura;

			if (!asignaturaOriginal) {
				res.status(400).json({
					msg: "Es necesario seleccionar al menos una asignatura del plan",
				});
				return;
			}

			if (
				!planInscripto.asignaturas?.find((asignatura: IAsignatura) => {
					return asignatura.nombre === asignaturaOriginal.nombre;
				})
			) {
				res.status(404).json({
					msg: "La asignatura seleccionada no se encuentra en el plan de estudios",
				});
				return;
			}
			if (planInscripto.actual) {
				if (!asignaturaActual) {
					res.status(400).json({
						msg: "Es necesario seleccionar la equivalencia en el plan actual",
					});
					return;
				}
				const planActual: IPlan | null = await Plan.findOne({
					carrera: planInscripto.carrera._id,
					actual: true,
				});
				if (!planActual) {
					res.status(404).json({
						msg: "No se encontró plan actual para esta carrera",
					});
					return;
				}
				if (
					!planActual.asignaturas?.find((asignatura: IAsignatura) => {
						return asignatura.nombre === asignaturaActual.nombre;
					})
				) {
					res.status(404).json({
						msg: "La asignatura seleccionada no se encuentra en el plan de estudios actual",
					});
					return;
				}
			}
		});
	}
	next();
};
export const validarDatosEstudiante = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		apellido,
		nombre,
		dni,
		mail,
		celular,
		ciudad,
		tutores,
		trabaja,
		detallesTrabajo,
		plan,
	}: IEstudiante = req.body;

	if (apellido && apellido.length === 0) {
		res.status(400).json({
			msg: "El apellido no puede estar vacío",
		});
		return;
	}
	if (nombre && nombre.length === 0) {
		res.status(400).json({
			msg: "El nombre no puede estar vacío",
		});
		return;
	}
	if (mail) {
		if (!mailRegExp.test(mail)) {
			res.status(400).json({
				msg: "El formato de mail es inválido",
			});
			return;
		}
	}
	if (celular && celular.length === 0) {
		res.status(400).json({
			msg: "El celular no puede estar vacío",
		});
		return;
	}
	if (ciudad && ciudad.length === 0) {
		res.status(400).json({
			msg: "El campo de localidad no puede estar vacío",
		});
		return;
	}
	if (dni && dni < 1000000) {
		res.status(400).json({
			msg: "El DNI no puede ser menor a 1.000.000",
		});
		return;
	}

	if (tutores && tutores.length > 0) {
		tutores.forEach(async (tutor) => {
			const tutorExistente: ITutor | null = await Tutor.findOne({
				nombre: tutor,
			});
			if (!tutorExistente) {
				res.status(404).json({
					msg: "Uno o mas tutores asignados no se encuentran en la base de datos, el nombre debe ser coincidente",
				});
				return;
			}
		});
	}

	if (trabaja) {
		if (!detallesTrabajo) {
			res.status(400).json({
				msg: "Si trabaja, al menos completar el detalle del trabajo",
			});
			return;
		}
	}
	if (plan) {
		const planExistente: IPlan | null = await Plan.findById(plan);
		if (!planExistente) {
			res.status(404).json({
				msg: "El plan seleccionado es inexistente",
			});
			return;
		}
	}
	next();
};
