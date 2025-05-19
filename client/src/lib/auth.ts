import { apiRequest } from "./queryClient";

// Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ResetPasswordRequest {
  teacherCode: string;
  email: string;
}

// API functions
export async function login(credentials: LoginCredentials) {
  const res = await apiRequest("POST", "/api/login", credentials);
  return res.json();
}

export async function logout() {
  await apiRequest("POST", "/api/logout");
}

export async function getCurrentUser() {
  const res = await apiRequest("GET", "/api/user");
  return res.json();
}

export async function resetPassword(data: ResetPasswordRequest) {
  const res = await apiRequest("POST", "/api/reset-password", data);
  return res.json();
}
