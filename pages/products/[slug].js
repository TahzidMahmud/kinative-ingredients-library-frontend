import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import path from "path";
import axios from "@/lib/axios";

const ingredient = ({ product }) => {
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

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              {product.name}
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

export default ingredient;
