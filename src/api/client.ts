import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    const isLogin = originalReq.url?.includes("/login");

    if (err.response?.status === 401 && !originalReq._retry && !isLogin) {
      originalReq._retry = true;

      try {
        const { data } = await axios.post(
          "/refresh",
          { refreshToken: Cookies.get("refreshToken") },
          {
            baseURL: api.defaults.baseURL,
            headers: { "Content-Type": "application/json" },
          }
        );

        Cookies.set("accessToken", data.accessToken, {
          expires: 1,
          secure: true,
        });
        Cookies.set("refreshToken", data.refreshToken, {
          expires: 7,
          secure: true,
        });

        originalReq.headers.Authorization = `Bearer ${data.accessToken}`;
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
    const { data } = await api.post("/login", { email, password });
    Cookies.set("accessToken", data.accessToken, { expires: 1, secure: true });
    Cookies.set("refreshToken", data.refreshToken, {
      expires: 7,
      secure: true,
    });
    return data;
  },

  register: (email: string, password: string) =>
    api.post("/register", { email, password }),

  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/login";
  },
};

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
