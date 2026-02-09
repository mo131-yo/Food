import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token байхгүй байна" });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: "Refresh token хүчингүй эсвэл хугацаа дууссан" });
            }

            const newAccessToken = jwt.sign(
                { userId: decoded.userId, role: decoded.role }, 
                process.env.JWT_SECRET!,
                { expiresIn: "15m" }
            );

            res.status(200).json({
                accessToken: newAccessToken,
                message: "Эрх амжилттай сунгагдлаа"
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Серверийн алдаа" });
    }
};

// import cookieParser from 'cookie-parser';
// app.use(cookieParser());