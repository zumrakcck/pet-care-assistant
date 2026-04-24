import axios from "axios";

// Android emulator default: 10.0.2.2, physical device: your LAN IP.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function checkBackendHealth() {
  const response = await api.get("/");
  return response.data;
}
