/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

const ingredients = ({ ingredients }) => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Ingredients
        </h2>
      }
    >
      <Head>
        <title>Laravel - Ingredients</title>
      </Head>
      {/* main banner section  */}
      <div className="grid gird-cols-1">
        <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
          <div className="flex justify-between">
            <div className="flex items-center h-48 pl-14">
              <div className="flex items-center">
                <div className="border-r-4 border-blue-600 h-10 px-4 flex items-center">
                  {" "}
                  <h1 className="uppercase text-3xl font-bold text-center">
                    {" "}
                    ingredients
                  </h1>
                </div>
                <h6 className="opacity-80 text-sm mx-2">
                  Get Fresh Blog Posts Everyday
                </h6>
              </div>
            </div>
            <div>
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
      </div>

      <div className="grid gird-cols-1 relative -mt-20">
        <div className="flex justify-center items-center">
          <div className="px-16 py-10 w-[55%] bg-white rounded-lg border h-44 shadow-md bg-blue-500">
            <div className="pb-4">
              <h6 className="text-xl font-semibold text-white text-center ">
                Search Ingredients
              </h6>
            </div>
            <div className="relative min-w-full">
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
                className="block p-4 px-6 pl-10 w-full text-sm text-white tex-sm bg-blue-500 rounded-lg border border-white focus:ring-blue-500 focus:white dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Ingredients"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-12"></div>
      {/* All  ingredient section  */}
      <div className="flex px-2 pt-3 justify-between ">
        {" "}
        <h1 className="text-xl font-bold">All Ingredients</h1>
        {/* <Link href="/ingredients/all-ingredients">
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white">
            View All
          </button>
        </Link> */}
      </div>
      <div className="grid  grid-cols-6">
        {ingredients?.map((ingredient) => {
          return (
            <Link href={`/ingredients/${ingredient.id.toString()}`}>
              <div className="py-8 flex h-[20rem]  inline-flex ">
                <div className="w-11/12  mx-auto  bg-white shadow-sm sm:rounded-lg">
                  <div className="overflow-hidden flex flex-col justify-center items-center p-4">
                    <Image
                      loader={() => ingredient.thumbnail}
                      src={ingredient.thumbnail}
                      alt={ingredient.name}
                      width={85}
                      height={85}
                      className="py-4"
                    />
                    <div className=" text-center pt-4 h-16">
                      <h6 className="text-md font-semibold">
                        {ingredient.name}
                      </h6>
                    </div>
                    <div className="truncate px-4 pt-1 h-6 opacity-80">
                      {ingredient.short_description}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
};
export async function getServerSideProps(context) {
  const ingredients = await axios
    .get("/api/ingredients", {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  // console.log(ingredients)
  return {
    props: {
      ingredients: ingredients,
    },
  };
}

export default ingredients;
