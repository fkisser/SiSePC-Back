import { Request, Response } from "express";
import Accion, { IAccion } from "../models/accion";
import Estudiante, { IEstudiante } from "../models/estudiante";

export const getAccionesGenerales = async (req: Request, res: Response) => {
	const acciones: IAccion[] = await Accion.find({
		asignadaCatedra: undefined,
		asignadaEstudiante: undefined,
	}).populate("tutor");
	res.status(200).json({ acciones });
	return;
};
export const getAccionesPorEstudiante = async (req: Request, res: Response) => {
	const { ESTUDIANTE } = req.params;
	const estudianteExistente: IEstudiante | null = await Estudiante.findById(
		ESTUDIANTE
	);
	if (!estudianteExistente) {
		res.status(404).json({
			msj: "El Id proporcionado no corresponde a ningun estudiante",
		});
		return;
	}
	const acciones: IAccion[] = await Accion.find({
		asignadaEstudiante: ESTUDIANTE,
	}).populate("tutor");
	res.status(200).json({ acciones });
	return;
};
export const getAccionesPorCatedra = async (req: Request, res: Response) => {
	// const { ESTUDIANTE } = req.params;
	// const estudianteExistente: IEstudiante | null = await Estudiante.findById(ESTUDIANTE);
	// if (!estudianteExistente) {
	//   res.status(404).json({
	// 		msj: "El Id proporcionado no corresponde a ningun estudiante",
	//   });
	//   return;
	// }
	// const acciones: IAccion[] = await Accion.find({
	// 	asignadaEstudiante: ESTUDIANTE,
	// }).populate("tutor");
	// res.status(200).json({ acciones });
	// return;
};

export const createAccion = async (req: Request, res: Response) => {
	const accionData: IAccion = req.body;
	const accion = new Accion(accionData);
	await accion.save();
	res.status(201).json({
		msg: "Accion creada con éxito",
		accion,
	});
	return;
};
export const updateAccion = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const accionData: IAccion = req.body;
	const accion: IAccion | null = await Accion.findByIdAndUpdate(
		ID,
		{ ...accionData },
		{
			new: true,
		}
	).populate("tutor");
	if (!accion) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a una accion registrada`,
		});
		return;
	}
	res.status(200).json({
		msg: "Accion modificada con éxito",
		accion,
	});
	return;
};
export const deleteAccion = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const accion = await Accion.findByIdAndUpdate(
		ID,
		{ visible: false },
		{ new: true }
	);
	if (!accion) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a una accion registrada`,
		});
		return;
	}
	res.status(200).json({
		msg: "Acción eliminada con éxito",
		accion,
	});
	return;
};
