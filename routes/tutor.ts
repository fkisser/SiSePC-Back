import { Router } from "express";
import { errorsCollector } from "../middlewares/errorsCollector";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";
import { getTutores } from "../controllers/tutor";

const router = Router();

router.get("/", [jwtValidator, /*isAdmin,*/ errorsCollector], getTutores);

export default router;
