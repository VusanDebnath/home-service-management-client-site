import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        loading: false,

        login: (token) => {
          try {
            const decoded = jwtDecode(token);
            localStorage.setItem("token", token);
            set({ user: decoded, token }, false, "login");
          } catch {
            console.error("Invalid token");
          }
        },

        logout: () => {
          localStorage.removeItem("token");
          set({ user: null, token: null }, false, "logout");
        },

        setLoading: (loading) => set({ loading }, false, "setLoading"),

        checkAuth: () => {
          const token = localStorage.getItem("token");
          if (!token) {
            set({ user: null, token: null });
            return;
          }
          try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
              localStorage.removeItem("token");
              set({ user: null, token: null }, false, "tokenExpired");
            } else {
              set({ user: decoded, token }, false, "checkAuth");
            }
          } catch {
            localStorage.removeItem("token");
            set({ user: null, token: null }, false, "invalidToken");
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          token: state.token,
          user: state.user,
        }),
      },
    ),
  ),
);

export default useAuthStore;
