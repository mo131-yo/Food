import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Login hiih erhgui bn" });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const secret = process.env.JWT_SECRET as string;
    
    const decoded = jwt.verify(token as string, secret);
    (req as any).user = decoded; 
    next();
  } catch (error: any) {
    res.status(401).json({ 
      message: "Token huchingui esvel hugatsaa duussan",
      error: error.message 
    });
  }
};
