/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Side from "../../components/Side";
import Image from "next/image";
import { useState, useEffect } from "react";
const myLoader = ({ src, width, quality }) => {
  return src;
};

const products = ({ categories, products }) => {
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
      <div className="flex">
        <div className="invisible md:visible pr-2">
          <Side categories={categories} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {products?.map((product) => (
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <Image
                  className="rounded-t-lg"
                  loader={myLoader}
                  src={product.thumbnail_image}
                  alt={product.name}
                  width={350}
                  height={350}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center ">
                    {product.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center ">
                  {product.short_details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

async function get_products(params) {
  let products = await axios
    .get("/api/filter-products")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  return products;
}

export async function getServerSideProps(context) {
  const [categories, products] = await Promise.all([
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
  ]);

  return {
    props: {
      categories: categories.data,
      products: products.data,
    },
  };
}

export default products;
