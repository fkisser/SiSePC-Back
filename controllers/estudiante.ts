import { Request, Response } from "express";
import Estudiante, { IEstudiante } from "../models/estudiante";

export const getEstudiantes = async (req: Request, res: Response) => {
	const estudiantes: IEstudiante[] = await Estudiante.find().populate("plan");
	res.status(200).json({ estudiantes });
	return;
};
export const createEstudiante = async (req: Request, res: Response) => {
	console.log("Llegué hasta la funcion create");
	const estudianteData = req.body;
	const { apellido, nombre, dni, mail, plan } = estudianteData;
	if (!apellido || !nombre || !dni || !mail || !plan) {
		res.status(400).json({
			msj: "El estudiante debe tener al menos: nombre, apellido, dni, mail y un plan asignados",
		});
		return;
	}
	const createdPlan: IEstudiante | null = await Estudiante.findOne({
		dni,
		plan,
	});
	if (createdPlan) {
		res.status(403).json({
			msg: `Este estudiante ya fue creado con esta carrera`,
		});
		return;
	}
	const estudiante = new Estudiante(estudianteData);
	await estudiante.save();
	res.status(201).json({
		msg: "Estudiante creado con éxito",
		estudiante,
	});
	return;
};
