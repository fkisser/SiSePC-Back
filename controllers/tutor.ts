import { Request, Response } from "express";
import Tutor from "../models/tutor";

export const getTutores = async (req: Request, res: Response) => {
	const tutores = await Tutor.find();
	const partTutores = tutores.map((tutor) => {
		const { _id, apellido, nombre, dni, mail, estudiantes } = tutor;
		return { _id, apellido, nombre, dni, mail, estudiantes };
	});
	res.status(200).json({ partTutores });
	return;
};
