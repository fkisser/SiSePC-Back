import { Request, Response } from "express";
import Tutor, { ITutor } from "../models/tutor";

export const getTutores = async (req: Request, res: Response) => {
	const tutores: ITutor[] = await Tutor.find();
	const partTutores = tutores.map((tutor) => {
		const { contraseña, isAdmin, visible, recuperacion } = tutor;
		return { ...tutor };
	});
	res.status(200).json({ partTutores });
	return;
};
export const getIDbyDNI = async (req: Request, res: Response) => {
	// const { DNI } = req.params;
	// const tutor: ITutor | null = await Tutor.findOne({ dni: DNI });
	// if (tutor) {
	// 	tutor.res.status(200).json({});
	// }
	// const partTutor = tutores.map((tutor) => {
	// 	const { contraseña, isAdmin, visible, recuperacion } = tutor;
	// 	return { ...tutor };
	// });

	return;
};
