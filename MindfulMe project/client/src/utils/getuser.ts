// utils/getUserFromToken.ts
import jwtDecode from "jwt-decode";

interface TokenData {
  user_id: number;
  role: string;
  exp: number;
}

export function getUserFromToken(): TokenData | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: TokenData = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
}
