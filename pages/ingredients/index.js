/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

const Ingredients = ({ ingredients, meta_Data }) => {
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
          <title>Laravel - Ingredients</title>
        </Head>
        <div className="grid md:gird-cols-1">
          <div className="bg-white sm:rounded-lg h-48 my-8">
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

        {/* top ingredient section  */}
        <div className="flex px-2 pt-3 justify-between">
          {" "}
          <h1 className="text-xl font-bold">Top Ingredients</h1>
          <Link href="/ingredients/all-ingredients">
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-white">
              View All
            </button>
          </Link>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-1  gap-4 my-6 md:px-1 px-4 ">
          {ingredients.top_ingredient ? (
            ingredients.top_ingredient.data?.map((ingredient) => {
              return (
                <div className="bg-white ">
                  <Link href={`/ingredients/${ingredient.id.toString()}`}>
                    <div className=" rounded-md flex flex-col p-4 items-center">
                      <div className="flex justify-center items-center">
                        <Image
                          loader={() => ingredient.thumbnail}
                          src={ingredient.thumbnail}
                          alt={ingredient.name}
                          width={85}
                          height={85}
                          className="py-4"
                        />
                      </div>
                      <div
                        className="text-md font-bold text-center line-clamp-2 my-2 h-10"
                        style={{ height: "2.8rem" }}
                      >
                        {ingredient.name}
                      </div>
                      <div
                        className="text-md text-center line-clamp-2 opacity-70 h-10"
                        style={{ height: "2.8rem" }}
                      >
                        {ingredient.short_description}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        {/* new ingredients section  */}
        <div className="flex px-2 ">
          <h4 className="text-xl font-bold">New Ingredients</h4>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-1  gap-4 my-6 md:px-1 px-4">
          {ingredients.new_ingredient ? (
            ingredients.new_ingredient.data?.map((ingredient) => {
              return (
                <div className="bg-white ">
                  <Link href={`/ingredients/${ingredient.id.toString()}`}>
                    <div className=" rounded-md flex flex-col p-4 items-center">
                      <div className="flex justify-center items-center">
                        <Image
                          loader={() => ingredient.thumbnail}
                          src={ingredient.thumbnail}
                          alt={ingredient.name}
                          width={85}
                          height={85}
                          className="py-4"
                        />
                      </div>
                      <div
                        className="text-md font-bold text-center line-clamp-2 my-2 h-10"
                        style={{ height: "2.8rem" }}
                      >
                        {ingredient.name}
                      </div>
                      <div
                        className="text-md text-center line-clamp-2 opacity-70 h-10"
                        style={{ height: "2.8rem" }}
                      >
                        {ingredient.short_description}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </AppLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const ingredients = await axios
    .get("/api/top-new/ingredients", {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  const meta_Data = await axios
    .get(`/api/page-meta/ingredients`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      ingredients: ingredients,
      meta_Data,
    },
  };
}

export default Ingredients;
