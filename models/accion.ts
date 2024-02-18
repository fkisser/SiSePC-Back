import { Model, Schema, Types, model } from "mongoose";

export interface IAccion {
	fecha: Date;
	descripcion: string;
	tutor?: Types.ObjectId;
	archivo?: string;
	observaciones?: string;
	estado?: string;
	visible?: boolean;
}

export const AccionSchema = new Schema<IAccion>({
	fecha: {
		type: Date,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	archivo: {
		type: String,
		required: false,
	},
	tutor: {
		type: Schema.Types.ObjectId,
		ref: "Tutor",
		required: false,
	},
	estado: {
		type: String,
		required: false,
	},
	observaciones: {
		type: String,
		required: false,
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
});

const Accion: Model<IAccion> = model<IAccion>("Accion", AccionSchema);

export default Accion;
