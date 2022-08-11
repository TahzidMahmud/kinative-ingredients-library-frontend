import QuillNoSSRWrapper from "@/components/Quil";
import { modules, formats } from "@/components/Quil";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import LoginModal from "@/modals/LoginModal";
import { useEffect, useState } from "react";

const Create = () => {
  // console.log(categories);
  const [isSSR, setIsSSR] = useState(true);
  const [blogbody, setBlogbody] = useState(null);
  const [blogtitle, setBlogtitle] = useState(null);
  const [blogcategory, setBlogcategory] = useState(null);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          event
        </h2>
      }
    >
      <Head>
        <title>Laravel - event</title>
      </Head>
      <div className="p-6 w-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-10">
        <label
          htmlFor="countries"
          className="block mb-2 text-md font-large text-gray-900 dark:text-gray-400"
        >
          Blog Title
        </label>
        <input
          type="text"
          id="base-input"
          onChange={(e) => setBlogtitle(e.target.value)}
          className="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
        <label
          htmlFor="countries"
          className="block mb-2 text-md font-large text-gray-900 dark:text-gray-400"
        >
          Select Blog Category
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) => setBlogcategory(e.target.value)}
        >
          {/* {categories.map((category, index) => (
            <option key={category.index} value={category.id}>
              {category.name}
            </option>
          ))} */}
          <option>Select Category</option>
        </select>
        <label
          htmlFor="countries"
          className="block mb-2 text-md font-large text-gray-900 dark:text-gray-400 my-4"
        >
          Write Blog Content
        </label>
        <QuillNoSSRWrapper
          onChange={setBlogbody}
          modules={modules}
          formats={formats}
          theme="snow"
          className="h-[32rem] pb-10 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-2"
        />
      </div>
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
    </AppLayout>
  );
};

// export function getServerSideProps(context) {
//   const categories = axios
//     .get("/api/blog/categories")
//     .then((response) => {
//       // console.log(response.data.categories);
//       return response.data.categories;
//     })
//     .catch((error) => console.log(error));

//   return {
//     props: {
//       categories: categories,
//     },
//   };
// }
export default Create;
