import React from "react";
import Side from "../Side";
import Product from "./Product";
import axios from "@/lib/axios";
import Paginate from "@/components/Paginate";
import Image from "next/image";

import { useState, useEffect } from "react";

const ProductList = ({ categories, products, brands, link_data }) => {
  const [fetchproducts, setFetchProducts] = useState([]);
  const [queryparams, setQueryPrams] = useState({
    categories: [],
    brands: [],
    search_q: "",
  });
  const [isSSR, setIsSSR] = useState(true);
  // const [Products, setProducts] = useState(products);
  useEffect(() => {
    setIsSSR(false);
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
  function handleSort(e) {
    let { value } = e.target;
    const { brands } = queryparams;
    const { categories } = queryparams;

    fetchProducts(categories, brands, "", value);
  }

  function fetchProducts(q_cats, q_brands, s_q = "", sort_by = "") {
    axios
      .get(
        `/api/filter-products?brands=${q_brands.toString()}&
      category=${q_cats.length > 0 ? q_cats[0] : ""}&
      s_query=${s_q}&
      sort_by=${sort_by}`
      )
      .then((response) => {
        setFetchProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  function onPageChange(products) {
    setFetchProducts(products);
  }
  return (
    <>
      <div className="flex pt-4 mb-6">
        <div className="invisible md:visible pr-2 md:min-w-[25%] min-w-[0%]">
          <Side
            categories={categories}
            brands={brands}
            handleCategoryClick={handleCategoryClick}
            handleBrandClick={handleBrandClick}
          />
        </div>
        <div className="md:min-w-[75%] min-w-[100%]">
          <div className="py-3 px-4 bg-blue-500 flex rounded-md mb-3">
            <div className="relative min-w-[75%] ">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <Image
                  className="rounded-full"
                  src="/icons8-search.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="search"
                id="search"
                className="block p-2 pl-10 md:w-[70%] text-sm text-white bg-blue-500 rounded-lg border border-white focus:white focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:placeholder-white-400 dark:text-white dark:focus:white dark:focus:border-blue-500"
                placeholder="Search Products"
                onChange={handleSearch}
              />
            </div>
            <div className="md:min-w-[25%]  min-w-[30%] flex items-center">
              <h6 className="uppercase text-sm text-white text-bold hidden md:show">
                sort by :
              </h6>
              <select
                className="block md:p-2 md:pl-10 pl-0  w-auto text-sm text-white bg-blue-500 border border-blue-500 rounded-lg focus:white placeholder-white dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:white "
                onChange={handleSort}
              >
                <option value="desc px-1">Newest</option>
                <option value="asc px-1"> Oldest</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
            {fetchproducts?.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
      {isSSR === false ? (
        <Paginate
          from_page={link_data.from}
          current_page={link_data.current_page}
          last_page={link_data.last_page}
          page_Links={link_data.links}
          onPageChange={onPageChange}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductList;
