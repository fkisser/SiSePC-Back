import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	const { isAdmin } = req.body.user;

	if (!isAdmin) {
		res.status(401).json({
			msg: "El usuario no es administrador",
		});
		return;
	}

	next();
};
