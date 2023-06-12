import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AppError } from "./errors/appError";
import data from "./fakeData";

export const createUser = (req: Request, res: Response) => {
    const { name, job, isAdmin, password } = req.body;


    const alreadyHasThisUser = data.find((user) => user.name === name)
    if (alreadyHasThisUser)
    {
        throw new AppError("Already has this user in the database.", 400);
    }

    const newId = data[data.length - 1].id + 1

    const newUser = {
        id: newId,
        name: name,
        job: job,
        isAdmin: isAdmin || false,
    }

    data.push({
        ...newUser,
        password: bcrypt.hashSync(password, 10)
    })

    return res.status(201).send(newUser)
};