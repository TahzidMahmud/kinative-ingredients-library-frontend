import Toaster from "@/components/Toaster";
import QuillNoSSRWrapper from "@/components/Quil";
import { modules, formats } from "@/components/Quil";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Image from "next/image";
import Button from "@/components/Button";
import LoginModal from "@/modals/LoginModal";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";

const Create = ({ categories }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSSR, setIsSSR] = useState(true);
  const [blogbody, setBlogbody] = useState(null);
  const [blogtitle, setBlogtitle] = useState(null);
  const [blogcategory, setBlogcategory] = useState(null);
  const imageInput = useRef(null);
  const [cmntimage, setCmntimage] = useState(null);
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);

    if (imageInput.current.files[0].size < 5245329) {
      reader.onloadend = function (e) {
        setCmntimage(reader.result);
      };
    } else {
      Toaster.notify("Image Size Must Be Smaller Than 5MB", { type: "error" });
    }
  }
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
  function submit(e) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("title", blogtitle);
    formData.append("body", blogbody);
    formData.append("category", blogcategory);
    formData.append("image", cmntimage);
    formData.append("imgname", imageInput.current.value);
    axios
      .post("/api/blogs", formData)
      .then((res) => {
        if (res.data.success) {
          Toaster.notify(res.data.message, { type: "success" });
          router.push(`/blogs/${res.data.blog.slug}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        <label className="block mb-2 text-md font-large text-gray-900 dark:text-gray-400">
          Blog Title
        </label>
        <textarea
          onChange={(e) => setBlogtitle(e.target.value)}
          className="my-4 bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-32 w-full p-2.5 w-[100%]"
          name="body"
        ></textarea>
        <label className="block mb-2 text-md font-large text-gray-900 dark:text-gray-400">
          Select Blog Category
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-[100%]"
          onChange={(e) => {
            if (e.target.value != "") {
              setBlogcategory(e.target.value);
            }
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option
              key={`${category.id}-${category.index}`}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <label className="block mb-2 text-md font-large text-gray-900 dark:text-gray-400 my-4">
          Write Blog Content
        </label>
        <QuillNoSSRWrapper
          onChange={setBlogbody}
          modules={modules}
          formats={formats}
          theme="snow"
          className="h-[32rem] pb-10 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-2"
        />
        {/* cover image stage*/}
        <div className={`flex flex-col justify-center items-center`}>
          <label className="block mb-2 text-md font-large text-gray-900 dark:text-gray-400 my-4">
            Upload Cover Image{" "}
          </label>
          <small className="text-red-500">(Must Be Smaller than 5MB)</small>
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={() => imageInput.current.click()}
          >
            <Image
              src="/icons8-picture.svg"
              alt="logo"
              width={45}
              height={45}
              className="rounded-t-lg py-6"
            />
            <span className="sr-only">Upload image</span>
          </button>
          <input
            ref={imageInput}
            type="file"
            name="imageInput"
            onChange={convertImage}
            className="hidden"
          />
        </div>
        {cmntimage != null ? (
          <div className="mx-2 my-2 flex items-center justify-between">
            <Image
              loader={() => cmntimage}
              src={cmntimage}
              alt={`profile-image`}
              width={350}
              height={300}
              className="py-6 border border-red-400 rounded-lg m-1"
            />
            <div
              className="bg-white text-black md:p-4 sm:p-3 h-6 w-6 rounded-2xl flex justify-center items-center"
              onClick={() => {
                setCmntimage(null);
              }}
            >
              <span>x</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="grid gird-row d-flex justify-end items-cetner">
          <div>
            <Button className="h-16 " onClick={submit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      {/*log in  modal section  */}
      {isSSR === false ? (
        <>
          {" "}
          <LoginModal
            show={showLoginModal}
            page={`/events`}
            closeModal={closeModal}
            className="z-40 opacity-100"
          />
        </>
      ) : (
        <></>
      )}
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const categories = await axios
    .get("/api/blog/categories")
    .then((response) => {
      return response.data.categories;
    })
    .catch((error) => console.log(error));

  return {
    props: {
      categories: categories,
    },
  };
}
export default Create;
