import { Request, Response } from "express";
import Resolucion, { IResolucion } from "../models/resolucion";

export const getResoluciones = async (req: Request, res: Response) => {
	const resoluciones: IResolucion[] = await Resolucion.find({
		visible: true,
	}).sort({
		titulo: "asc",
	});
	res.status(200).json({ resoluciones });
	return;
};

export const createResolucion = async (req: Request, res: Response) => {
	const resolucionData: IResolucion = req.body;
	const resolucion = new Resolucion(resolucionData);
	await resolucion.save();
	res.status(201).json({
		msg: "Resolución creada con éxito",
		resolucion,
	});
	return;
};

export const updateResolucion = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const resolucionData: IResolucion = req.body;
	const resolucion: IResolucion | null = await Resolucion.findByIdAndUpdate(
		ID,
		{ ...resolucionData },
		{
			new: true,
		}
	);
	if (!resolucion) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a una resolución registrada`,
		});
		return;
	}
	res.status(200).json({
		msg: "Resolución modificada con éxito",
		resolucion,
	});
	return;
};
export const deleteResolucion = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const resolucion = await Resolucion.findByIdAndUpdate(
		ID,
		{ visible: false },
		{ new: true }
	);
	if (!resolucion) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a una resolución registrada`,
		});
		return;
	}
	res.status(200).json({
		msg: "Resolución eliminada con éxito",
		resolucion,
	});
	return;
};
