// import { LoginResponse } from "@/constants/auth";

// export const getCurrentUser = async (token: string | false | null) => {
//   const endPoint = "/auth/get-current-user";
// };



export const getCurrentUser = async (token: string | null): Promise<any> => {
  const BASE_URL = "http://localhost:8000";
  if (!token) return undefined;

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) return undefined;

    const result = await response.json();
    return result.user; 
  } catch (error) {
    return undefined;
  }
};