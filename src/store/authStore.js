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

          // Zustand persist থেকে directly user নাও
          const stored = localStorage.getItem("auth-storage");
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              const storedUser = parsed?.state?.user;
              const storedToken = parsed?.state?.token;

              if (storedUser && storedToken) {
                // dev-test-token হলে decode করার দরকার নেই
                if (storedToken === "dev-test-token") {
                  set(
                    { user: storedUser, token: storedToken },
                    false,
                    "checkAuth",
                  );
                  return;
                }

                // Real JWT token হলে decode করো
                const decoded = jwtDecode(storedToken);
                if (decoded.exp * 1000 < Date.now()) {
                  localStorage.removeItem("auth-storage");
                  set({ user: null, token: null }, false, "tokenExpired");
                } else {
                  set(
                    { user: decoded, token: storedToken },
                    false,
                    "checkAuth",
                  );
                }
                return;
              }
            } catch {
              // parse error
            }
          }

          set({ user: null, token: null });
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
