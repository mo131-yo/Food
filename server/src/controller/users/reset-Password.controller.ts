import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { UserModel } from "../../schema/user.schema";


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, verifyCode, newPassword } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
        }

        if (!user.resetPasswordOtp || user.resetPasswordOtp !== verifyCode) {
            return res.status(400).json({ message: "Баталгаажуулах код буруу байна" });
        }

        if (new Date() > (user.resetPasswordExpires as Date)) {
            return res.status(400).json({ message: "Кодны хүчинтэй хугацаа дууссан байна" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(String(newPassword), salt);

        user.resetPasswordOtp = "";
        user.resetPasswordExpires = new Date(0);
        
        await user.save();
        res.status(200).json({ message: "Нууц үг амжилттай шинэчлэгдлээ" });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Алдаа гарлаа" });
    }
};