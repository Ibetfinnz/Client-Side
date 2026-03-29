const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const getToken = () => localStorage.getItem("token");
const getUsername = () => localStorage.getItem("username") || "";

const getCurrentUser = () => {
  const username = getUsername();
  const token = getToken();
  let userId = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      userId = payload?.id ?? null;
    } catch (err) {
      userId = null;
    }
  }

  return { username, userId, token };
};

const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

const isGroupOwner = (group, user = getCurrentUser()) => {
  if (!group || !user) return false;

  const byFlag = Boolean(group.is_owner);
  const byUserId = user.userId && Number(group.created_by) === Number(user.userId);
  const byUsername = user.username && group.creator_name === user.username;

  return Boolean(byFlag || byUserId || byUsername);
};

async function request(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    withAuth = false,
    authOptional = false,
  } = options;

  const requestHeaders = { ...headers };
  const token = getToken();

  if (withAuth || (authOptional && token)) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    requestHeaders["Content-Type"] = requestHeaders["Content-Type"] || "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    const fallbackMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
    const message = data?.error || fallbackMessage;
    throw new ApiError(message, response.status, data);
  }

  return data;
}

export const authApi = {
  login: (payload) => request("/login", { method: "POST", body: payload }),
  register: (payload) => request("/register", { method: "POST", body: payload }),
};

export const groupApi = {
  getGroups: () => request("/groups"),
  getGroupDetail: (groupId) => request(`/groups/${groupId}`, { authOptional: true }),
  createGroup: (payload) => request("/groups", { method: "POST", withAuth: true, body: payload }),
  joinGroup: (groupId) => request(`/groups/${groupId}/join`, { method: "POST", withAuth: true }),
  leaveGroup: (groupId) => request(`/groups/${groupId}/leave`, { method: "DELETE", withAuth: true }),
  deleteGroup: (groupId) => request(`/groups/${groupId}`, { method: "DELETE", withAuth: true }),
};

export { ApiError, getToken, getCurrentUser, clearAuthSession, isGroupOwner };