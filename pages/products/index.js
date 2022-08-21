/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Paginate from "@/components/Paginate";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import ProductList from "@/components/Products/ProductList";

const Products = ({ categories, products, link_data, brands, meta_Data }) => {
  const [isSSR, setIsSSR] = useState(true);
  const [Products, setProducts] = useState(products);
  useEffect(() => {
    document.oncontextmenu = document.body.oncontextmenu = function () {
      return false;
    };
    document.oncopy = document.body.oncopy = function () {
      return false;
    };
    setIsSSR(false);
  }, []);

  function onPageChange(products) {
    setProducts(products);
  }
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
          {/* <h4>New products</h4>
        <Link href="/products/all-products">
          <button className="bg-blue-500 px-4 py-2 rounded-lg text-white">
            View All
          </button>
        </Link> */}
        </div>
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
                      Products
                    </h1>
                  </div>
                  <h6 className="opacity-80 text-sm mx-2">
                    Get Real Product Review and Details
                  </h6>
                </div>
              </div>
              <Image
                src="/product_banner.jpg"
                alt="ingredient_banner"
                width={246}
                height={186}
                className="py-4"
              />
            </div>
          </div>
        </div>
        <ProductList
          categories={categories}
          products={Products}
          brands={brands}
          link_data={link_data}
        />
        {/* {isSSR === false ? (
          <Paginate
            from_page={link_data.from}
            current_page={link_data.current_page}
            last_page={link_data.last_page}
            page_Links={link_data.links}
            onPageChange={onPageChange}
          />
        ) : (
          <></>
        )} */}
      </AppLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const [categories, products, brands, meta_Data] = await Promise.all([
    axios
      .get("/api/categories")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
    axios
      .get("/api/filter-products")
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
    // fetch meta data
    axios
      .get(`/api/page-meta/products`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),
  ]);

  return {
    props: {
      categories: categories.data,
      products: products.data,
      link_data: products.meta,
      brands: brands.data,
      meta_Data,
    },
  };
}

export default Products;
