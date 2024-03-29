import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Toaster from "@/components/Toaster";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();

  const { data: user, error, mutate } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => {
        if (res.data.email_verified_at == null) {
          router.push("/verify-mobile");
        } else if (res.data.profile_complete == 0) {
          router.push("/profile/create");
        } else {
        }

        return res.data;
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => (res) => {
        if (res.data.success) {
          mutate();
        }
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        Toaster.notify("Something Went Wrong", { type: "error" });

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => (res) => {
        Toaster.notify("Log In Successfull..!!", { type: "success" });
        mutate();
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => {
        setStatus(response.data.status);
        if (response.data.status == true) {
          router.push("/password-reset/reset");
        }
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) => {
        if (response.data.status) {
          Toaster.notify(response.data.message, { type: "success" });
          router.push("/login");
        } else {
          Toaster.notify(response.data.message, { type: "error" });
        }
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }
    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }
    if (middleware === "auth" && error) logout();
  }, [user]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
