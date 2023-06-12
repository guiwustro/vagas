import { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/appError";
import data, { IFakeData } from './fakeData';

export const getUser = (req: Request, res: Response) => {
	const name = req.query.name as string | undefined;

	const user = data.find((user) => user.name.toLowerCase() === name?.toLowerCase())


	if (!user)
	{
		throw new AppError("User not found.", 404);
	}

	// Adicionar chave nova pra identificar que o usuário foi lido
	user.readTimes = user.readTimes ? user.readTimes + 1 : 1;
	const userCopy = Object.assign({}, user) as Partial<IFakeData>;
	delete userCopy.password;

	res.send(userCopy)
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
	const dataCopy = data.map((user) => {
		const userCopy = Object.assign({}, user) as Partial<IFakeData>
		delete userCopy.password;
		return userCopy
	})
	res.send(dataCopy);
};

