import { Request, Response } from "express";
import { AppError } from "./errors/appError";
import data, { IFakeData } from "./fakeData";

export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const newInfo = req.body

    let userIndex = data.findIndex(user => user.id == +id);
    if (userIndex === -1)
    {
        throw new AppError("User not found.", 404);
    }


    data[userIndex] = { ...data[userIndex], ...newInfo }
    let userCopy = { ...data[userIndex] } as Partial<IFakeData>
    delete userCopy.password
    console.log(userCopy)

    return res.status(200).json(userCopy)

};