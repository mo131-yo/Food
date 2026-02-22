import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema/user.schema";

// export const verifyEmail = async (req: Request, res: Response) => {
//     try {
//         const { token } = req.query; 

//         if (!token) {
//             return res.status(400).json({ message: "Token bhq" });
//         }

//         const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || "hello");

//         const user = await UserModel.findByIdAndUpdate(
//             decoded._id, 
//             { isVerified: true },
//             { new: true } 
//         );

//         if (!user) {
//             return res.status(404).json({ message: "Hereglegch oldsongui" });
//         }

//         res.status(200).send(`
//             <h1>Bayr hurgey.</h1>
//             <p>${user.email} amjilttai burtgegdlee. Odoo nevterch bolno</p>
//         `);

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: "time out" });
//     }
// };

// export const verifyEmail = async (req: Request, res: Response) => {
//     try {
//         const { token } = req.query; 

//         if (!token) {
//             return res.status(400).json({ message: "Token bhq" });
//         }

//         const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || "hello");


//         const frontendUrl = `${process.env.FRONTEND_URL || "http://localhost:8000"}/set-password?token=${token}`;
        
//         return res.redirect(frontendUrl);

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: "Link huchingui esvel hugatsaa duussan" });
//     }
// };

export const verifyEmail = async (req: Request, res: Response) => {
    console.log("Request received for verification");
    try {
        const { token } = req.query; 

        if (!token) {
            return res.status(400).json({ message: "Token bhq" });
        }

        const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET || "hello");
        console.log("Decoded email:", decoded.email);

    const frontendUrl = `${process.env.FRONTEND_URL}/last-sign-up?token=${token}`;
        
        return res.redirect(frontendUrl);
    } catch (error) {
        return res.status(400).json({ message: "Link huchingui" });
    }
};