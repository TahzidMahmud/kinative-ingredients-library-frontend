/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Paginate from "@/components/Paginate";
import LoginModal from "@/modals/LoginModal";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/auth";
const Blogs = ({ blogs, link_data }) => {
  useEffect(() => {
    setIsSSR(false);
  }, []);
  const [isSSR, setIsSSR] = useState(true);
  const [Blogs, setBlogs] = useState(blogs);
  const [LinkData, setLinkData] = useState(link_data);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth({ middleware: "guest" });
  const [url, setUrl] = useState(null);

  function onPageChange(blogs) {
    setBlogs(blogs);
  }

  function handleSearch(e) {
    const search = e.target.value;
    if (search.length > 3 || search.length === 0) {
      axios
        .get(`/api/blog/search?search=${search}`)
        .then((res) => {
          setBlogs(res.data.data);
          setLinkData(res.data.meta);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function closeModal() {
    setShowLoginModal(false);
  }
  function goTo(url) {
    setUrl(url);
    if (user) {
      router.push(`${url}`);
    } else {
      setShowLoginModal(true);
    }
  }
  return (
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
                <h6 className="opacity-80 text-sm md:mx-2 md:px-0 px-4 ml-3.5">
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

      <div className="md:px-20 px-6">
        <div className="py-10 bg-blue-500 flex justify-center rounded-md mb-3 relative ">
          <div className="flex absolute inset-y-0 md:right-40 right-16 items-center pl-3 pointer-events-none">
            <Image
              className="rounded-full"
              src="/icons8-search.svg"
              alt="logo"
              width={24}
              height={24}
            />
          </div>
          <input
            type="search"
            id="search"
            className="block p-2 pl-10 md:w-[75%]  text-sm text-white bg-blue-500 rounded-lg border border-white focus:white focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:placeholder-white-400 dark:text-white dark:focus:white dark:focus:border-blue-500 text-whtie"
            placeholder="Search Blogs"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex">
        <div className="my-4">
          <div className="flex justify-left md:my-4 mx-3 md:mx-0 my-3">
            <h1 className="text-xl font-bold">All Blog</h1>
          </div>
          <div className="md:pr-9">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              {Blogs?.map((blog, index) => {
                return (
                  <div
                    onClick={() => {
                      goTo(`/blogs/${blog.slug.toString()}`);
                    }}
                    className="cursor-pointer"
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
                        <div className="my-2">
                          <div className="max-h-[10.5rem] overflow-y-hidden">
                            {blog.body}
                          </div>
                          <span className="text-blue-500 text-md font-bold cursor-pointer pt-1">
                            Read More
                          </span>
                        </div>
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
                  </div>
                );
              })}
            </div>
            {isSSR === false ? (
              <Paginate
                from_page={LinkData.from}
                current_page={LinkData.current_page}
                last_page={LinkData.last_page}
                page_Links={LinkData.links}
                onPageChange={onPageChange}
              />
            ) : (
              <></>
            )}
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
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const [blogs] = await Promise.all([
    axios
      .get("/api/blogs")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
  ]);

  return {
    props: {
      blogs: blogs.data,
      link_data: blogs.meta,
    },
  };
}

export default Blogs;
