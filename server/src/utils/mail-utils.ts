// import nodemailer from "nodemailer";
// import { configDotenv } from "dotenv";

// configDotenv();

// const { AUTH_EMAIL ,AUTH_PASS} = process.env;

// const transport = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });

//     export const verifyUserEmail = async (receiver: string, verifiLink: string) => {
//         await transport.sendMail({
//             from: `Foods <${AUTH_EMAIL}>`,
//             to: receiver,
//             subject: "Verify user",
//             html: `<p>Click <a href="${verifiLink}">here</a> to verify your email.</p>`
//         })
//     }


import { Resend } from "resend";
import { configDotenv } from "dotenv";

configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "onboarding@resend.dev"; 

export const sendSignupVerification = async (receiver: string, verifyLink: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: receiver,
      subject: "Бүртгэл баталгаажуулах",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Тавтай морил!</h2>
          <p>Та доорх линк дээр дарж бүртгэлээ идэвхжүүлнэ үү:</p>
          <a href="${verifyLink}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Идэвхжүүлэх</a>
          <p style="margin-top: 20px; color: #666;">Хэрэв та бүртгүүлээгүй бол энэ имэйлийг үл тоомсорлоорой.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Signup Email Error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Unexpected Signup Email Error:", err);
    return { success: false, err };
  }
};
