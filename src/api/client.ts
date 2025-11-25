import axios from "axios";
import Cookies from "js-cookie";

const REFRESH_TOKEN_KEY = "x-refresh-token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let accessToken = Cookies.get("accessToken");

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    const isRefreshEndpoint = originalReq.url?.includes("/refresh");

    if (
      err.response?.status === 401 &&
      !originalReq._retry &&
      !isRefreshEndpoint
    ) {
      originalReq._retry = true;

      try {
        const { data } = await axios.post(
          "/api/auth/refresh",
          {},
          { baseURL: api.defaults.baseURL }
        );

        accessToken = data.accessToken;
        Cookies.set("accessToken", data.accessToken, { expires: 1 });

        originalReq.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalReq);
      } catch {
        authApi.logout();
      }
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post("/api/auth/login", { email, password });

    accessToken = data.accessToken;
    Cookies.set("accessToken", data.accessToken, { expires: 1 });

    return data;
  },

  register: (email: string, password: string) =>
    api.post("/api/auth/register", { email, password }),

  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove(REFRESH_TOKEN_KEY);
    window.location.href = "/login";
  },
};

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
