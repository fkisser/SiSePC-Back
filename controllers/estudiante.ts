import { Request, Response } from "express";
import Estudiante, { IEstudiante } from "../models/estudiante";
import Plan, { IPlan } from "../models/plan";

export const getEstudiantes = async (req: Request, res: Response) => {
	const estudiantes: IEstudiante[] = await Estudiante.find()
		.populate("plan")
		.populate({
			path: "plan",
			populate: {
				path: "carrera",
				model: "Carrera",
			},
		});
	res.status(200).json({ estudiantes });
	return;
};
export const getEstudianteByDNI = async (req: Request, res: Response) => {
	//no se tiene en cuenta si hay uno inscripto 2 veces por carreras distintas :/
	const { DNI } = req.params;
	const estudiante: IEstudiante | null = await Estudiante.findOne({ dni: DNI })
		.populate("plan")
		.populate({
			path: "plan",
			populate: {
				path: "carrera",
				model: "Carrera",
			},
		});
	if (!estudiante) {
		res.status(404).json({
			msj: "No se encontró ningún estudiante con este DNI",
		});
		return;
	}
	res.status(200).json({
		estudiante,
	});
	return;
};

export const createEstudiante = async (req: Request, res: Response) => {
	const estudianteData = req.body;
	const { apellido, nombre, dni, mail, plan }: IEstudiante = estudianteData;
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
	const _plan: IPlan | null = await Plan.findById(plan);
	const detallePlan = _plan?.asignaturas?.map((asignatura) => {
		return { asignaturaOriginal: asignatura.nombre, condicion: "Pendiente" };
	});
	const estudiante = new Estudiante({ ...estudianteData, detallePlan });
	await estudiante.save();
	res.status(201).json({
		msg: "Estudiante creado con éxito",
		estudiante,
	});
	return;
};
export const updateEstudiante = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const estudianteData = req.body;
	const estudiante = await Estudiante.findByIdAndUpdate(
		ID,
		{ ...estudianteData },
		{ new: true }
	);
	res.status(200).json({
		msg: "Estudiante modificado con éxito",
		estudiante,
	});
	return;
};
