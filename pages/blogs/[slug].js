import axios from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/components/Layouts/AppLayout";
import HtmlFormat from "@/components/HtmlFormat";
import LoginModal from "@/modals/LoginModal";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import InputEmoji from "react-input-emoji";
const Blog = ({ blog }) => {
  const { user } = useAuth({ middleware: "guest" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [likeable, setLikeable] = useState(false);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(blog.likes);
  const [isSSR, setIsSSR] = useState(true);
  const imageInput = useRef(null);
  const [cmntimage, setCmntimage] = useState(null);
  useEffect(() => {
    setIsSSR(false);
    canLike();
  }, []);
  function canLike() {
    if (user) {
      axios
        .post("/api/blog/likeable", {
          blog_id: blog.id,
          user_id: user.id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setLikeable(true);
          } else {
            setLikeable(false);
          }
        });
    }
    setLikeable(true);
  }
  function handleClick(e) {
    if (user) {
      setShowLoginModal(false);
      if (likeable) {
        axios
          .post("api/blog/like", {
            blog_id: blog.id,
            user_id: user.id,
          })
          .then((res) => {
            if (res.data.success) {
              setLikeable(false);
            } else {
              setLikeable(true);
            }
            setLikes(res.data.likes);
          })
          .catch((error) => {
            // if (error.response.status !== 422) throw error;
            // setErrors(Object.values(error.response.data.errors).flat());
          });
      } else {
        axios
          .post("api/blog/unlike", {
            blog_id: blog.id,
            user_id: user.id,
          })
          .then((res) => {
            if (res.data.success) {
              setLikeable(true);
            } else {
              setLikeable(false);
            }
            setLikes(res.data.likes);
          })
          .catch((error) => {
            // if (error.response.status !== 422) throw error;
            // setErrors(Object.values(error.response.data.errors).flat());
          });
      }
    } else {
      setShowLoginModal(true);
    }
  }
  function closeModal() {
    setShowLoginModal(false);
  }
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);
    reader.onloadend = function (e) {
      setCmntimage(reader.result);
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    formData.append("blog_id", blog.id);
    formData.append("user_id", user.id);
    formData.append("body", comment);
    axios
      .post("api/comments/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          setComment("");
          setCmntimage(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <AppLayout header={<> </>}>
      <Head>
        <title>Blogs</title>
      </Head>

      <div className="flex">
        <div className="md:min-w-[70%] sm:min-w-[100%] my-4">
          <div className=" rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <Image
              loader={() => blog.image}
              src={blog.image}
              alt={blog.title}
              width={1040}
              height={530}
              className="py-6"
            />
            <div className="mx-2 my-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {/* avatar image  */}
                  <Image
                    src="/avatar.PNG"
                    alt={blog.title}
                    width={40}
                    height={40}
                    className="py-4"
                  />
                  <div className="flex flex-col">
                    <span className="opacity-100 font-semibold text-sm mx-2">
                      {blog.autor.name}
                    </span>
                    <span className="opacity-60 text-sm mx-2">
                      {blog.created_at}
                    </span>
                  </div>
                </div>
                <div className="flex  justify-end">
                  <div className="flex">
                    <div className="mx-2">
                      <Image
                        src="/love_icon.png"
                        alt="collection"
                        width={20}
                        height={20}
                        className="py-4"
                      />
                    </div>
                    {likeable == true ? (
                      <div
                        className="text-sm mr-2 opacity-80 mb-4"
                        onClick={handleClick}
                      >
                        Like It
                      </div>
                    ) : (
                      <div
                        className="text-sm text-red-600 mr-2 opacity-100 mb-4"
                        onClick={handleClick}
                      >
                        Unlike
                      </div>
                    )}
                    <span className="text-sm opacity-60">({likes})</span>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-left py-6">{blog.title}</h1>
            <HtmlFormat data={blog.body} />
          </div>
        </div>
        <div className="md:min-w-[30%] sm:min-w-[100%] "></div>
      </div>
      <div className="my-4 w-3/4 ">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 ">
            <InputEmoji
              value={comment}
              onChange={setComment}
              cleanOnEnter
              borderRadius={0}
              placeholder="Type a comment..."
            />
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              htmlFor="imageInput"
              onClick={() => imageInput.current.click()}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Upload image</span>
            </button>
            <input
              ref={imageInput}
              type="file"
              name="imageInput"
              multiple="true"
              onChange={convertImage}
              className="hidden"
            />
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
        {cmntimage != null ? (
          <div className="mx-2 my-2 flex items-center justify-between">
            <Image
              loader={() => cmntimage}
              src={cmntimage}
              alt={blog.title}
              width={150}
              height={150}
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
      </div>

      {/* modal section  */}
      {isSSR === false ? (
        <LoginModal
          show={showLoginModal}
          page={`blogs`}
          closeModal={closeModal}
          className="z-40 opacity-100"
        />
      ) : (
        <></>
      )}
    </AppLayout>
  );
};
export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const blog = await axios
    .get(`/api/blogs/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      blog: blog,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await axios
    .get("/api/blog/slugs")
    .then((response) => {
      return response.data.slugs;
    })
    .catch((error) => console.log(error));

  const paths = slugs.map((slug) => ({ params: { slug: slug.toString() } }));
  return {
    paths,
    fallback: false,
  };
}

export default Blog;
