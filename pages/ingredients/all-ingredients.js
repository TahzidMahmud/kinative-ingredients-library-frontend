/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/Ingredients/Search";
import { useEffect, useState } from "react";
import Paginate from "@/components/Paginate";

const Ingredients = ({ ingredients, link_data }) => {
  useEffect(() => {
    setIsSSR(false);
  }, []);
  const [isSSR, setIsSSR] = useState(true);
  const [Ingredients, setIngredients] = useState(ingredients);
  const [LinkData, setLinkData] = useState(link_data);

  function onSearch(ingredients) {
    console.log(ingredients);
    setIngredients(ingredients);
  }
  function onPageChange(ingredients) {
    setIngredients(ingredients);
  }
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
      <div className="grid md:gird-cols-1">
        <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
          <div className="grid grid-cols-2">
            <div className="flex items-center h-48 md:pl-14 pl-1.5">
              <div className="flex md:flex-row flex-col items-center">
                <div className="md:border-r-4 border-blue-600 h-10 md:px-4 px-0 flex items-center">
                  {" "}
                  <h1 className="uppercase md:text-3xl text-2xl font-bold text-center">
                    {" "}
                    ingredients
                  </h1>
                </div>
                <h6 className="opacity-80 text-sm md:mx-2 md:px-0 px-3">
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
      {/* search section  */}
      <Search onSearch={onSearch} />
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
      <div className="grid  md:grid-cols-6 grid-cols-2 gap-4 my-4 md:px-1 px-3">
        {Ingredients?.map((ingredient) => {
          return (
            <Link href={`/ingredients/${ingredient.id.toString()}`}>
              <div className="py-8 flex h-[18rem]  inline-flex bg-white ">
                <div className=" mx-auto   shadow-sm sm:rounded-lg">
                  <div className="overflow-hidden flex flex-col justify-center items-center p-4">
                    <Image
                      loader={() => ingredient.thumbnail}
                      src={ingredient.thumbnail}
                      alt={ingredient.name}
                      width={85}
                      height={85}
                      className="py-4"
                    />
                    <div className=" text-center pt-4  line-clamp-2">
                      <h6 className="text-md font-semibold">
                        {ingredient.name}
                      </h6>
                    </div>
                    <div className="truncate md:px-4 pt-1 line-clamp-2 opacity-80">
                      {ingredient.short_description}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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
      return response.data;
    })
    .catch((error) => console.log(error));
  // console.log(ingredients)
  return {
    props: {
      ingredients: ingredients.data,
      link_data: ingredients.meta,
    },
  };
}

export default Ingredients;
