import { Request, Response } from "express";
import Tutor, { ITutor } from "../models/tutor";
import bcryptjs from "bcryptjs";
import { JWTgenerator } from "../helpers/JWTgenerator";

export const login = async (req: Request, res: Response): Promise<void> => {
	const { dni, contraseña }: ITutor = req.body;
	try {
		const tutor = await Tutor.findOne({ dni });
		if (!tutor) {
			res.status(404).json({
				msg: "Este dni no está registrado",
			});
			return;
		}
		const validPassword = bcryptjs.compareSync(contraseña, tutor.contraseña);
		if (!validPassword) {
			res.status(401).json({
				msg: "Contraseña incorrecta",
			});
			return;
		}
		const token = await JWTgenerator(tutor.id);
		res.status(202).json({
			tutor,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error en el servidor",
		});
	}
};

export const register = async (req: Request, res: Response): Promise<void> => {
	const { apellido, nombre, dni, mail, contraseña, isAdmin }: ITutor = req.body;
	let createdTutor: ITutor | null = await Tutor.findOne({
		dni,
	});
	if (createdTutor) {
		const { apellido, nombre, dni, mail } = createdTutor;
		res.status(403).json({
			msg: `Ya existe una persona registrada con ese DNI: ${apellido}, ${nombre} - DNI: ${dni} - Mail: ${mail}`,
		});
		return;
	}
	createdTutor = await Tutor.findOne({
		mail,
	});
	if (createdTutor) {
		res.status(403).json({
			msg: `Ya existe una persona registrada con ese mail: ${apellido}, ${nombre} - DNI: ${dni} - Mail: ${mail}`,
		});
		return;
	}
	const tutor = new Tutor({ apellido, nombre, dni, mail, contraseña, isAdmin });
	const salt = bcryptjs.genSaltSync();
	tutor.contraseña = bcryptjs.hashSync(contraseña, salt);
	await tutor.save();
	res.status(201).json({
		msg: "Tutor/a creado/a con éxito",
		tutor,
	});
	return;
};
