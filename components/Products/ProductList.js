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
  }, [fetchproducts, products]);

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
  function handleSort(e) {
    let { value } = e.target;
    const { brands } = queryparams;
    const { categories } = queryparams;

    fetchProducts(categories, brands, "", value);
  }

  function fetchProducts(q_cats, q_brands, s_q = "", sort_by = "") {
    axios
      .post("/api/filter-products", {
        brands: q_brands.toString(),
        category: q_cats.length > 0 ? q_cats[0] : "",
        s_query: s_q,
        sort_by: sort_by,
      })
      .then((response) => {
        setFetchProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <div className="flex pt-4">
        <div className="invisible md:visible pr-2 min-w-[25%]">
          <Side
            categories={categories}
            brands={brands}
            handleCategoryClick={handleCategoryClick}
            handleBrandClick={handleBrandClick}
          />
        </div>
        <div className="min-w-[75%]">
          <div className="py-3 px-4 bg-blue-500 flex rounded-md mb-3">
            <div className="relative min-w-[75%] ">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-white dark:text-gray-400"
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
                className="block p-2 pl-10 w-[70%] text-sm text-gray-900 bg-blue-500 rounded-lg border border-white focus:white focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:placeholder-white-400 dark:text-white dark:focus:white dark:focus:border-blue-500"
                placeholder="Search Products"
                onChange={handleSearch}
              />
            </div>
            <div className="min-w-[25%] flex items-center">
              <h6 className="uppercase text-sm text-white text-bold">
                sort by :
              </h6>
              <select
                className="block p-2 pl-10 w-auto text-sm text-white bg-blue-500 border border-blue-500 rounded-lg focus:white dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:white "
                onChange={handleSort}
              >
                <option value="desc">Newest to Oldest</option>
                <option value="asc"> Oldest to Newest</option>
              </select>
            </div>
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
