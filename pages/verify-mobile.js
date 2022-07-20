/* eslint-disable react/jsx-key */

import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import axios from "../lib/axios";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const router = useRouter();
  const { logout, resendEmailVerification } = useAuth({
    middleware: "guest",
  });
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(null);
  const [otp, setOtp] = useState(null);
  function handleSubmit(event) {
    event.preventDefault();
    resendEmailVerification({ otp, setStatus });
  }
  function submitForm(event) {
    event.preventDefault();
    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data);
        if (res.data) {
          axios
            .post("/api/verify-otp", {
              user_id: res.data.id,
              otp,
            })
            .then((res) => {
              if (res.data.success) {
                router.push(localStorage.getItem("prevRoute"));
              } else {
                setStatus(res.data.message);
              }
            });
        }
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      });
  }
  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <Image
              className="rounded-t-lg"
              src="/logo.svg"
              alt="logo"
              width={250}
              height={50}
            />
          </Link>
        }
      >
        <div className="mb-4 text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you verify your
          mobile number?
        </div>

        <div>
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 opacity-60">
                Enter the OTP sent to your mobile number
              </label>
              <Input
                id="otp"
                type="text"
                value={otp}
                className="block mt-1 w-full"
                onChange={(event) => setOtp(event.target.value)}
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Enter
            </button>
          </form>
        </div>
        {status === "verification-link-sent" && (
          <div className="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}

        <div className="mt-4 flex items-center justify-end">
          <Button onClick={() => resendEmailVerification({ setStatus })}>
            Resend Verification OTP
          </Button>

          {/* <button
            type="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
            onClick={logout}
          >
            Logout
          </button> */}
        </div>
      </AuthCard>
    </GuestLayout>
  );
};

export default VerifyEmail;
