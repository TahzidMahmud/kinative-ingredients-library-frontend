/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import ProductList from "@/components/Products/ProductList";

const products = ({ categories, products, brands }) => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          products
        </h2>
      }
    >
      <Head>
        <title>Laravel - products</title>
      </Head>
      <div className="flex px-2 pt-3 justify-between">
        {" "}
        <h4>New products</h4>
        <Link href="/products/all-products">
          <button className="bg-blue-500 px-4 py-2 rounded-lg text-white">
            View All
          </button>
        </Link>
      </div>
      <ProductList
        categories={categories}
        products={products}
        brands={brands}
      />
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const [categories, products, brands] = await Promise.all([
    axios
      .get("/api/categories")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
    axios
      .post("/api/filter-products")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
    axios
      .get("/api/brands")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
  ]);

  return {
    props: {
      categories: categories.data,
      products: products.data,
      brands: brands.data,
    },
  };
}

export default products;
