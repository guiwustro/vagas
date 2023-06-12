import { Request, Response } from "express";
import { AppError } from "./errors/appError";
import data from "./fakeData";

export const getAccessTimes = (req: Request, res: Response) => {
	const name = req.query.name;
	const user = data.find((user) => user.name === name)

	if (!user)
	{
		throw new AppError("User not found.", 404);

	}
	let numberOfAccessTimes = user.readTimes
	if (!numberOfAccessTimes)
		numberOfAccessTimes = 0

	return res.status(200).json({ message: `Usuário ${name} foi lido ${numberOfAccessTimes} vezes.` });
};
