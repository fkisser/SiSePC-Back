import { Model, Schema, Types, model } from "mongoose";
import { AccionSchema, IAccion } from "./accion";

interface ICondicion {
	nombre: string;
	fecha?: Date;
	acta?: string;
	detalle?: string;
}
export const CondicionSchema = new Schema<ICondicion>({
	nombre: {
		type: String,
		required: true,
		default: "Pendiente",
	},
	fecha: {
		type: Date,
		required: false,
	},
	acta: {
		type: String,
		required: false,
	},
	detalle: {
		type: String,
		required: false,
	},
});

interface IDetalleAsignatura {
	asignaturaOriginal: Types.ObjectId;
	asignaturaActual?: Types.ObjectId;
	condicion: ICondicion[];
}
export const DetalleAsignaturaSchema = new Schema<IDetalleAsignatura>({
	asignaturaOriginal: {
		type: Schema.Types.ObjectId,
		ref: "Asignatura",
		required: true,
	},
	asignaturaActual: {
		type: Schema.Types.ObjectId,
		ref: "Asignatura",
		required: false,
	},
	condicion: {
		type: [CondicionSchema],
		required: false,
		default: [],
	},
});

export interface IEstudiante {
	apellido: string;
	nombre: string;
	dni: number;
	mail: string;
	celular?: string;
	ciudad?: string;
	cursando: boolean;
	visible?: boolean;
	tutores?: string[];
	trabaja: boolean;
	relCarrera?: boolean;
	horarioTrabajo?: string;
	detallesTrabajo?: string;
	plan: Types.ObjectId;
	acciones?: IAccion[];
	detallePlan?: IDetalleAsignatura[];
}

export const EstudianteSchema = new Schema<IEstudiante>({
	apellido: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	dni: {
		type: Number,
		required: true,
		unique: true,
	},
	mail: {
		type: String,
		required: true,
	},
	celular: {
		type: String,
		required: false,
	},
	ciudad: {
		type: String,
		required: false,
	},
	cursando: {
		type: Boolean,
		required: true,
		default: true,
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
	tutores: {
		type: [String],
		required: false,
	},
	trabaja: {
		type: Boolean,
		required: true,
	},
	relCarrera: {
		type: Boolean,
		required: false,
	},
	horarioTrabajo: {
		type: String,
		required: false,
	},
	detallesTrabajo: {
		type: String,
		required: false,
	},
	plan: {
		type: Schema.Types.ObjectId,
		ref: "Plan",
		required: true,
	},
	acciones: {
		type: [AccionSchema],
		required: false,
	},
	detallePlan: {
		type: [DetalleAsignaturaSchema],
		required: false,
	},
});

const Estudiante: Model<IEstudiante> = model<IEstudiante>(
	"Estudiante",
	EstudianteSchema
);

export default Estudiante;
