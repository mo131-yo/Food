import { User } from "@/types";

// export const updateCurrentUser = async (
//   payload: Partial<User>
// ): Promise<User | undefined> => {
//   const endPoint = `/auth`;
//   const token = localStorage.getItem("token");
//   return undefined;
// };


// export const updateCurrentUser = async (
//   payload: Partial<User>
// ): Promise<User | undefined> => {
//   const BASE_URL = "http://localhost:8000";
//   const token = localStorage.getItem("token");

//   if (!token) return undefined;

//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const decodedToken = JSON.parse(window.atob(base64));
//     const userId = decodedToken.id; 

//     const endPoint = `${BASE_URL}/users/update-user/${userId}`;

//     const response = await fetch(endPoint, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) throw new Error("Update failed");

//     const result = await response.json();
//     return result.user;
//   } catch (error) {
//     console.error("Update Current User Error:", error);
//     return undefined;
//   }
// };


export const updateCurrentUser = async (userData: { address: string }) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Хаяг шинэчлэхэд алдаа гарлаа");
  }

  return await response.json();
};