/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";

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
      <div className="flex px-2 pt-3 justify-between">
        {" "}
        <h4>New Ingredients</h4>
        <Link href="/ingredients/all-ingredients">
          <button className="bg-blue-500 px-4 py-2 rounded-lg text-white">
            View All
          </button>
        </Link>
      </div>
      <div className="grid  grid-cols-6">
        {ingredients.new_ingredient.data?.map((ingredient) => {
          return (
            <Link href={`/ingredients/${ingredient.id.toString()}`}>
              <div className="py-12 flex h-[20rem]  inline-flex ">
                <div className="w-11/12  mx-auto  bg-white shadow-sm sm:rounded-lg">
                  <div className="overflow-hidden ">
                    <div className="p-6 text-center ">{ingredient.name}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <hr></hr>
      <div className="flex px-2 pt-3">
        <h4>Top Ingredients</h4>
      </div>
      <div className="grid  grid-cols-6">
        {ingredients.top_ingredient.data?.map((ingredient) => {
          return (
            <Link href={`/ingredients/${ingredient.id.toString()}`}>
              <div className="py-12 flex h-[20rem]  inline-flex ">
                <div className="w-11/12  mx-auto  bg-white shadow-sm sm:rounded-lg">
                  <div className="overflow-hidden ">
                    <div className="p-6 text-center ">{ingredient.name}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      ;
    </AppLayout>
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
  return {
    props: {
      ingredients: ingredients,
    },
  };
}

export default ingredients;
