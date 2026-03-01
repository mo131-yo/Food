import axios from "axios";

import {
  PasswordResetTypes,
  SendPasswordResetMail,
} from "@/constants/auth";

const api = axios.create({
  baseURL: "http://localhost:8000",
});



export const handleSignUp = async ({ email }: { email: string }) => {
  try {
    const response = await api.post("/users/sign-up", { email });
    return response.data;
  } catch (error: any) {
    console.error("SignUp Error Details:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
export const handleLastSignUp = async ({ token, password }: PasswordResetTypes) => {
  try {
    const response = await api.post("/users/last-sign-up", { token, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const handleSignIn = async ({ email, password }: any) => {
  try {
    const response = await api.post("/users/sign-in", { email, password });
    return response.data;
  } catch (error: any) {
    console.error("SignIn Service Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const handleSendPasswordResetMail = async ({ email }: SendPasswordResetMail) => {
  try {
    const response = await api.post("/users/reset-password-request", { email });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const handlePasswordReset = async ({ email, verifyCode, newPassword }: any) => {
  try {
    const response = await api.post("/users/reset-password", { 
      email, 
      verifyCode, 
      newPassword 
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// export const handleSignUp = async ({ email, password }: SignUpTypes) => {
//   const endPoint = "/auth/sign-up";
//   const payload = {
//     email: email,
//     password: password,
//   };
// };

// export const handleSendPasswordResetMail = async ({
//     email,
//   }: SendPasswordResetMail) => {
//       const endPoint = "/auth/forgot-password";
//       const payload = {
//           email: email,
//         };
//       };
      

// export const handlePasswordReset = async ({
//   token,
//   password,
// }: PasswordResetTypes) => {
//   const endPoint = "/auth/reset-password";
//   const payload = {
//     token: token,
//     password: password,
//   };
// };