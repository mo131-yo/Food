import { UserModel } from "../../../schema/user.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../../utils/mail-utils";

// export const signUpController = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;

//         const User = await UserModel.findOne({ email });
//         if (User) {
//             return res.status(400).json({ message: "Email burtgegdsen bn" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await UserModel.create({email, password: hashedPassword});

//         const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET || "hello", { expiresIn: "1d" } );

//         await verifyUserEmail(email,`${process.env.BACKEND_API || "http://localhost:8000"}/users/verify-email?token=${token}`) ;

//         res.status(201).json({
//             message: "Burtgel amjilttai , email luu tani mail yvuulsan",
//             userId: newUser._id
//         });

//     } catch (error: any) {
//         console.error("Signup Error:", error);
//         res.status(500).json({ message: "Aldaa", error: error.message });
//     }
// }

export const firstSignUp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email burtgegdsen bn" });
        }

        const token = jwt.sign(
            { email }, 
            process.env.JWT_SECRET || "hello", 
            { expiresIn: "15m" } 
        );

        // const verificationLink = `${process.env.BACKEND_URL || "http://localhost:8000"}/users/verify-email?token=${token}`;
        const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:8000"}/verify-email?token=${token}`;

        await verifyUserEmail(email, verificationLink);

        res.status(200).json({
            message: "Batalgaajuulah mail yvuulsan. Mail ee shalgaad nuuts ugee tohiruulna uu", token
        });

    } catch (error: any) {
        res.status(500).json({ message: "Aldaa garlaa", error: error.message });
    }
}