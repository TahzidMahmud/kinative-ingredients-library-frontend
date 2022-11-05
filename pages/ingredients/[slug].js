import AppLayout from "@/components/Layouts/AppLayout";
import RatingStar from "@/components/RatingStar";
import Head from "next/head";
import path from "path";
import axios from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import HtmlFormat from "@/components/HtmlFormat";

const Ingredient = ({ ingredient }) => {
  const [categories, setCategories] = useState(ingredient.categories);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  function openModal(id) {
    let scat = categories.filter((cat) => cat.id == id);
    setSelected(scat[0]);

    setTimeout(() => {
      setSelected(scat[0]);
      setShow(true);
    }, 300);
  }
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {ingredient.slug}
        </h2>
      }
    >
      <Head>
        <title>Laravel </title>
      </Head>
      <div className="flex py-7 grid grid-cols-4 gap-5">
        {/* left side  */}
        <div className="md:col-span-1 col-span-4">
          <div className="p-6 mx-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
            {ingredient.images.length > 0 ? (
              <Image
                loader={() => ingredient.images[0]}
                src={ingredient.images[0]}
                alt={ingredient.name}
                width={350}
                height={420}
                className="py-4"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* right side  */}
        <div className="md:col-span-3 col-span-4 px-3 md:px-0">
          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center min-w-full">
            <div className="flex flex-col justify-left px-6 py-4 min-h-20 min-w-full">
              <div className="flex justify-between min-w-full border-b pb-4 mb-3">
                <div>
                  <h1 className="text-2xl font-semibold text-center">
                    {ingredient.name}
                  </h1>
                </div>
                <div className="flex items-center">
                  <RatingStar
                    rating={Array.from(Array(ingredient.rating).keys())}
                    starHeight={20}
                    starWidth={20}
                  />{" "}
                  <span className="ml-2"> {ingredient.rating}</span>
                </div>
              </div>
              <h1 className="text-md font-semibold text-left mb-2">
                Short Description
              </h1>
              <div className="text-sm opacity-80 mb-4">
                {ingredient.short_description}
              </div>
              <div className="flex mb-4">
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left mr-2">
                    What It Does
                  </h1>
                </div>
                <div className="text-sm opacity-80 ">
                  {ingredient.long_functional_description}
                </div>
              </div>
              <div
                className={`flex mb-4  ${
                  ingredient.alias_name ? "" : "hidden"
                } `}
              >
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left mr-2">
                    Also Called
                  </h1>
                </div>
                <div className="text-sm opacity-80 ">
                  {ingredient.alias_name}
                </div>
              </div>
              <div
                className={`flex mb-4 ${ingredient.quality ? "" : "hidden"}`}
              >
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left mr-2">
                    Ingredients কেমন?
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm opacity-80 ">
                    {ingredient.quality}
                  </div>
                </div>
              </div>
              <div
                className={`flex mb-4 ${
                  ingredient.attributes.length > 0 ? "" : "hidden"
                }`}
              >
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left mr-2">
                    Attributes
                  </h1>
                </div>
                <div className="flex flex-col">
                  {ingredient.attributes.map((attr, index) => (
                    <div key={`${index}-attr`} className="text-sm opacity-80 ">
                      {attr.key} : {attr.value}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`flex mb-4 ${categories.length > 0 ? "" : "hidden"}`}
              >
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left mr-2">
                    Categories
                  </h1>
                </div>
                <div className="flex items-center">
                  {categories.map((cat, index) => (
                    <div
                      key={`${index}-cat`}
                      className="text-sm opacity-80 cursor-pointer hover:text-blue-500"
                      onClick={() => {
                        openModal(cat.id);
                      }}
                    >
                      {" "}
                      {cat.name} ,
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div className="px-6 min-h-20">
              <h1 className="text-md font-semibold text-left mb-2">
                Description
              </h1>
              <div className="text-sm opacity-80 mb-4">
                <HtmlFormat data={ingredient.details} />
              </div>
            </div>
          </div>

          <div
            className={`p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center ${
              ingredient.source_list.length > 0 ? "" : "hidden"
            }`}
          >
            <div className="px-6 min-h-20  flex-column justify-left">
              <h1 className="text-md font-semibold text-left mb-2">
                Refrences
              </h1>
              <div className="text-sm opacity-80 mb-4 flex justify-left">
                <ul className="list-disc list-inside">
                  {ingredient.source_list.map((reference, index) => (
                    <li className="mb-2" key={index}>
                      {reference}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            show ? "active" : "hidden"
          }  bg-black w-screen h-screen opacity-90 absolute top-0 left-0 z-10`}
        ></div>

        <div
          id="authentication-modal"
          tabIndex="-1"
          className={`${
            show ? "active" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  md:inset-0 h-modal md:h-full flex justify-center items-center `}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative p-4 w-full min-w-[75%] h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
                onClick={() => {
                  setShow(false);
                }}
              >
                <Image
                  className="rounded-full"
                  src="/icons8-close.svg"
                  alt="logo"
                  width={12}
                  height={12}
                />
                <span className="sr-only">Close modal</span>
              </button>

              <div className="py-6 px-6 lg:px-8 lg:py-8 max-w-full">
                <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-medium text-blue-500 ">
                    {selected?.name}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="medium-modal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <h3 className="mb-4 text-md px-6 font-medium text-gray-900 mt-3 opacity-80 ">
                  {selected?.description}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const slug = params.slug;
  const ingredient = await axios
    .get(`/api/ingredients/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      ingredient: ingredient,
    },
  };
}

// export async function getStaticPaths() {
//   const ids = await axios
//     .get("/api/ingredient/ids")
//     .then((response) => {
//       return response.data.ids;
//     })
//     .catch((error) => console.log(error));

//   const paths = ids.map((id) => ({ params: { slug: id.toString() } }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

export default Ingredient;
