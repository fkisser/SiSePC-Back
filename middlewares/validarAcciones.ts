import { NextFunction, Request, Response } from "express";
import { IAccion } from "../models/accion";
import Tutor, { ITutor } from "../models/tutor";
import Estudiante, { IEstudiante } from "../models/estudiante";

export const validarAcciones = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { acciones } = req.body;
	acciones?.forEach(async (accion: IAccion) => {
		const { fecha, descripcion, tutor } = accion;
		if (fecha && !(fecha instanceof Date)) {
			res.status(400).json({
				msg: "El formato de fecha es inválido, debe ser instancia de la clase Date",
			});
			return;
		}
		if (descripcion && descripcion.length === 0) {
			res.status(400).json({
				msg: "La descripción de la acción es obligatoria",
			});
			return;
		}
		if (tutor) {
			const tutorExistente: ITutor | null = await Tutor.findById(tutor);
			if (!tutorExistente) {
				res.status(404).json({
					msg: "El tutor seleccionado no existe en la base de datos",
				});
				return;
			}
		}
	});

	next();
};
