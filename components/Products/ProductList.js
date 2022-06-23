import React from "react";
import Side from "../Side";
import Product from "./Product";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";

const ProductList = ({ categories, products, brands }) => {
  const [fetchproducts, setFetchProducts] = useState([]);
  const [queryparams, setQueryPrams] = useState({
    categories: [],
    brands: [],
    search_q: "",
  });
  useEffect(() => {
    setFetchProducts([...fetchproducts, ...products]);
  }, []);

  function handleCategoryClick(e) {
    let { id } = e.target;
    const { brands } = queryparams;
    const { categories } = queryparams;
    fetchProducts([id], [...brands]);
    setQueryPrams({
      categories: [id],
      brands: [...brands],
    });
  }
  function handleBrandClick(e) {
    const { value, checked } = e.target;
    const { brands } = queryparams;
    fetchProducts(
      [...categories],
      brands.filter((e) => e !== value)
    );
    if (checked) {
      setQueryPrams({
        categories: [...categories],
        brands: [...brands, value],
      });
      fetchProducts([...categories], [...brands, value]);
    } else {
      setQueryPrams({
        categories: [...categories],
        brands: brands.filter((e) => e !== value),
      });
    }
  }

  function handleSearch(e) {
    let { value } = e.target;
    const { brands } = queryparams;
    const { categories } = queryparams;
    if (value.length >= 3 || value == "") {
      fetchProducts(categories, brands, value);
    }
  }

  function fetchProducts(q_cats, q_brands, s_q = "") {
    axios
      .post("/api/filter-products", {
        brands: q_brands.toString(),
        category: q_cats.length > 0 ? q_cats[0] : "",
        s_query: s_q,
      })
      .then((response) => {
        setFetchProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <div className="flex">
        <div className="invisible md:visible pr-2 min-w-[25%]">
          <Side
            categories={categories}
            brands={brands}
            handleCategoryClick={handleCategoryClick}
            handleBrandClick={handleBrandClick}
          />
        </div>
        <div className="min-w-[75%]">
          <div className="my-3 ">
            {/* <form> */}
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
            {/* </form> */}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {fetchproducts?.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
