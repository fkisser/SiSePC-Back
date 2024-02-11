import { Model, Schema, Types, model } from "mongoose";
import { AccionSchema, IAccion } from "./accion";
import { AsignaturaSchema, IAsignatura } from "./asignatura";

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

export interface IDetalleAsignatura {
	asignaturaOriginal: IAsignatura;
	asignaturaActual?: IAsignatura | null;
	aprobada: boolean;
	condicion?: ICondicion;
}
export const DetalleAsignaturaSchema = new Schema<IDetalleAsignatura>({
	asignaturaOriginal: {
		type: AsignaturaSchema,
		required: true,
	},
	asignaturaActual: {
		type: AsignaturaSchema,
		required: false,
		default: null,
	},
	aprobada: {
		type: Boolean,
		required: true,
		default: false,
	},
	condicion: {
		type: CondicionSchema,
		required: false,
		default: {
			nombre: "Pendiente",
		},
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
