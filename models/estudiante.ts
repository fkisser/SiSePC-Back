import { Model, Schema, Types, model } from "mongoose";
import { AccionSchema, IAccion } from "./accion";

export interface IDetalleAsignatura {
	asignaturaOriginal: string;
	asignaturaActual?: string | null;
	condicion?: string;
	fecha?: Date;
	acta?: string;
	detalle?: string;
}
export const DetalleAsignaturaSchema = new Schema<IDetalleAsignatura>({
	asignaturaOriginal: {
		type: String,
		required: true,
	},
	asignaturaActual: {
		type: String,
		required: false,
		default: null,
	},
	condicion: {
		type: String,
		required: false,
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

export interface IEstudiante {
	apellido: string;
	nombre: string;
	dni: number;
	mail: string;
	celular?: string;
	ciudad?: string;
	visible?: boolean;
	tutores?: string;
	trabaja: boolean;
	esRegular: boolean;
	relCarrera?: boolean;
	horarioTrabajo?: string;
	detallesTrabajo?: string;
	plan: Types.ObjectId;
	añoIngreso?: string;
	cuatIngreso?: string;
	relPrograma?: string;
	ultimaAprobada?: Date | string;
	ultimaReinscripcion?: Date | string;
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
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
	tutores: {
		type: String,
		required: false,
	},
	trabaja: {
		type: Boolean,
		required: true,
	},
	esRegular: {
		type: Boolean,
		required: false,
		default: false,
	},
	relCarrera: {
		type: Boolean,
		required: false,
	},
	añoIngreso: {
		type: String,
		required: false,
	},
	cuatIngreso: {
		type: String,
		required: false,
	},
	relPrograma: {
		type: String,
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
	ultimaAprobada: {
		type: Date || String,
		required: false,
		default: "",
	},
	ultimaReinscripcion: {
		type: Date || String,
		required: false,
		default: "",
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
