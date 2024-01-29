import { Request, Response } from "express";
import Plan, { IPlan } from "../models/plan";
import Carrera from "../models/carrera";

export const getPlanes = async (req: Request, res: Response) => {
	const planes: IPlan[] = await Plan.find();
	res.status(200).json({ planes });
	return;
};
export const getPlanesPorCarrera = async (req: Request, res: Response) => {
	const { ID_CARRERA } = req.params;
	const planes: IPlan[] = await Plan.find({ carrera: ID_CARRERA });
	planes?.length
		? res.status(200).json({
				planes,
		  })
		: res.status(404).json({
				msj: "No existe ningun plan para esa carrera",
		  });
};
export const getPlanPorId = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const plan: IPlan | null = await Plan.findById(ID);
	plan
		? res.status(200).json({
				plan,
		  })
		: res.status(404).json({
				msj: "El Id proporcionado no corresponde a ningún plan",
		  });
};
export const createPlan = async (req: Request, res: Response) => {
	const planData: IPlan = req.body;
	const plan = new Plan(planData);
	const createdPlan: IPlan | null = await Plan.findOne({
		carrera: plan.carrera,
		anio: plan.año,
	});
	if (createdPlan) {
		res.status(403).json({
			msg: `Ya existe el plan ${createdPlan.año} para la carrera ${createdPlan.carrera}`,
		});
		return;
	}
	await plan.save();
	res.status(201).json({
		msg: "Plan creado con éxito",
		plan,
	});
	return;
};
export const updatePlan = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const planData: IPlan = req.body;
	const plan: IPlan | null = await Plan.findByIdAndUpdate(
		ID,
		{ ...planData },
		{
			new: true,
		}
	);
	if (!plan) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a un plan registrado`,
		});
		return;
	}
	res.status(200).json({
		msg: "Plan modificado con éxito",
		plan,
	});
	return;
};
export const deletePlan = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const plan = await Plan.findByIdAndUpdate(ID, { visible: false });
	if (!plan) {
		res.status(404).json({
			msg: `El ID provisto no corresponde a un plan registrado`,
		});
		return;
	}
	res.status(200).json({
		msg: "Plan eliminado con éxito",
		plan,
	});
	return;
};
