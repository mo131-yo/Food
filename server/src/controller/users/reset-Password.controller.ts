import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "../../schema/user.schema";


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, verifyCode, newPassword } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user || user.resetPasswordOtp !== verifyCode) {
            return res.status(400).json({ message: "Хүсэлт хүчингүй байна" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(String(newPassword), salt);

        user.set('resetPasswordOtp', undefined);
        user.set('resetPasswordExpires', undefined);
        
        await user.save();
        res.status(200).json({ message: "Password amjiltai shinchlegdlee" });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};