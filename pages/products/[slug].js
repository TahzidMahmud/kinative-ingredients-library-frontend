import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import Image from "next/image";
import RatingStar from "@/components/RatingStar";
import Ingredient from "@/components/Ingredients/Ingredient";
import LoginModal from "@/modals/LoginModal";
import { useState, useEffect, useRef, createRef } from "react";

const Product = ({ product }) => {
  const reviews = useRef();
  const ingredients = useRef();

  const { user } = useAuth({ middleware: "guest" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [likeable, setLikeable] = useState(false);
  const [likes, setLikes] = useState(product.likes);
  const [activetab, setActiveTab] = useState("reviews");
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
    canLike();
  }, []);
  function canLike() {
    if (user) {
      axios
        .post("/api/product/likeable", {
          product_id: product.id,
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
          .post("api/product/like", {
            product_id: product.id,
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
          .post("api/product/unlike", {
            product_id: product.id,
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
  function setTab(name) {
    if (name === "reviews") {
      reviews.current.classList.remove("hidden");
      ingredients.current.classList.add("hidden");
    } else {
      ingredients.current.classList.remove("hidden");
      reviews.current.classList.add("hidden");
    }
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {product.slug}
        </h2>
      }
    >
      <Head>
        <title>Laravel </title>
      </Head>
      <div className="flex py-7">
        {/* left side  */}
        <div className="min-w-[30%]">
          <div className="p-6 mx-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
            <Image
              loader={() => product.images[0]}
              src={product.images[0]}
              alt={product.name}
              width={350}
              height={420}
              className="py-4"
            />
          </div>
        </div>
        {/* right side  */}
        <div className="min-w-[70%]">
          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
            <div className="flex flex-col justify-left px-6 py-4 min-h-20 min-w-full">
              <div className="flex justify-between min-w-full border-b pb-4 mb-3">
                <div>
                  <h1 className="text-2xl font-semibold text-center">
                    {product.name}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <div className="flex mr-4">
                    <div className="mx-2">
                      <Image
                        src="/collection_icon.png"
                        alt="collection"
                        width={20}
                        height={20}
                        className="py-4"
                      />
                    </div>
                    <div className="text-sm opacity-80 mb-4">
                      Save to collection
                    </div>
                  </div>
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
              <div className="flex justify-between">
                <div>
                  <h1 className="text-md font-semibold text-left mb-2">
                    Short Description
                  </h1>
                  <div className="text-sm opacity-80 mb-4">
                    {product.short_details}
                  </div>
                </div>
                <div className="flex items-center">
                  <RatingStar
                    rating={Array.from(Array(product.rating).keys())}
                    starHeight={20}
                    starWidth={20}
                  />{" "}
                  <span className="ml-2"> {product.rating}</span>
                  <span className="ml-2 opacity-60">(2.1K)</span>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left ">Brand</h1>
                </div>
                <div className="text-sm opacity-80 ">{product.brand}</div>
              </div>
              <div className="flex mb-4">
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left ">Category</h1>
                </div>
                <div className="text-sm opacity-60 ">{product.category}</div>
              </div>
            </div>
          </div>
          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div className="px-6 min-h-20">
              <h1 className="text-md font-semibold text-left mb-2">
                Description
              </h1>
              <div className="text-sm opacity-80 mb-4">{product.details}</div>
            </div>
          </div>
        </div>

        {/* modal section  */}
        {isSSR === false ? (
          <LoginModal
            show={showLoginModal}
            page={`products`}
            closeModal={closeModal}
            className="z-40 opacity-100"
          />
        ) : (
          <></>
        )}
      </div>
      {/* tab section  */}
      <div className="p-6 mx-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg text-lg font-bold ${
                  activetab === "reviews"
                    ? "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                    : " opacity-60"
                }`}
                id="reviews-tab"
                data-tabs-target="#reviews"
                type="button"
                role="tab"
                aria-controls="reviews"
                aria-selected="true"
                onClick={() => {
                  setActiveTab("reviews");
                  setTab("reviews");
                }}
              >
                Reviews
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg border-b-2 dark:hover:text-gray-300 text-lg font-bold ${
                  activetab === "ingredients"
                    ? "border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500 "
                    : " opacity-60"
                } `}
                id="ingredients-tab"
                data-tabs-target="#ingredients"
                type="button"
                role="tab"
                aria-controls="ingredients"
                aria-selected="false"
                onClick={() => {
                  setTab("ingredients");
                  setActiveTab("ingredients");
                }}
              >
                Ingredients
              </button>
            </li>
          </ul>
        </div>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <div id="myTabContent">
            <div
              className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
              id="reviews"
              ref={reviews}
              role="tabpanel"
              aria-labelledby="reviews-tab"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  reviews tab`s associated content
                </strong>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classNamees to control
                the content visibility and styling.
              </p>
            </div>
            <div
              className="hidden p-2  rounded-lg "
              id="ingredients"
              ref={ingredients}
              role="tabpanel"
              aria-labelledby="ingredients-tab"
            >
              {product.ingredients.data.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  ingredient={ingredient}
                  className="-py-6"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const product = await axios
    .get(`/api/products/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await axios
    .get("/api/product/slugs")
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

export default Product;
