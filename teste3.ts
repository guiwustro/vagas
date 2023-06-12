import { Request, Response } from "express";
import { AppError } from "./errors/appError";
import data from "./fakeData";

export const deleteUser = (req: Request, res: Response) => {
	// const name = req.query.name;
	const { id } = req.params

	const indexToRemove = data.findIndex((item) => item.id === +id);

	// Remova o item do array
	if (indexToRemove === -1)
	{
		throw new AppError("User not found.", 404);
	}

	data.splice(indexToRemove, 1);

	res.status(204).json({ message: 'User deleted successfully' });
};
