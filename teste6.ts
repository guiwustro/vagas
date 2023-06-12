import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errors/appError";
import data from './fakeData';

export const loginUser = (req: Request, res: Response) => {
    const { password, name } = req.body

    const user = data.find((user) => user.name.toLowerCase() === name?.toLowerCase())
    if (!user) throw new AppError("Wrong e-mail or password.", 403);

    if (!bcrypt.compareSync(password, user.password))
        throw new AppError("Wrong e-mail or password.", 403);

    const token = jwt.sign(
        {
            isAdmin: user.isAdmin,
        },
        String(process.env.SECRET_KEY),
        {
            subject: user.id.toString(),
            expiresIn: "30days",
        }
    );

    return res.status(200).json({ token });
};

