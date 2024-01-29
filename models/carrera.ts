import { Model, Schema, model } from "mongoose";

export interface ICarrera {
	nombre: string;
	tipo: string;
	duracion: string;
	visible?: boolean;
}
export const CarreraSchema = new Schema<ICarrera>({
	nombre: {
		type: String,
		required: true,
	},
	tipo: {
		type: String,
		required: true,
	},
	duracion: {
		type: String,
		required: true,
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
});

const Carrera: Model<ICarrera> = model<ICarrera>("Carrera", CarreraSchema);

export default Carrera;
