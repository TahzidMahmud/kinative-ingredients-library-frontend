/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Paginate from "@/components/Paginate";

const Blogs = ({ blogs, link_data }) => {
  useEffect(() => {
    setIsSSR(false);
  }, []);
  const [isSSR, setIsSSR] = useState(true);
  const [Blogs, setBlogs] = useState(blogs);
  const [LinkData, setLinkData] = useState(link_data);

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
  return (
    <AppLayout header={<> </>}>
      <Head>
        <title>Blogs</title>
      </Head>
      {/* top part  */}
      <div className="grid gird-cols-1">
        <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
          <div className="flex justify-between">
            <div className="flex items-center h-48 pl-14">
              <div className="flex items-center">
                <div className="border-r-4 border-blue-600 h-10 px-4 flex items-center">
                  {" "}
                  <h1 className="uppercase text-3xl font-bold text-center">
                    {" "}
                    our blog
                  </h1>
                </div>
                <h6 className="opacity-80 text-sm mx-2">
                  Get Fresh Blog Posts Everyday
                </h6>
              </div>
            </div>

            <Image
              src="/ingredient_banner.jpg"
              alt="ingredient_banner"
              width={246}
              height={186}
              className="py-4"
            />
          </div>
        </div>
      </div>

      <div className="px-20">
        <div className="py-10 bg-blue-500 flex justify-center rounded-md mb-3 ">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-white dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block p-2 pl-10 w-[75%] text-sm text-white bg-blue-500 rounded-lg border border-white focus:white focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:placeholder-white-400 dark:text-white dark:focus:white dark:focus:border-blue-500 text-whtie"
            placeholder="Search Products"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex">
        <div className="my-4">
          <div className="flex justify-left md:my-4 sm:my-3">
            <h1 className="text-xl font-bold">All Blog</h1>
          </div>
          <div className="md:pr-9">
            <div className="grid grid-cols-3 gap-4">
              {Blogs?.map((blog, index) => {
                return (
                  <div key={blog.id}>
                    <Link href={`/blogs/${blog.slug.toString()}`}>
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
                                width={25}
                                height={25}
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
                                width={15}
                                height={13}
                                className=""
                              />
                              <span className="opacity-60 text-sm mx-2">
                                {blog.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
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
