import { NextFunction, Request, Response } from "express";
import { IAsignatura } from "../models/asignatura";
import { IPlan } from "../models/plan";
import Carrera from "../models/carrera";

export const validarAsignaturas = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const asignaturas = req.body.asignaturas;
	if (asignaturas)
		asignaturas.forEach((asignatura: IAsignatura) => {
			const { codigo, nombre, año, cuatrimestre }: IAsignatura = asignatura;
			if (!codigo || !nombre || !año || !cuatrimestre) {
				res.status(400).json({
					msg: "Todas las asignaturas deben tener al menos código, nombre, año y cuatrimestre",
				});
				return;
			}
			if (año && isNaN(año)) {
				res.status(400).json({
					msg: "El año debe ser un número",
				});
				return;
			}
		});

	next();
};
export const validarPlan = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { carrera, año, vigente, activo, actual, visible }: Partial<IPlan> =
		req.body;
	if (carrera) {
		const carreraExistente = await Carrera.findById(carrera);
		if (!carreraExistente) {
			res.status(404).json({
				msg: "La carrera ingresada es inexistente",
			});
			return;
		}
	}
	if (año && isNaN(año)) {
		res.status(400).json({
			msg: "El año debe ser un número",
		});
		return;
	}
	if (typeof vigente !== "boolean" && typeof vigente !== "undefined") {
		res.status(400).json({
			msg: "El valor de la propiedad vigente deber ser de tipo booleano",
		});
		return;
	}
	if (typeof activo !== "boolean" && typeof activo !== "undefined") {
		res.status(400).json({
			msg: "El valor de la propiedad activo deber ser de tipo booleano",
		});
		return;
	}
	if (typeof actual !== "boolean" && typeof actual !== "undefined") {
		res.status(400).json({
			msg: "El valor de la propiedad actual deber ser de tipo booleano",
		});
		return;
	}
	if (typeof visible !== "boolean" && typeof visible !== "undefined") {
		res.status(400).json({
			msg: "El valor de la propiedad visible deber ser de tipo booleano",
		});
		return;
	}

	next();
};
