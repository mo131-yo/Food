import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema/user.schema";

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.query; 

        if (!token) {
            return res.status(400).json({ message: "Token bhq bn" });
        }
        jwt.verify(token as string, process.env.JWT_SECRET || "hello");

        // const frontendUrl = `${process.env.FRONTEND_URL || "http://localhost:8000" || process.env.BACKEND_API}/verify-email?token=${token}`;
        // const frontendUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${token}`;
        const frontendUrl = `http://localhost:3000/sign-up?token=${token}`;

        return res.redirect(frontendUrl);
    } catch (error) {
        return res.status(400).send(`
        
        `);
    }
};