import { Request, Response, Router } from "express";

const router = Router();

router.get("/", [], (req: Request, res: Response): void => {
	// res.redirect("https://documenter.getpostman.com/view/25779361/2s9YsFDDk6");
	//poner link de la documentacion si existe
	return;
});

export default router;
