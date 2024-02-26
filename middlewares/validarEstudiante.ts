import { NextFunction, Request, Response } from "express";
import Plan, { IPlan } from "../models/plan";
import { IEstudiante } from "../models/estudiante";
import Tutor, { ITutor } from "../models/tutor";
import { mailRegExp } from "../helpers/constants";

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

	if (tutores) {
		const tutorExistente: ITutor | null = await Tutor.findById(tutores);
		if (!tutorExistente) {
			res.status(404).json({
				msg: "El tutor asignado no se encuentra en la base de datos, elija otro",
			});
			return;
		}
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
