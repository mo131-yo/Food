import { Request, Response } from "express";
import { UserModel } from "../../schema/user.schema";

export const refresh = async (req: Request, res: Response) => {
    try {
        res.status(200).json({message: " Amjilttai shinchillee"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
}