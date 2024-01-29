import { NextFunction, Request, Response } from "express";
import { ITutor } from "../models/tutor";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	const { isAdmin }: ITutor = req.body.user;

	if (!isAdmin) {
		res.status(401).json({
			msg: "El usuario no es administrador",
		});
		return;
	}

	next();
};
