import { jwtDecode } from "jwt-decode";

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded; // should contain user _id, name, email, etc.
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};
