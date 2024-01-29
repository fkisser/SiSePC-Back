import { Model, Schema, model } from "mongoose";
import { EstudianteSchema, IEstudiante } from "./estudiante";

export interface ITutor {
	apellido: string;
	nombre: string;
	dni: number;
	mail: string;
	celular?: string;
	contraseña: string;
	isAdmin?: boolean;
	estudiantes?: IEstudiante[];
	visible?: boolean;
	recuperacion?: string; //para recuperar la contraseña, se genera con randomstring y se envía al mail
}

export const TutorSchema = new Schema<ITutor>({
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
	contraseña: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: false,
		default: false,
	},
	estudiantes: {
		type: [EstudianteSchema],
		required: false,
		default: [],
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
	recuperacion: {
		type: String,
		required: false,
	},
});

const Tutor: Model<ITutor> = model<ITutor>("Tutor", TutorSchema);

export default Tutor;
