import axios from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/components/Layouts/AppLayout";
import HtmlFormat from "@/components/HtmlFormat";
import CommentForm from "@/components/comment/CommentForm";
import Comment from "@/components/comment/Comment";
import LoginModal from "@/modals/LoginModal";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Toaster from "@/components/Toaster";

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

const Blog = ({ blog, trendingBlogs }) => {
  const { user } = useAuth({ middleware: "guest" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [likeable, setLikeable] = useState(true);
  const [canlikeComment, setCanlikeComment] = useState(true);
  const [likes, setLikes] = useState(blog.likes);
  const [comments, setComments] = useState(blog.comments.data);
  const [isSSR, setIsSSR] = useState(true);
  const [url, setUrl] = useState(`http://glowscam.com/blogs/${blog.slug}`);

  useEffect(() => {
    setIsSSR(false);
    if (user) {
      canLike();
    }
  }, [user]);
  function canLike() {
    if (typeof user !== "undefined") {
      setCanlikeComment(true);
    } else {
      setCanlikeComment(false);
    }
    if (user) {
      axios
        .post("/api/blog/likeable", {
          blog_id: blog.id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            setLikeable(true);
          } else {
            setLikeable(false);
          }
        });
    } else {
      setLikeable(true);
    }
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
  function addComment(comment) {
    setComments([...comments, comment]);
  }
  function removeComment(comment) {
    let ncomments = comments.filter((item) => item.id !== comment);
    setComments(ncomments);
  }
  return (
    <AppLayout header={<> </>}>
      <Head>
        <title>Blogs</title>
      </Head>

      <div className={`flex my-6 grid grid-cols-1 md:grid-cols-3 gap-4`}>
        <div className="md:col-span-2  my-4 mx-3 md:mx-0">
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
                <div className="flex  justify-end mr-6">
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
            <div className="flex justify-between items-center my-2">
              <div className="flex mr-auto">
                <span className="text-lg font-semibold">Share This Blog</span>
              </div>
              <div className="flex gap-2 ml-auto">
                <FacebookShareButton
                  url={`${url}`}
                  quote={"glowscam blogs"}
                  hashtag={`#${blog.category}`}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={`${url}`} title={"glowscam blogs"}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <PinterestShareButton url={`${url}`} media={"glowscam blogs"}>
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
                <LinkedinShareButton url={`${url}`}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <div
                  className="h-32 w-32 bg-white shadow-md rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(`${url}`);
                    // var copyText = document.getElementById("share-link").value;
                    // console.log(copyText);
                    // copyText.select();
                    // copyText.setSelectionRange(0, 99999);
                    // document.execCommand("cut");
                    Toaster.notify("Link Coppied To ClipBoard..!", {
                      type: "success",
                    });
                  }}
                >
                  <input
                    type="text"
                    className="hidden"
                    id="share-link"
                    value={`${url}`}
                  ></input>
                  <div className="flex justify-center items-center">
                    <Image
                      src="/share.svg"
                      alt="collection"
                      width={20}
                      height={20}
                      className="py-4"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-left py-6">{blog.title}</h1>
            <HtmlFormat data={blog.body} />
          </div>
          {/* comment form  */}
          <CommentForm
            url={`api/comments/store`}
            model={blog}
            parent_id={null}
            modelName={`blog`}
            user={user}
            handleClick={setShowLoginModal}
            addComment={addComment}
          />

          {/* comments  */}
          <div
            className={`d-flex  ${comments.length > 0 ? "my-6" : ""} bg-white`}
          >
            {comments.map((comment, index) => (
              <Comment
                key={index}
                user={user}
                model={blog}
                modelName={`blog`}
                comment={comment}
                canlikeComment={canlikeComment}
                setShowLoginModal={setShowLoginModal}
                removeComment={removeComment}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-1  mx-3 md:mx-0">
          <div className="flex justify-left md:my-4 my-3">
            <h1 className="text-xl font-bold">Trending Posts</h1>
          </div>
          <div className="md:border-l  md:pl-7">
            {trendingBlogs?.map((blog, index) => {
              return (
                <Link key={index} href={`/blogs/${blog.slug.toString()}`}>
                  <div>
                    <div className="  rounded-lg dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-col justify-start items-baseline">
                        <div className="z-0">
                          <Image
                            loader={() => blog.image}
                            src={blog.image}
                            alt={blog.title}
                            width={1040}
                            height={530}
                            className="py-4"
                          />
                        </div>
                        <div className=" bg-black text-black px-3 py-2 md:-mt-14 md:mb-2  flex justify-center align-center md:ml-4  z-10 rounded">
                          <h2 className="text-md font-semibold text-white uppercase text-center rounded-md">
                            {blog.category}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="h-10 mt-2">
                      <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {blog.title}
                      </p>
                    </div>
                    <div className="md:py-5 md:pb-3sm:py-2  flex flex-col justify-start border-b ">
                      <h6 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                        Posted On:
                        <span className=" mx-2 opacity-60">
                          {blog.created_at}
                        </span>
                      </h6>
                    </div>
                    <div className="mb-3 mt-1">
                      <div className="flex text-black py-2">
                        <div className="flex items-center">
                          {/* avatar image  */}
                          <Image
                            src="/avatar.PNG"
                            alt={blog.title}
                            width={25}
                            height={25}
                            className="py-4"
                          />
                          <span className="opacity-60 text-sm mx-2">
                            {blog.autor.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {/* avatar image  */}
                          <div>
                            <Image
                              src="/comment.png"
                              alt={blog.title}
                              width={15}
                              height={15}
                              className="py-4"
                            />
                          </div>
                          <span className="opacity-60 text-sm mx-2">
                            {blog.comments}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {/* avatar image  */}
                          <div>
                            <Image
                              src="/love_icon.png"
                              alt={blog.title}
                              width={15}
                              height={15}
                              className=""
                            />
                          </div>
                          <span className="opacity-60 text-sm mx-2">
                            {blog.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
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
export async function getServerSideProps(context) {
  const { params } = context;
  const slug = params.slug;
  const blog = await axios
    .get(`/api/blogs/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  const [blogs] = await Promise.all([
    axios
      .get("/api/trending-new-blogs", {
        type: "trending",
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
  ]);
  return {
    props: {
      blog: blog,
      trendingBlogs: blogs.trending_blogs.data,
    },
  };
}

export default Blog;
