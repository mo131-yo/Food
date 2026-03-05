import { api } from "../axios-instance";

export const updateCurrentUser = async (userData: { address: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Нэвтрэх эрхгүй байна. Дахин нэвтэрнэ үү.");
  }

  try {
    const response = await api.patch(`/users/update-user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Full Error Response:", error.response);
    
    const errorMessage = error.response?.data?.message || "Хүсэлт амжилтгүй боллоо";
    throw new Error(errorMessage);
  }
};