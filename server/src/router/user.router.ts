import { createUser, getUserByIdAndGet, refresh } from "../controller";
import { Router } from "express";
import { signUpController } from "../controller/users/Nevterh/sign-up-controller";
import { signInController } from "../controller/users/Nevterh/sign-in-controller";
import { verifyEmail } from "../controller/users/verify-email.controller";
import { updateUser } from "../controller/users/update.controller";
import { getAllUsers } from "../controller/users/all-user.controller";
import { resetPassword } from "../controller/users/reset-Password.controller";
import { resetPasswordRequest } from "../controller/users/reset-password-request.controller";

export const userRouter = Router();

userRouter.post("/create-user", createUser);

userRouter.get("/get-user-by-id-get-request/:userId", getUserByIdAndGet);

userRouter.get("/all-users", getAllUsers)

userRouter.post("/sign-up", signUpController);
userRouter.post("/sign-in", signInController);

userRouter.get("/verify-email", verifyEmail);

userRouter.post("/resend-otp", signInController);

userRouter.post("/update-user/:id", updateUser);

userRouter.patch("/reset-password-request", resetPassword);

userRouter.post("/reset-password-request", resetPasswordRequest); // Код илгээх
userRouter.post("/reset-password", resetPassword);       // Нууц үг солих
userRouter.get("/refresh", refresh);