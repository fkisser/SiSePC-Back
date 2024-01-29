import { Model, Schema, model } from "mongoose";

export interface IAsignatura {
	codigo: string;
	nombre: string;
	año: number;
	cuatrimestre: string;
	paraCursar?: string[];
	paraRendir?: string[];
	seDicta?: boolean;
	visible: boolean;
}

export const AsignaturaSchema = new Schema<IAsignatura>({
	codigo: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	año: {
		type: Number,
		required: true,
	},
	cuatrimestre: {
		type: String,
		required: true,
	},
	paraCursar: {
		type: [String],
		required: false,
		default: [],
	},
	paraRendir: {
		type: [String],
		required: false,
		default: [],
	},
	seDicta: {
		type: Boolean,
		required: false,
		default: true,
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
});
