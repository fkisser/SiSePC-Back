import { Request, Response } from "express";
import Accion, { IAccion } from "../models/accion";

export const getAccionesGenerales = async (req: Request, res: Response) => {
	const acciones: IAccion[] = await Accion.find({ visible: true }).sort({
		fecha: -1,
	});
	res.status(200).json({ acciones });
	return;
};
export const createAccion = async (req: Request, res: Response) => {
	const accionData: IAccion = req.body;
	const accion = new Accion(accionData);
	await accion.save();
	res.status(201).json({
		msg: "Acción creada con éxito",
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
	);
	if (!accion) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a una acción registrada`,
		});
		return;
	}
	res.status(200).json({
		msg: "Acción modificada con éxito",
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
