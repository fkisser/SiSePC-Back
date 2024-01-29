import Tutor, { ITutor } from "../models/tutor";

export const existingMail = async (mail: string): Promise<void> => {
	const user: ITutor | null = await Tutor.findOne({ mail });
	if (user) throw new Error(`El correo electrónico ${mail} ya está registrado`);
};
