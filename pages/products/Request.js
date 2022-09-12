import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Toaster from "@/components/Toaster";
import LoginModal from "@/modals/LoginModal";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

const Request = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSSR, setIsSSR] = useState(true);
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [link, setLink] = useState(null);
  const [loginModal, showLoginModal] = useState(false);
  useEffect(() => {
    if (user == null) {
      axios
        .get("/api/user")
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        });
    }
  }, []);
  function submitRequest(e) {
    if (name == null || brand == null || link == null) {
      alert("Please fill all the fields");
      return;
    }
    if (user) {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("website_link", link);
      axios
        .post("/api/review-requests", formData)
        .then((res) => {
          if (res.data.success) {
            Toaster.notify(res.data.message, { type: "success" });
            router.push(`/profile/${user.id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      showLoginModal(true);
      return;
    }
  }
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Product Review Request
        </h2>
      }
    >
      <Head>
        <title>Laravel </title>
      </Head>
      <div className="p-6 w-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-10">
        <h1 className="text-lg font-semibold text-center">
          Product Review Request Form
        </h1>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-[100%]"
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Product Brand
          </label>
          <input
            type="text"
            placeholder="Product Brand"
            onChange={(e) => setBrand(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-[100%]"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Product Link
          </label>
          <input
            type="text"
            placeholder="http:// or https://"
            onChange={(e) => setLink(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-[100%]"
          />
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          onClick={() => {
            submitRequest();
          }}
        >
          Submit
        </button>
        {/*log in  modal section  */}
        {isSSR === false ? (
          <LoginModal
            show={showLoginModal}
            page={`/events`}
            closeModal={closeModal}
            className="z-40 opacity-100"
          />
        ) : (
          <></>
        )}
      </div>
    </AppLayout>
  );
};

export default Request;
