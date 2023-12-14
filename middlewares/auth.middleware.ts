import { Request, Response, NextFunction } from "express"
import User from "../models/user.model";


export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.trim().split(/\s+/)[1];

        const user = await User.findOne({
            token: token,
            deleted: false
        }).select("-password");

        if (user) {
            req["user"] = user;
        };
    };

    next();
}