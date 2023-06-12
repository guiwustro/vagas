import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
const validateIsAdmOrOwner = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { isAdmin } = req.user;
    const { id: actualUserId } = req.user
    const id = req.params.id

    // O próprio usuário pode se editar/remover
    // Administradores podem editar/remover qualquer usuário

    if (+actualUserId === +id || isAdmin)
    {
        return next()
    }

    if (!isAdmin)
        throw new AppError("User is forbidden.", 403);

};

export default validateIsAdmOrOwner;
