import AppLayout from "@/components/Layouts/AppLayout";
import RatingStar from "@/components/RatingStar";
import Head from "next/head";
import path from "path";
import axios from "@/lib/axios";
import Image from "next/image";
import { useEffect } from "react";

const Ingredient = ({ ingredient }) => {
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
            <Image
              loader={() => ingredient.images[0]}
              src={ingredient.images[0]}
              alt={ingredient.name}
              width={350}
              height={420}
              className="py-4"
            />
          </div>
        </div>
        {/* right side  */}
        <div className="md:col-span-3 col-span-4 px-3 md:px-0">
          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
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
                  <h1 className="text-md font-semibold text-left ">
                    What It Does
                  </h1>
                </div>
                <div className="text-sm opacity-80 ">
                  {ingredient.long_functional_description}
                </div>
              </div>
              <div className="flex mb-4">
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left ">
                    Also Called
                  </h1>
                </div>
                <div className="text-sm opacity-80 ">
                  {ingredient.alias_name}
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
                {ingredient.details}
              </div>
            </div>
          </div>

          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center ">
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
      </div>
    </AppLayout>
  );
};

export async function getStaticProps(context) {
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

export async function getStaticPaths() {
  const ids = await axios
    .get("/api/ingredient/ids")
    .then((response) => {
      return response.data.ids;
    })
    .catch((error) => console.log(error));

  const paths = ids.map((id) => ({ params: { slug: id.toString() } }));
  return {
    paths,
    fallback: false,
  };
}

export default Ingredient;
