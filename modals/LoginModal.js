import Link from "next/link";
import Input from "@/components/Input";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthValidationErrors from "@/components/AuthValidationErrors";

const LoginModal = ({ show, page, closeModal, url = null }) => {
  const router = useRouter();
  const redirect =
    url == null
      ? `/${page}/${router.query.slug == undefined ? "" : router.query.slug}`
      : url;
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: redirect,
  });

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();
    let email = `+88${phone}`;
    login({ email, password, setErrors, setStatus });
    closeModal();
  };

  return (
    <>
      {/* Validation Errors */}
      <AuthValidationErrors className="mb-4" errors={errors} />
      <div
        className={`${
          show ? "active" : "hidden"
        }  bg-black w-screen h-screen opacity-40 absolute top-0 left-0 z-10`}
      ></div>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className={`${
          show ? "active" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center`}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 ">
                Sign in to our platform
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Phone Number
                  </label>
                  <Input
                    id="email"
                    type="text"
                    value={phone}
                    className="block mt-1 w-full"
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    className="block mt-1 w-full"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500  "
                        required=""
                      />
                    </div>
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password">
                    <a className="text-sm text-blue-700 hover:underline ">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={submitForm}
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 ">
                  Not registered?{" "}
                  <Link href="/register">
                    <a className="text-blue-700 hover:underline ">
                      Create account
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
