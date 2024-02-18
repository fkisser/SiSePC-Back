import { Request, Response } from "express";
import Tutor, { ITutor } from "../models/tutor";

export const getTutores = async (req: Request, res: Response) => {
	const tutores: ITutor[] = await Tutor.find();
	const partTutores = tutores.map((tutor) => {
		const { apellido, nombre, dni, mail, celular, estudiantes } = tutor;
		return { apellido, nombre, dni, mail, celular, estudiantes };
	});
	res.status(200).json({ partTutores });
	return;
};
