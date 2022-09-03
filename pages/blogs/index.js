/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/auth";
import LoginModal from "@/modals/LoginModal";

const Blogs = ({ newBlogs, trendingBlogs, meta_Data }) => {
  const router = useRouter();
  const { user } = useAuth({ middleware: "guest" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSSR, setIsSSR] = useState(true);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  function goTo(url) {
    setUrl(url);
    if (user) {
      router.push(`${url}`);
    } else {
      setShowLoginModal(true);
    }
  }
  function closeModal() {
    setShowLoginModal(false);
  }
  return (
    <>
      <Head>
        <title>{`${meta_Data.title}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta itemProp="name" content={`${meta_Data.meta_title}`}></meta>
        <meta
          itemProp="description"
          content={`${meta_Data.meta_description}`}
        ></meta>
        <meta itemProp="image" content={`${meta_Data.meta_image}`}></meta>
      </Head>
      <AppLayout header={<> </>}>
        <Head>
          <title>Blogs</title>
        </Head>
        {/* top part  */}
        <div className="grid md:gird-cols-1">
          <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
            <div className="grid grid-cols-2">
              <div className="flex items-center h-48 md:pl-14 pl-1.5">
                <div className="flex md:flex-row flex-col items-center">
                  <div className="md:border-r-4 border-blue-600 h-10 md:px-4 px-0 flex items-center">
                    {" "}
                    <h1 className="uppercase md:text-3xl text-2xl font-bold text-center">
                      {" "}
                      our blog
                    </h1>
                  </div>
                  <h6 className="opacity-80 text-sm md:mx-2 md:px-0 px-4 ml-2">
                    Get Fresh Blog Posts Everyday
                  </h6>
                </div>
              </div>
              <div className="h-full w-full flex justify-end ">
                <Image
                  src="/ingredient_banner.jpg"
                  alt="ingredient_banner"
                  width={246}
                  height={186}
                  className="py-4 "
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex grid md:grid-cols-3 grid-cols-1">
          <div className="md:min-w-[70%] min-w-[100%] my-4 md:col-span-2">
            <div className="flex justify-left md:my-4 my-5">
              <h1 className="text-xl font-bold px-3 md:p-0">
                New From the Blog
              </h1>
            </div>
            <div className="md:pr-9">
              <div className="grid grid-cols-1 gap-4 md:mb-4 sm:mb-3">
                {
                  <div
                    onClick={() => {
                      goTo(`/blogs/${newBlogs[0].slug.toString()}`);
                    }}
                  >
                    <div className=" p-3 md:p-0  rounded-lg dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-col justify-start items-baseline">
                        <div className="z-0">
                          <Image
                            loader={() => newBlogs[0].full_image}
                            src={newBlogs[0].full_image}
                            alt={newBlogs[0].title}
                            width={1040}
                            height={530}
                            className="py-4"
                          />
                        </div>
                        <div className=" bg-black text-black px-3 py-2 md:-mt-16 md:mb-2  flex justify-center align-center md:ml-4  z-10 rounded">
                          <h2 className="text-md font-semibold text-white uppercase text-center rounded-md">
                            {newBlogs[0].category}
                          </h2>
                        </div>
                      </div>
                      <div className="h-10 mt-3">
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                          {newBlogs[0].title}
                        </p>
                      </div>
                      <div className="md:py-5 md:pb-3 sm:py-2  flex flex-col justify-start border-b ">
                        <h6 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                          Posted On:
                          <span className=" mx-2 opacity-60">
                            {newBlogs[0].created_at}
                          </span>
                        </h6>
                        <p className="my-2">
                          {newBlogs[0].body}...{" "}
                          <span className="text-blue-500 text-md font-bold cursor-pointer">
                            Read More
                          </span>
                        </p>
                      </div>
                      <div className="mb-3 mt-1">
                        <div className="flex text-black py-2">
                          <div className="flex">
                            {/* avatar image  */}
                            <Image
                              src="/avatar.PNG"
                              alt={newBlogs[0].title}
                              width={25}
                              height={25}
                              className="py-4"
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {newBlogs[0].autor.name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            {/* avatar image  */}
                            <Image
                              src="/comment.png"
                              alt={newBlogs[0].title}
                              width={20}
                              height={20}
                              className="py-1"
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {newBlogs[0].comments}
                            </span>
                          </div>
                          <div className="flex">
                            {/* avatar image  */}
                            <Image
                              src="/love_icon.png"
                              alt={newBlogs[0].title}
                              width={20}
                              height={10}
                              className=""
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {newBlogs[0].likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {newBlogs.map((blog, index) => {
                  if (index === 0) {
                    <></>;
                  } else {
                    return (
                      <div
                        onClick={() => {
                          goTo(`/blogs/${blog.slug.toString()}`);
                        }}
                      >
                        <div className="p-3 md:p-0">
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
                            <p className="my-2">
                              {blog.body}...{" "}
                              <span className="text-blue-500 text-md font-bold cursor-pointer">
                                Read More
                              </span>
                            </p>
                          </div>
                          <div className="mb-3 mt-1">
                            <div className="flex text-black py-2">
                              <div className="flex">
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
                              <div className="flex">
                                {/* avatar image  */}
                                <Image
                                  src="/comment.png"
                                  alt={blog.title}
                                  width={20}
                                  height={20}
                                  className="py-4"
                                />
                                <span className="opacity-60 text-sm mx-2">
                                  {blog.comments}
                                </span>
                              </div>
                              <div className="flex">
                                {/* avatar image  */}
                                <Image
                                  src="/love_icon.png"
                                  alt={blog.title}
                                  width={20}
                                  height={10}
                                  className=""
                                />
                                <span className="opacity-60 text-sm mx-2">
                                  {blog.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex justify-center items-center md:my-10 my-5">
              <Link href={`/blogs/all-blogs`}>
                <button className="bg-blue-600 px-4 py-2 rounded-md text-white">
                  View All
                </button>
              </Link>
            </div>
          </div>
          <div className="md:min-w-[30%] min-w-[100%] md:col-span-1">
            <div className="flex justify-left md:my-4 my-5">
              <h1 className="text-xl font-bold px-3 md:p-0">Trending Posts</h1>
            </div>
            <div className="md:border-l md:pl-7">
              {trendingBlogs?.map((blog, index) => {
                return (
                  <div
                    onClick={() => {
                      goTo(`/blogs/${blog.slug.toString()}`);
                    }}
                  >
                    <div className="p-3 md:p-0">
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
                        <p className="my-2">
                          {blog.body}...{" "}
                          <span className="text-blue-500 text-md font-bold cursor-pointer">
                            Read More
                          </span>
                        </p>
                      </div>
                      <div className="mb-3 mt-1">
                        <div className="flex text-black py-2">
                          <div className="flex">
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
                          <div className="flex">
                            {/* avatar image  */}
                            <Image
                              src="/comment.PNG"
                              alt={blog.title}
                              width={20}
                              height={15}
                              className="py-4"
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {blog.comments}
                            </span>
                          </div>
                          <div className="flex">
                            {/* avatar image  */}
                            <Image
                              src="/love_icon.png"
                              alt={blog.title}
                              width={20}
                              height={10}
                              className=""
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {blog.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
            url={url}
            className="z-40 opacity-100"
          />
        ) : (
          <></>
        )}
      </AppLayout>
    </>
  );
};
export async function getServerSideProps(context) {
  const [blogs, meta_Data] = await Promise.all([
    axios
      .get("/api/trending-new-blogs")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
    // fetch meta data
    axios
      .get(`/api/page-meta/blogs`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),
  ]);
  //   console.log(blogs.new_blogs.data);
  return {
    props: {
      newBlogs: blogs.new_blogs.data,
      trendingBlogs: blogs.trending_blogs.data,
      meta_Data,
    },
  };
}

export default Blogs;
