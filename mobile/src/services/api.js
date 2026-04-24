import axios from "axios";

const API_BASE_URL = "https://pet-care-assistant.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

function normalizeResponse(response) {
  const payload = response?.data;

  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload;
}

function mapApiError(error) {
  console.log("API ERROR:", error.response?.data || error.message);

  if (!error.response) {
    return new Error(
      "Backend is unreachable. Please check internet connection and API URL.",
    );
  }

  const serverMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Unexpected API error";

  return new Error(serverMessage);
}

function resolveUserId(payload = {}) {
  return payload.userId || "demo-user";
}

export async function getPets() {
  try {
    const response = await api.get("/pets");
    return normalizeResponse(response);
  } catch (error) {
    throw mapApiError(error);
  }
}

export async function addPet(payload) {
  try {
    const response = await api.post("/pets", {
      userId: resolveUserId(payload),
      name: payload.name,
      type: payload.type,
      age: payload.age || "",
      breed: payload.breed || "",
    });
    return normalizeResponse(response);
  } catch (error) {
    throw mapApiError(error);
  }
}

export async function getReminders() {
  try {
    const response = await api.get("/reminders");
    return normalizeResponse(response);
  } catch (error) {
    throw mapApiError(error);
  }
}

export async function addReminder(payload) {
  try {
    const response = await api.post("/reminders", {
      userId: resolveUserId(payload),
      petId: payload.petId || "demo-pet",
      title: payload.title,
      date: payload.date,
      time: payload.time,
      status: payload.status || "pending",
    });
    return normalizeResponse(response);
  } catch (error) {
    throw mapApiError(error);
  }
}

export async function sendMessageToAI(payload) {
  try {
    const response = await api.post("/ai-chat", {
      userId: resolveUserId(payload),
      message: payload.message,
    });
    return normalizeResponse(response);
  } catch (error) {
    throw mapApiError(error);
  }
}

export async function getSubscriptions() {
  try {
    const response = await api.get("/subscriptions");
    return normalizeResponse(response);
  } catch (error) {
    throw mapApiError(error);
  }
}

export async function addSubscription(payload = {}) {
  try {
    const response = await api.post("/subscriptions", {
      userId: resolveUserId(payload),
      planType: payload.planType || "Premium",
      isActive: payload.isActive ?? true,
    });
    return normalizeResponse(response);
  } catch (error) {
    throw mapApiError(error);
  }
}

export default api;
