import { Model, Schema, Types, model } from "mongoose";

export interface IAccion {
	fecha: Date;
	descripcion: string;
	archivo: string;
	tutor?: Types.ObjectId;
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
		required: true,
	},
	tutor: {
		type: Schema.Types.ObjectId,
		ref: "Tutor",
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
