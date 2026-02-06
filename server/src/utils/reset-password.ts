import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { AUTH_EMAIL, AUTH_PASS } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

export const ResetPasswordVerificationEmail = async (
  reciever: string,
  otpCode: string,
) => {
  try {
    const info = await transport.sendMail({
    from: `"Food Delivery Team" <${AUTH_EMAIL}>`,
    to: reciever,
    subject: "Nuuts ug sergeeh batalgaajuulah code",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f7f6;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 15px;">
        <h2 style="color: #333;">Nuuts ug sergeeh</h2>
        <p>Batalgaajuulah code</p>
        <div style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; padding: 20px; border: 2px dashed #007bff; display: inline-block;">
          ${otpCode}
        </div>
        <p style="color: #888; margin-top: 20px;">Ene code 10 min-iin daraa huchingui bolno</p>
      </div>
    </div>
    `,
  });
console.log("Email sent:", info.messageId);
    
    return { success: true }; 

  } catch (error) {
    console.error("Email error:", error);
    
    return { success: false, error: error }; 
  }
};

export default transport; 