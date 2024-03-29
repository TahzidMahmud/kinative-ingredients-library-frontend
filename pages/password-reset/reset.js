import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import AuthSessionStatus from "@/components/AuthSessionStatus";
import AuthValidationErrors from "@/components/AuthValidationErrors";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PasswordReset = () => {
  const router = useRouter();

  const { resetPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = (event) => {
    event.preventDefault();

    resetPassword({
      email,
      otp,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    setEmail(router.query.email || "");
  }, [router.query.email]);

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            </a>
          </Link>
        }
      >
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />
        <h3 className="text-red-500  font-semibold text-md my-3">
          An OTP sent to you mobile number. Please Provide That Below
        </h3>
        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Sent OTP</Label>

            <Input
              id="email"
              type="number"
              value={otp}
              className="block mt-1 w-[100%] my-1"
              onChange={(event) => setOtp(event.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="email">Phone Number</Label>

            <Input
              id="email"
              type="number"
              value={email}
              className="block mt-1 w-[100%]"
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-[100%]"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>

            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-[100%]"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Reset Password</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default PasswordReset;
