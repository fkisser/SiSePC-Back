import { Model, Schema, Types, model } from "mongoose";
import { AsignaturaSchema, IAsignatura } from "./asignatura";

export interface IPlan {
	carrera: Types.ObjectId;
	año: number;
	vigente?: boolean;
	activo?: boolean;
	actual: boolean;
	resMin?: string;
	resRect?: string;
	visible?: boolean;
	asignaturas?: IAsignatura[];
}

export const PlanSchema = new Schema<IPlan>({
	carrera: {
		type: Schema.Types.ObjectId,
		ref: "Carrera",
		required: true,
	},
	año: {
		type: Number,
		required: true,
	},
	vigente: {
		type: Boolean,
		required: false,
		default: true,
	},
	activo: {
		type: Boolean,
		required: false,
		default: true,
	},
	actual: {
		type: Boolean,
		required: true,
	},
	resMin: {
		type: String,
		required: false,
	},
	resRect: {
		type: String,
		required: false,
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
	asignaturas: {
		type: [AsignaturaSchema],
		required: false,
		default: [],
	},
});

const Plan: Model<IPlan> = model<IPlan>("Plan", PlanSchema);

export default Plan;
