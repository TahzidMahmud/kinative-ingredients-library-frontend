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

      {ingredients?.map((ingredient) => {
        return (
          <Link href={`/ingredients/${ingredient.id.toString()}`}>
            <div className="py-12 flex  inline-flex ">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 bg-white border-b border-gray-200">
                    {ingredient.name}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
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
