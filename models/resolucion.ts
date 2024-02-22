import { Model, Schema, model } from "mongoose";

export interface IResolucion {
	id: number;
	titulo: string;
	descripcion?: string;
	archivo?: string;
	visible?: boolean;
}

export const ResolucionSchema = new Schema<IResolucion>({
	id: {
		type: Number,
		required: true,
		default: Date.now(),
	},
	titulo: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: false,
	},
	archivo: {
		type: String,
		required: false,
	},
	visible: {
		type: Boolean,
		required: false,
		default: true,
	},
});

const Resolucion: Model<IResolucion> = model<IResolucion>(
	"Resolucion",
	ResolucionSchema
);

export default Resolucion;
