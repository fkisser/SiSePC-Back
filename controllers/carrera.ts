import { Request, Response } from "express";
import Carrera, { ICarrera } from "../models/carrera";

export const getCarreras = async (req: Request, res: Response) => {
	const carreras: ICarrera[] = await Carrera.find();
	res.status(200).json({ carreras });
	return;
};
export const getCarreraPorId = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const carrera: ICarrera | null = await Carrera.findById(ID);
	carrera
		? res.status(200).json({
				carrera,
		  })
		: res.status(404).json({
				msj: "El Id proporcionado no corresponde a ninguna carrera",
		  });
	return;
};
export const createCarrera = async (req: Request, res: Response) => {
	const carreraData: ICarrera = req.body;
	const carrera = new Carrera(carreraData);
	const createdCarrera: ICarrera | null = await Carrera.findOne({
		nombre: carrera.nombre,
	});
	if (createdCarrera) {
		res.status(403).json({
			msg: `Ya existe una carrera con ese nombre`,
		});
		return;
	}
	await carrera.save();
	res.status(201).json({
		msg: "Carrera creada con éxito",
		carrera,
	});
	return;
};
export const updateCarrera = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const carreraData: ICarrera = req.body;
	const carrera: ICarrera | null = await Carrera.findByIdAndUpdate(
		ID,
		{ ...carreraData },
		{
			new: true,
		}
	);
	if (!carrera) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a una carrera registrada`,
		});
		return;
	}
	res.status(200).json({
		msg: "Carrera modificada con éxito",
		carrera,
	});
	return;
};
export const deleteCarrera = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const carrera = await Carrera.findByIdAndUpdate(
		ID,
		{ visible: false },
		{ new: true }
	);
	if (!carrera) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a una carrera registrada`,
		});
		return;
	}
	res.status(200).json({
		msg: "Carrera eliminada con éxito",
		carrera,
	});
	return;
};
