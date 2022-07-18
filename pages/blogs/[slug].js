import axios from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/components/Layouts/AppLayout";
import HtmlFormat from "@/components/HtmlFormat";
import LoginModal from "@/modals/LoginModal";
import { useState, useEffect } from "react";
import Head from "next/head";

const Blog = ({ blog }) => {
  const { user } = useAuth({ middleware: "guest" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [likeable, setLikeable] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [isSSR, setIsSSR] = useState(true);
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
            <div className="mx-2">
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
            <h1 className="text-3xl font-bold text-left py-6">{blog.title}</h1>
            <HtmlFormat data={blog.body} />
          </div>
        </div>
        <div className="md:min-w-[30%] sm:min-w-[100%] "></div>
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
