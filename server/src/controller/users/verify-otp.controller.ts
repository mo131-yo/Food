import { Request, Response } from "express";
import { UserModel } from "../../schema/user.schema";

// Энийг controller дээрээ нэмээрэй
export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, verifyCode } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
        }

        // Код таарч байгаа эсэхийг шалгах
        if (!user.resetPasswordOtp || user.resetPasswordOtp !== verifyCode) {
            return res.status(400).json({ message: "Баталгаажуулах код буруу байна" });
        }

        // Хугацаа дууссан эсэхийг шалгах
        if (new Date() > (user.resetPasswordExpires as Date)) {
            return res.status(400).json({ message: "Кодны хугацаа дууссан байна" });
        }

        // Хэрэв бүх зүйл зөв бол
        res.status(200).json({ 
            success: true, 
            message: "Код баталгаажлаа. Одоо нууц үгээ шинэчилнэ үү." 
        });

    } catch (error) {
        res.status(500).json({ message: "Алдаа гарлаа" });
    }
};